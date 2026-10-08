import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Equipment, Ship } from '../shared/services/model/model';
import { EquipmentType } from '../shared/services/data/equipment-type-data';
import { BASE_TITLE } from '../shared/services/constants';
import {
  FleetPlan,
  FleetShipEntry,
  FleetSummary,
  HardwareBulkGroup,
  HardwareKind,
  HardwareSlotGroup,
  SelectedConsumable
} from './fleet-builder.models';
import { FleetBuilderService } from './fleet-builder.service';

@Component({
  templateUrl: './fleet-builder.component.html',
  styleUrls: [ './fleet-builder.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FleetBuilderComponent implements OnInit {
  readonly productionMethods = [
    { id: 'default', name: 'Universal' },
    { id: 'boron', name: 'Boron' },
    { id: 'closedloop', name: 'Closed Loop' },
    { id: 'terran', name: 'Terran' },
    { id: 'xenon', name: 'Xenon' }
  ];

  readonly hardwareSections: { kind: HardwareKind, label: string }[] = [
    { kind: 'engine', label: 'Engines' },
    { kind: 'thruster', label: 'Thrusters' },
    { kind: 'shield', label: 'Shields' },
    { kind: 'weapon', label: 'Weapons' },
    { kind: 'turret', label: 'Turrets' }
  ];

  ships: Ship[] = [];
  filteredShips: Ship[] = [];
  shipRaceOptions: { id: string, name: string }[] = [];
  shipSizeOptions: string[] = [];
  softwareOptions: Equipment[] = [];
  selectedShipId = '';
  selectedShipRace = '';
  selectedShipSize = '';
  selectedSavedPlanName = '';
  savedPlanNames: string[] = [];
  plan: FleetPlan = this.createEmptyPlan();
  summary: FleetSummary;

  private readonly storageKey = 'x4-fleet-builder-plans-v1';
  private readonly groupsByKindCache: { [key: string]: HardwareSlotGroup[] } = {};
  private readonly bulkGroupsByKindCache: { [key: string]: HardwareBulkGroup[] } = {};
  private entrySequence = 0;

  constructor(private fleetBuilderService: FleetBuilderService,
              private titleService: Title) {
    this.summary = this.fleetBuilderService.emptySummary();
  }

  ngOnInit(): void {
    this.titleService.setTitle(BASE_TITLE + ' - Fleet Builder');
    this.ships = this.fleetBuilderService.getShips();
    this.shipRaceOptions = this.buildShipRaceOptions(this.ships);
    this.shipSizeOptions = this.buildShipSizeOptions(this.ships);
    this.applyShipFilters();
    this.softwareOptions = this.fleetBuilderService.getSoftwareOptions();
    this.refreshSavedPlans();
    this.recalculate();
  }

  newPlan() {
    this.plan = this.createEmptyPlan();
    this.selectedShipId = '';
    this.selectedSavedPlanName = '';
    this.recalculate();
  }

  applyShipFilters() {
    this.filteredShips = this.ships.filter(ship =>
      (!this.selectedShipRace || ship.race?.id === this.selectedShipRace) &&
      (!this.selectedShipSize || ship.size === this.selectedShipSize)
    );

    if (this.selectedShipId &&
        !this.filteredShips.some(ship => ship.id === this.selectedShipId)) {
      this.selectedShipId = '';
    }
  }

  clearShipFilters() {
    this.selectedShipRace = '';
    this.selectedShipSize = '';
    this.applyShipFilters();
  }

  addShip() {
    if (!this.selectedShipId) {
      return;
    }

    this.plan.ships.push({
      id: this.createEntryId(),
      shipId: this.selectedShipId,
      quantity: 1,
      selections: {},
      bulkSelections: {},
      consumables: {},
      software: [],
      pendingConsumableId: '',
      pendingSoftwareId: ''
    });

    this.selectedShipId = '';
    this.recalculate();
  }

  duplicateShip(entry: FleetShipEntry) {
    const copy = this.clone(entry);
    copy.id = this.createEntryId();
    copy.pendingConsumableId = '';
    copy.pendingSoftwareId = '';

    const index = this.plan.ships.indexOf(entry);
    this.plan.ships.splice(index + 1, 0, copy);
    this.recalculate();
  }

  removeShip(entry: FleetShipEntry) {
    const index = this.plan.ships.indexOf(entry);
    if (index >= 0) {
      this.plan.ships.splice(index, 1);
      this.recalculate();
    }
  }

  adjustShipQuantity(entry: FleetShipEntry, delta: number) {
    entry.quantity = Math.max(1, this.toInteger(entry.quantity, 1) + delta);
    this.recalculate();
  }

  normalizeShipQuantity(entry: FleetShipEntry) {
    entry.quantity = Math.max(1, this.toInteger(entry.quantity, 1));
    this.recalculate();
  }

  getShip(entry: FleetShipEntry): Ship {
    return this.fleetBuilderService.getShip(entry.shipId);
  }

  getGroupsByKind(entry: FleetShipEntry, kind: HardwareKind): HardwareSlotGroup[] {
    const ship = this.getShip(entry);
    const cacheKey = ship.id + '|' + kind;
    if (!this.groupsByKindCache[cacheKey]) {
      this.groupsByKindCache[cacheKey] = this.fleetBuilderService.getSlotGroups(ship)
        .filter(group => group.kind === kind);
    }
    return this.groupsByKindCache[cacheKey];
  }

  getBulkGroupsByKind(entry: FleetShipEntry, kind: HardwareKind): HardwareBulkGroup[] {
    const ship = this.getShip(entry);
    const cacheKey = ship.id + '|' + kind;
    if (!this.bulkGroupsByKindCache[cacheKey]) {
      this.bulkGroupsByKindCache[cacheKey] = this.fleetBuilderService.getBulkGroups(ship)
        .filter(group => group.kind === kind);
    }
    return this.bulkGroupsByKindCache[cacheKey];
  }

  getCompatibleEquipment(entry: FleetShipEntry, group: HardwareSlotGroup): Equipment[] {
    return this.fleetBuilderService.getCompatibleEquipment(this.getShip(entry), group);
  }

  getBulkOptions(entry: FleetShipEntry, bulk: HardwareBulkGroup): Equipment[] {
    return this.fleetBuilderService.getBulkOptions(this.getShip(entry), bulk);
  }

  applyBulk(entry: FleetShipEntry, bulk: HardwareBulkGroup) {
    const selectedId = entry.bulkSelections[bulk.id] || '';
    const ship = this.getShip(entry);
    const targetGroupIds = new Set(bulk.slotGroupIds);

    this.fleetBuilderService.getSlotGroups(ship)
      .filter(group => targetGroupIds.has(group.id))
      .forEach(group => {
        if (!selectedId) {
          entry.selections[group.id] = '';
          return;
        }

        const options = this.fleetBuilderService.getCompatibleEquipment(ship, group);
        const selected = this.fleetBuilderService.getEquipment(selectedId);
        const match = options.find(item => item.id === selectedId) ||
          options.find(item => selected &&
            item.name === selected.name &&
            item.equipmentClass === selected.equipmentClass);

        if (match) {
          entry.selections[group.id] = match.id;
        }
      });

    this.recalculate();
  }

  addConsumable(entry: FleetShipEntry) {
    const id = entry.pendingConsumableId;
    if (!id) {
      return;
    }

    if (!entry.consumables[id]) {
      entry.consumables[id] = 1;
    }

    entry.pendingConsumableId = '';
    this.recalculate();
  }

  getConsumableOptions(entry: FleetShipEntry): Equipment[] {
    return this.fleetBuilderService.getConsumableOptions(this.getShip(entry))
      .filter(item => !entry.consumables[item.id]);
  }

  getSelectedConsumables(entry: FleetShipEntry): SelectedConsumable[] {
    return Object.keys(entry.consumables)
      .map(id => ({
        equipment: this.fleetBuilderService.getEquipment(id),
        quantity: entry.consumables[id]
      }))
      .filter(item => !!item.equipment)
      .sort((a, b) => a.equipment.name.localeCompare(b.equipment.name));
  }

  adjustConsumable(entry: FleetShipEntry, id: string, delta: number) {
    const current = this.toInteger(entry.consumables[id], 0);
    entry.consumables[id] = Math.max(0, current + delta);

    if (entry.consumables[id] === 0) {
      delete entry.consumables[id];
    }

    this.recalculate();
  }

  normalizeConsumable(entry: FleetShipEntry, id: string) {
    const value = Math.max(0, this.toInteger(entry.consumables[id], 0));
    if (value === 0) {
      delete entry.consumables[id];
    } else {
      entry.consumables[id] = value;
    }
    this.recalculate();
  }

  removeConsumable(entry: FleetShipEntry, id: string) {
    delete entry.consumables[id];
    this.recalculate();
  }

  getMissileCount(entry: FleetShipEntry): number {
    return this.getConsumableCountByType(entry, EquipmentType.missiles);
  }

  getDroneCount(entry: FleetShipEntry): number {
    return this.getConsumableCountByType(entry, EquipmentType.drones);
  }

  addSoftware(entry: FleetShipEntry) {
    const id = entry.pendingSoftwareId;
    if (!id || entry.software.includes(id)) {
      return;
    }

    entry.software.push(id);
    entry.pendingSoftwareId = '';
    this.recalculate();
  }

  getAvailableSoftware(entry: FleetShipEntry): Equipment[] {
    return this.softwareOptions.filter(item => !entry.software.includes(item.id));
  }

  getSelectedSoftware(entry: FleetShipEntry): Equipment[] {
    return entry.software
      .map(id => this.fleetBuilderService.getEquipment(id))
      .filter(item => !!item)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  removeSoftware(entry: FleetShipEntry, id: string) {
    entry.software = entry.software.filter(value => value !== id);
    this.recalculate();
  }

  getCompatibilityWarning(entry: FleetShipEntry): string {
    const ship = this.getShip(entry);
    if (!this.fleetBuilderService.hasMissingHardwareData(ship)) {
      return '';
    }

    return 'Some hardware slots have no compatible equipment entry in the current source data. The resource summary only includes components you can actually select.';
  }

  savePlan() {
    const name = (this.plan.name || '').trim();
    if (!name) {
      return;
    }

    this.plan.name = name;
    const plans = this.readSavedPlans();
    plans[name] = this.clone(this.plan);
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    this.selectedSavedPlanName = name;
    this.refreshSavedPlans();
  }

  loadPlan() {
    if (!this.selectedSavedPlanName) {
      return;
    }

    const plans = this.readSavedPlans();
    const saved = plans[this.selectedSavedPlanName];
    if (!saved) {
      return;
    }

    this.plan = this.normalizePlan(this.clone(saved));
    this.recalculate();
  }

  deletePlan() {
    if (!this.selectedSavedPlanName) {
      return;
    }

    const plans = this.readSavedPlans();
    delete plans[this.selectedSavedPlanName];
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    this.selectedSavedPlanName = '';
    this.refreshSavedPlans();
  }

  recalculate() {
    this.summary = this.fleetBuilderService.calculate(this.plan);
  }

  trackByEntryId(index: number, entry: FleetShipEntry): string {
    return entry.id;
  }

  trackByShipId(index: number, ship: Ship): string {
    return ship.id;
  }

  trackByEquipmentId(index: number, item: Equipment): string {
    return item.id;
  }

  trackByHardwareGroupId(index: number, group: HardwareSlotGroup): string {
    return group.id;
  }

  trackByBulkGroupId(index: number, group: HardwareBulkGroup): string {
    return group.id;
  }

  trackByString(index: number, value: string): string {
    return value;
  }

  private buildShipRaceOptions(ships: Ship[]): { id: string, name: string }[] {
    const byId = new Map<string, string>();
    ships.forEach(ship => {
      if (ship.race?.id && ship.race?.name) {
        byId.set(ship.race.id, ship.race.name);
      }
    });

    return Array.from(byId.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private buildShipSizeOptions(ships: Ship[]): string[] {
    const order = [ 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large' ];
    return Array.from(new Set(ships.map(ship => ship.size).filter(Boolean)))
      .sort((a, b) => {
        const ai = order.indexOf(a);
        const bi = order.indexOf(b);
        if (ai >= 0 && bi >= 0) {
          return ai - bi;
        }
        if (ai >= 0) {
          return -1;
        }
        if (bi >= 0) {
          return 1;
        }
        return a.localeCompare(b);
      });
  }

  private getConsumableCountByType(entry: FleetShipEntry, type: string): number {
    return Object.keys(entry.consumables)
      .reduce((total, id) => {
        const item = this.fleetBuilderService.getEquipment(id);
        return total + (item?.type === type ? this.toInteger(entry.consumables[id], 0) : 0);
      }, 0);
  }

  private createEmptyPlan(): FleetPlan {
    return {
      name: '',
      productionMethod: 'default',
      ships: []
    };
  }

  private createEntryId(): string {
    this.entrySequence++;
    return 'fleet-entry-' + Date.now() + '-' + this.entrySequence;
  }

  private refreshSavedPlans() {
    this.savedPlanNames = Object.keys(this.readSavedPlans())
      .sort((a, b) => a.localeCompare(b));
  }

  private readSavedPlans(): { [key: string]: FleetPlan } {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private normalizePlan(plan: FleetPlan): FleetPlan {
    plan.name = plan.name || '';
    plan.productionMethod = plan.productionMethod || 'default';
    plan.ships = (plan.ships || []).map(entry => ({
      id: entry.id || this.createEntryId(),
      shipId: entry.shipId,
      quantity: Math.max(1, this.toInteger(entry.quantity, 1)),
      selections: entry.selections || {},
      bulkSelections: entry.bulkSelections || {},
      consumables: entry.consumables || {},
      software: entry.software || [],
      pendingConsumableId: '',
      pendingSoftwareId: ''
    }));
    plan.ships.forEach(entry => {
      const ship = this.fleetBuilderService.getShip(entry.shipId);
      if (!ship) {
        return;
      }
      const groups = this.fleetBuilderService.getSlotGroups(ship);
      for (const [oldId, equipmentId] of Object.entries(entry.selections)) {
        if (groups.some(group => group.id === oldId)) {
          continue;
        }
        const parts = oldId.split('|');
        const candidates = groups.filter(group =>
          group.id.startsWith(oldId + '|') ||
          (group.kind === parts[0] && group.size === parts[1] &&
            group.id.startsWith(parts.slice(0, 3).join('|') + '|')));
        const compatible = candidates.filter(group =>
          this.fleetBuilderService.getCompatibleEquipment(ship, group)
            .some(item => item.id === equipmentId));
        if (compatible.length === 1 && !entry.selections[compatible[0].id]) {
          entry.selections[compatible[0].id] = equipmentId;
          delete entry.selections[oldId];
        }
      }
    });
    return plan;
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  private toInteger(value: number, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
  }
}
