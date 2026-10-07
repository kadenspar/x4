import { Injectable } from '@angular/core';
import { EquipmentService } from '../shared/services/equipment.service';
import { ShipService } from '../shared/services/ship.service';
import { WareService } from '../shared/services/ware.service';
import { Equipment, Production, Ship, Slot, TurretSlot } from '../shared/services/model/model';
import { EquipmentType } from '../shared/services/data/equipment-type-data';
import { EquipmentClass } from '../shared/services/data/equipment-class-data';
import { TurretType } from '../shared/services/data/turret-type-data';
import {
  FleetBuildEntity,
  FleetBuildItem,
  FleetPlan,
  FleetResourceSummary,
  FleetSummary,
  HardwareBulkGroup,
  HardwareKind,
  HardwareSlotGroup
} from './fleet-builder.models';

@Injectable()
export class FleetBuilderService {
  private readonly ships: Ship[];
  private readonly equipment: Equipment[];
  private readonly slotGroupCache: { [key: string]: HardwareSlotGroup[] } = {};
  private readonly compatibilityCache: { [key: string]: Equipment[] } = {};

  private readonly boronLauncherSlots: { [key: string]: { size: string, count: number } } = {
    'ship_bor_s_heavyfighter_01_a': { size: 'Small', count: 1 },
    'ship_bor_s_scout_01_a': { size: 'Small', count: 1 },
    'ship_bor_s_scout_02_a': { size: 'Small', count: 1 },
    'ship_bor_m_gunboat_01_a': { size: 'Medium', count: 2 }
  };

  constructor(private shipService: ShipService,
              private equipmentService: EquipmentService,
              private wareService: WareService) {
    this.ships = this.shipService.getEntities()
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    this.equipment = this.equipmentService.getEntities()
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getShips(): Ship[] {
    return this.ships;
  }

  getShip(id: string): Ship {
    return this.shipService.getEntity(id);
  }

  getEquipment(id: string): Equipment {
    return this.equipmentService.getEntity(id);
  }

  getSoftwareOptions(): Equipment[] {
    return this.equipment.filter(x => x.type === EquipmentType.software);
  }

  getConsumableOptions(ship: Ship): Equipment[] {
    return this.equipment.filter(x => {
      if (x.type === EquipmentType.countermeasures) {
        return true;
      }

      if (x.type === EquipmentType.missiles) {
        return (ship.storage?.missile || 0) > 0;
      }

      if (x.type === EquipmentType.drones) {
        return (ship.storage?.unit || 0) > 0;
      }

      return false;
    });
  }

  getSlotGroups(ship: Ship): HardwareSlotGroup[] {
    if (this.slotGroupCache[ship.id]) {
      return this.slotGroupCache[ship.id];
    }

    const groups: HardwareSlotGroup[] = [];

    groups.push(...this.groupSlots('engine', ship.engines || []));

    if (ship.thruster) {
      groups.push({
        id: 'thruster|' + ship.thruster + '|main|',
        kind: 'thruster',
        label: 'Thrusters',
        size: ship.thruster,
        count: 1,
        types: [],
        hittable: false
      });
    }

    groups.push(...this.groupSlots('shield', ship.shields || []));
    groups.push(...this.groupSlots('weapon', ship.weapons || []));
    groups.push(...this.groupSlots('turret', ship.turrets || []));

    if (this.isBoronShip(ship)) {
      this.correctBoronSlotTypes(ship, groups);

      const launcher = this.boronLauncherSlots[ship.id];
      if (launcher) {
        groups.push({
          id: 'weapon|' + launcher.size + '|launcher|' + TurretType.missile,
          kind: 'weapon',
          label: 'Missile Launchers',
          size: launcher.size,
          count: launcher.count,
          types: [ TurretType.missile ],
          hittable: false
        });
      }
    }

    this.slotGroupCache[ship.id] = groups;
    return groups;
  }

  getBulkGroups(ship: Ship): HardwareBulkGroup[] {
    const map: { [key: string]: HardwareBulkGroup } = {};

    this.getSlotGroups(ship).forEach(group => {
      const key = group.kind + '|' + group.size;
      if (!map[key]) {
        map[key] = {
          id: 'bulk|' + key,
          kind: group.kind,
          label: 'All ' + group.size + ' ' + this.getKindLabel(group.kind),
          size: group.size,
          slotGroupIds: []
        };
      }
      map[key].slotGroupIds.push(group.id);
    });

    return Object.keys(map)
      .map(key => map[key])
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  getCompatibleEquipment(ship: Ship, group: HardwareSlotGroup): Equipment[] {
    const cacheKey = ship.id + '|' + group.id;
    if (this.compatibilityCache[cacheKey]) {
      return this.compatibilityCache[cacheKey];
    }

    const values = this.equipment
      .filter(item => this.isCompatible(ship, group, item))
      .sort((a, b) => a.name.localeCompare(b.name));

    this.compatibilityCache[cacheKey] = values;
    return values;
  }

  getBulkOptions(ship: Ship, bulk: HardwareBulkGroup): Equipment[] {
    const byName: { [key: string]: Equipment } = {};
    const groupIds = new Set(bulk.slotGroupIds);

    this.getSlotGroups(ship)
      .filter(group => groupIds.has(group.id))
      .forEach(group => {
        this.getCompatibleEquipment(ship, group).forEach(item => {
          const key = [ item.name, item.equipmentClass || '', item.type || '', item.size || '' ].join('|');
          byName[key] = byName[key] || item;
        });
      });

    return Object.keys(byName)
      .map(key => byName[key])
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  hasMissingHardwareData(ship: Ship): boolean {
    return this.getSlotGroups(ship)
      .some(group => this.getCompatibleEquipment(ship, group).length === 0);
  }

  isBoronShip(ship: Ship): boolean {
    return ship.id.indexOf('ship_bor_') === 0;
  }

  calculate(plan: FleetPlan): FleetSummary {
    const buildMap: { [key: string]: FleetBuildEntity } = {};
    let shipCount = 0;

    plan.ships.forEach(entry => {
      const ship = this.getShip(entry.shipId);
      if (!ship) {
        return;
      }

      const entryQuantity = this.normalizeQuantity(entry.quantity);
      shipCount += entryQuantity;
      this.addBuildItem(buildMap, ship, 'Ship hull', entryQuantity);

      this.getSlotGroups(ship).forEach(group => {
        const equipmentId = entry.selections[group.id];
        if (!equipmentId) {
          return;
        }

        const item = this.getEquipment(equipmentId);
        if (item) {
          this.addBuildItem(buildMap, item, this.getKindLabel(group.kind), entryQuantity * group.count);
        }
      });

      entry.software.forEach(id => {
        const item = this.getEquipment(id);
        if (item) {
          this.addBuildItem(buildMap, item, 'Software', entryQuantity);
        }
      });

      Object.keys(entry.consumables).forEach(id => {
        const quantityPerShip = this.normalizeQuantity(entry.consumables[id], 0);
        if (quantityPerShip <= 0) {
          return;
        }

        const item = this.getEquipment(id);
        if (item) {
          this.addBuildItem(buildMap, item, 'Consumable', entryQuantity * quantityPerShip);
        }
      });
    });

    let purchaseMin = 0;
    let purchaseAvg = 0;
    let purchaseMax = 0;
    const resourceMap: { [key: string]: number } = {};
    const items: FleetBuildItem[] = [];

    Object.keys(buildMap).forEach(id => {
      const build = buildMap[id];
      const price = build.entity.price;

      const itemMin = (price?.min || 0) * build.quantity;
      const itemAvg = (price?.avg || 0) * build.quantity;
      const itemMax = (price?.max || 0) * build.quantity;

      purchaseMin += itemMin;
      purchaseAvg += itemAvg;
      purchaseMax += itemMax;

      items.push({
        id: build.entity.id,
        name: build.entity.name,
        kind: build.kind,
        quantity: build.quantity,
        priceMin: itemMin,
        priceAvg: itemAvg,
        priceMax: itemMax
      });

      const recipe = this.selectProduction(build.entity.production || [], plan.productionMethod);
      if (!recipe) {
        return;
      }

      const batchSize = Math.max(1, recipe.amount || 1);
      const cycles = Math.ceil(build.quantity / batchSize);

      recipe.wares.forEach(requirement => {
        resourceMap[requirement.ware] = (resourceMap[requirement.ware] || 0) + requirement.amount * cycles;
      });
    });

    let resourcePurchaseMin = 0;
    let resourcePurchaseAvg = 0;
    let resourcePurchaseMax = 0;

    const resources: FleetResourceSummary[] = Object.keys(resourceMap)
      .map(id => {
        const ware = this.wareService.getEntity(id);
        const amount = resourceMap[id];

        const priceMin = amount * ware.price.min;
        const priceAvg = amount * ware.price.avg;
        const priceMax = amount * ware.price.max;

        resourcePurchaseMin += priceMin;
        resourcePurchaseAvg += priceAvg;
        resourcePurchaseMax += priceMax;

        return {
          ware: ware,
          amount: amount,
          priceMin: priceMin,
          priceAvg: priceAvg,
          priceMax: priceMax
        };
      })
      .sort((a, b) => a.ware.name.localeCompare(b.ware.name));

    items.sort((a, b) => {
      const kindCompare = a.kind.localeCompare(b.kind);
      return kindCompare === 0 ? a.name.localeCompare(b.name) : kindCompare;
    });

    return {
      shipCount: shipCount,
      purchaseMin: purchaseMin,
      purchaseAvg: purchaseAvg,
      purchaseMax: purchaseMax,
      resourcePurchaseMin: resourcePurchaseMin,
      resourcePurchaseAvg: resourcePurchaseAvg,
      resourcePurchaseMax: resourcePurchaseMax,
      items: items,
      resources: resources
    };
  }

  emptySummary(): FleetSummary {
    return {
      shipCount: 0,
      purchaseMin: 0,
      purchaseAvg: 0,
      purchaseMax: 0,
      resourcePurchaseMin: 0,
      resourcePurchaseAvg: 0,
      resourcePurchaseMax: 0,
      items: [],
      resources: []
    };
  }

  private groupSlots(kind: HardwareKind, slots: Array<Slot | TurretSlot>): HardwareSlotGroup[] {
    const map: { [key: string]: HardwareSlotGroup } = {};

    slots.forEach(slot => {
      const turretSlot = slot as TurretSlot;
      const types = turretSlot.types ? turretSlot.types.slice().sort() : [];
      const groupName = slot.group || 'main';
      const key = kind + '|' + slot.size + '|' + groupName + '|' + types.join('+');

      if (!map[key]) {
        map[key] = {
          id: key,
          kind: kind,
          label: this.getSlotLabel(kind, slot.group, types),
          size: slot.size,
          count: 0,
          types: types,
          hittable: slot.hittable
        };
      }

      map[key].count++;
    });

    return Object.keys(map).map(key => map[key]);
  }

  private correctBoronSlotTypes(ship: Ship, groups: HardwareSlotGroup[]) {
    groups.forEach(group => {
      if (group.kind === 'weapon') {
        if (ship.id === 'ship_bor_l_destroyer_01_a' && group.size === 'Large') {
          group.types = [];
        } else if (ship.purpose === 'Mine' || group.types.includes(TurretType.mining)) {
          group.types = [ TurretType.mining ];
        } else {
          group.types = [ TurretType.standard ];
        }
      }

      if (group.kind === 'turret') {
        if (group.types.includes(TurretType.mining) && group.size === 'Large') {
          group.types = [ TurretType.mining ];
        } else if (ship.purpose === 'Mine') {
          group.types = [ TurretType.standard, TurretType.mining, TurretType.missile ];
        } else {
          group.types = [ TurretType.standard, TurretType.missile ];
        }
      }
    });
  }

  private getSlotLabel(kind: HardwareKind, group: string, types: string[]): string {
    if (!group) {
      if (kind === 'shield') {
        return 'Main Shields';
      }
      if (kind === 'weapon' && types.length === 0) {
        return 'Main Weapons';
      }
      return this.getKindLabel(kind);
    }

    return this.getKindLabel(kind) + ' - ' + this.humanizeGroup(group);
  }

  private humanizeGroup(value: string): string {
    return value
      .replace(/^group_/, '')
      .split('_')
      .map(part => part.length > 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part)
      .join(' ');
  }

  private getKindLabel(kind: HardwareKind): string {
    switch (kind) {
      case 'engine':
        return 'Engines';
      case 'thruster':
        return 'Thrusters';
      case 'shield':
        return 'Shields';
      case 'weapon':
        return 'Weapons';
      case 'turret':
        return 'Turrets';
    }
  }

  private isCompatible(ship: Ship, group: HardwareSlotGroup, item: Equipment): boolean {
    if (item.size !== group.size) {
      return false;
    }

    if (!this.matchesShipFamily(ship, group, item) || !this.matchesHittable(group, item)) {
      return false;
    }

    switch (group.kind) {
      case 'engine':
        return item.type === EquipmentType.engines;

      case 'thruster':
        return item.type === EquipmentType.thrusters;

      case 'shield':
        return item.type === EquipmentType.shields &&
          item.equipmentClass === EquipmentClass.shieldgenerator;

      case 'weapon':
        return this.isWeaponCompatible(ship, group, item);

      case 'turret':
        return this.isTurretCompatible(group, item);
    }
  }

  private matchesShipFamily(ship: Ship, group: HardwareSlotGroup, item: Equipment): boolean {
    if (group.kind === 'thruster') {
      return true;
    }

    const boronEquipment = item.id.indexOf('_bor_') >= 0 || item.race?.id === 'boron';

    if (this.isBoronShip(ship)) {
      return !!item.slotTags?.includes('advanced');
    }

    return !boronEquipment;
  }

  private matchesHittable(group: HardwareSlotGroup, item: Equipment): boolean {
    if (!item.slotTags || item.slotTags.length === 0) {
      return true;
    }

    if (group.hittable && item.slotTags.includes('unhittable')) {
      return false;
    }

    if (!group.hittable && item.slotTags.includes('hittable')) {
      return false;
    }

    return true;
  }

  private isWeaponCompatible(ship: Ship, group: HardwareSlotGroup, item: Equipment): boolean {
    if (item.type !== EquipmentType.weapons) {
      return false;
    }

    if (group.types.length === 0) {
      if (ship.id === 'ship_bor_l_destroyer_01_a') {
        return item.id === 'weapon_bor_l_beam_01_mk1';
      }

      const shipStem = ship.id
        .replace(/^ship_/, '')
        .replace(/_[a-z]$/, '');
      return item.id.indexOf('weapon_' + shipStem + '_') === 0;
    }

    if (item.slotTags?.includes('missile') || item.equipmentClass === EquipmentClass.missilelauncher) {
      return group.types.includes(TurretType.missile);
    }

    if (item.slotTags?.includes('mining') || this.isMiningItem(item)) {
      return group.types.includes(TurretType.mining);
    }

    if (item.slotTags?.includes('combat')) {
      return group.types.includes(TurretType.standard);
    }

    return item.equipmentClass === EquipmentClass.weapon &&
      group.types.includes(TurretType.standard);
  }

  private isTurretCompatible(group: HardwareSlotGroup, item: Equipment): boolean {
    if (item.type !== EquipmentType.turrets) {
      return false;
    }

    if (item.slotTags?.includes('missile') || item.equipmentClass === EquipmentClass.missileturret) {
      return group.types.includes(TurretType.missile);
    }

    if (item.slotTags?.includes('mining') || this.isMiningItem(item)) {
      return group.types.includes(TurretType.mining);
    }

    if (item.slotTags?.includes('combat')) {
      return group.types.includes(TurretType.standard);
    }

    return item.equipmentClass === EquipmentClass.turret &&
      group.types.includes(TurretType.standard);
  }

  private isMiningItem(item: Equipment): boolean {
    const name = item.name.toLowerCase();
    return item.id.indexOf('_mining_') >= 0 || name.indexOf('mining') >= 0;
  }

  private addBuildItem(map: { [key: string]: FleetBuildEntity },
                       entity: Ship | Equipment,
                       kind: string,
                       quantity: number) {
    if (!map[entity.id]) {
      map[entity.id] = {
        entity: entity,
        kind: kind,
        quantity: 0
      };
    }

    map[entity.id].quantity += quantity;
  }

  private selectProduction(production: Production[], method: string): Production {
    if (!production || production.length === 0) {
      return null;
    }

    if (method === 'boron') {
      return production.find(x => x.method === 'boron') ||
        production.find(x => x.method === 'default') ||
        production[0];
    }

    return production.find(x => x.method === method) ||
      production.find(x => x.method === 'default') ||
      production[0];
  }

  private normalizeQuantity(value: number, minimum: number = 1): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return minimum;
    }

    return Math.max(minimum, Math.trunc(parsed));
  }
}
