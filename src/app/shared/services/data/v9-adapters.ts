import { CargoTypes } from './cargo-types-data';
import { EquipmentClass } from './equipment-class-data';
import { EquipmentType } from './equipment-type-data';
import { ModuleTypes } from './module-types-data';
import { Races } from './race-data';
import { ShipPurpose } from './ship-purpose-data';
import { ShipType } from './ship-type-data';
import { Size } from './size-data';
import { TurretType } from './turret-type-data';
import { Wares } from './wares-data';
import { Equipment, Production, Ship, Slot, StationModule, TurretSlot } from '../model/model';
import { V9Consumables, V9Drones, V9Equipments, V9MacroStats, V9Missiles,
  V9Modules, V9Prices, V9Ships, V9WareRecipes } from './v9-reference';

const sizes: Record<string, string> = {
  xs: Size.extrasmall, s: Size.small, m: Size.medium, l: Size.large, xl: Size.extralarge,
  extrasmall: Size.extrasmall, small: Size.small, medium: Size.medium,
  large: Size.large, extralarge: Size.extralarge
};

function size(value: string): string {
  return sizes[value] || value;
}

function price(id: string, previous?: { min: number; avg: number; max: number }) {
  return V9Prices[id] || previous || { min: 0, avg: 0, max: 0 };
}

function shipDisplayName(record: any, previous?: string): string {
  if (record.purposePrimary !== 'mine') {
    return record.name;
  }

  const cargoTypes = new Set<string>((record.cargo || []).map((item: any) => item.type));
  let role = '';
  if (cargoTypes.has('liquid') && !cargoTypes.has('solid')) {
    role = 'Gas';
  } else if (cargoTypes.has('solid') && !cargoTypes.has('liquid')) {
    role = 'Mineral';
  }

  if (!role) {
    return record.name;
  }

  // Preserve the older generated display names where they already carry the
  // same in-game miner role, e.g. "Magnetar (Gas) Vanguard".
  if (previous && previous.includes('(' + role + ')')) {
    return previous;
  }

  if (record.name.includes('(' + role + ')')) {
    return record.name;
  }

  const variant = record.name.match(/^(.*?)( (?:Vanguard|Sentinel))$/);
  return variant ?
    variant[1] + ' (' + role + ')' + variant[2] :
    record.name + ' (' + role + ')';
}

function production(costs: any, times: any, previous: Production[] = []): Production[] {
  if (!costs) {
    return previous;
  }
  return Object.keys(costs).map(method => {
    const old = previous.find(item => item.method === method);
    return {
      time: times?.[method] ?? old?.time ?? 0,
      amount: 1,
      method,
      name: old?.name || method,
      wares: Object.keys(costs[method] || {}).map(ware => ({ ware, amount: costs[method][ware] }))
    };
  });
}

function shipSlots(record: any, kind: string): Array<Slot | TurretSlot> {
  const result: Array<Slot | TurretSlot> = [];
  for (const slot of record.slots || []) {
    for (const group of slot.groups || []) {
      const connection = group.connection;
      if (slot.type === kind) {
        for (let i = 0; i < connection.count; i++) {
          const tags: string[] = connection.tags || [];
          const types: string[] = [];
          if (tags.includes('combat') || (!tags.includes('missile') && !tags.includes('mining'))) {
            types.push(TurretType.standard);
          }
          if (tags.includes('missile')) {
            types.push(TurretType.missile);
          }
          if (tags.includes('mining')) {
            types.push(TurretType.mining);
          }
          result.push({
            group: group.group,
            size: size(connection.size),
            hittable: tags.includes('hittable'),
            tags,
            ...(kind === 'weapon' || kind === 'turret' ? { types } : {})
          });
        }
      }
      if (kind === 'shield' && connection.shield) {
        const attached = connection.shield;
        for (let i = 0; i < attached.count; i++) {
          result.push({ group: group.group, size: size(attached.size),
            hittable: (attached.tags || []).includes('hittable'), tags: attached.tags || [] });
        }
      }
    }
  }
  return result;
}

export function applyV9Ships(legacy: Ship[]): Ship[] {
  const existing = new Map(legacy.map(item => [item.id, item]));
  const updated = V9Ships.map(record => {
    const old = existing.get(record.id) as Ship | undefined;
    const macro = V9MacroStats[record.macro] || {};
    const physics = record.physics || {};
    const rawCargo = record.cargo || [];
    const ship: Ship = {
      ...(old || {} as Ship),
      id: record.id,
      name: shipDisplayName(record, old?.name),
      description: old?.description || record.name,
      size: size(record.class?.replace('ship_', '')),
      type: (ShipType as any)[record.type] || record.type,
      purpose: (ShipPurpose as any)[record.purposePrimary] || record.purposePrimary,
      race: (Races as any)[record.race] || old?.race,
      hull: record.hull,
      explosionDamage: macro.explosionDamage ?? old?.explosionDamage,
      people: record.crew?.capacity || 0,
      storage: { missile: record.storage?.missile || 0, unit: record.storage?.unit || 0 },
      mass: physics.mass ?? old?.mass ?? 0,
      inertia: macro.inertia || old?.inertia || { pitch: 0, yaw: 0, roll: 0 },
      drag: physics.drag || old?.drag,
      price: price(record.id, old?.price),
      production: production(
        Object.fromEntries((record.production || []).map(item => [item.method, item.cost])),
        Object.fromEntries((record.production || []).map(item => [item.method, item.time])),
        old?.production
      ),
      engines: shipSlots(record, 'engine') as Slot[],
      shields: shipSlots(record, 'shield') as Slot[],
      weapons: shipSlots(record, 'weapon') as TurretSlot[],
      turrets: shipSlots(record, 'turret') as TurretSlot[],
      thruster: size((record.slots || []).find(item => item.type === 'thruster')?.groups?.[0]?.connection?.size || ''),
      cargo: rawCargo.map(item => ({ max: item.capacity, types: [(CargoTypes as any)[item.type]] })),
      docks: old?.docks || (record.shipstorage || []).map(item => ({
        size: size(item.size?.replace('dock_', '')), capacity: item.capacity
      })),
      isPlayerBlueprint: !record.noplayerblueprint
    };
    existing.delete(record.id);
    return ship;
  });
  // Game macros still contain several NPC ships that the processed list omits.
  const legacyOnly = Array.from(existing.values()).map(ship => {
    const macro = V9MacroStats[`${ship.id}_macro`] || {};
    return {
      ...ship,
      hull: macro.hull ?? ship.hull,
      explosionDamage: macro.explosionDamage ?? ship.explosionDamage,
      inertia: macro.inertia || ship.inertia,
      price: price(ship.id, ship.price),
      production: V9WareRecipes[ship.id]?.length ? V9WareRecipes[ship.id].map(recipe => ({
        ...recipe, name: recipe.method
      })) : ship.production,
      isPlayerBlueprint: false
    };
  });
  return updated.concat(legacyOnly);
}

const equipmentTypes: Record<string, string> = {
  engine: EquipmentType.engines, thruster: EquipmentType.thrusters,
  shield: EquipmentType.shields, weapon: EquipmentType.weapons, turret: EquipmentType.turrets
};

const equipmentClasses: Record<string, string> = {
  engine: EquipmentClass.engine, shieldgenerator: EquipmentClass.shieldgenerator,
  weapon: EquipmentClass.weapon, missilelauncher: EquipmentClass.missilelauncher,
  turret: EquipmentClass.turret, missileturret: EquipmentClass.missileturret
};

export function applyV9Equipments(legacy: Equipment[]): Equipment[] {
  const existing = new Map(legacy.map(item => [item.id, item]));
  const updated = V9Equipments.map(record => {
    const old = existing.get(record.id) as Equipment | undefined;
    const macro = V9MacroStats[`${record.id}_macro`] || {};
    const item: Equipment = {
      ...(old || {} as Equipment),
      id: record.id,
      name: record.name,
      description: old?.description || record.name,
      type: equipmentTypes[record.type],
      equipmentClass: equipmentClasses[record.class],
      race: (Races as any)[record.race] || old?.race,
      size: size(record.size),
      hull: macro.hull ?? old?.hull,
      price: price(record.id, old?.price),
      production: production(record.cost, record.buildTime, old?.production),
      thrust: record.thrust || old?.thrust,
      travel: record.travel || old?.travel,
      recharge: record.recharge || old?.recharge,
      slotTags: record.slotTags || [],
      integrated: record.integrated,
      isPlayerBlueprint: !record.noplayerblueprint
    };
    existing.delete(record.id);
    return item;
  });
  const otherRecords = [
    ...V9Missiles.map(record => ({ ...record, appType: EquipmentType.missiles })),
    ...V9Drones.map(record => ({ ...record, appType: EquipmentType.drones })),
    ...V9Consumables.map(record => ({ ...record, appType:
      record.class === 'countermeasure' ? EquipmentType.countermeasures : EquipmentType.software }))
  ];
  const additional: Equipment[] = [];
  for (const record of otherRecords) {
    const old = existing.get(record.id);
    const label = record.name && !record.name.startsWith('{') ? record.name :
      record.id.replace(/^(missile_|ship_|software_)/, '').replace(/_/g, ' ')
        .replace(/\b\w/g, letter => letter.toUpperCase());
    additional.push({
      ...(old || {} as Equipment),
      id: record.id,
      name: old?.name || label,
      description: old?.description || label,
      type: old?.type || record.appType,
      equipmentClass: old?.equipmentClass || record.class,
      size: old?.size || (record.class?.startsWith('ship_') ? size(record.class.slice(5)) : undefined),
      hull: record.hull ?? old?.hull,
      race: (Races as any)[record.race] || old?.race,
      price: price(record.id, old?.price),
      production: production(record.cost, record.buildTime, old?.production),
      isPlayerBlueprint: record.noplayerblueprint !== true
    });
    existing.delete(record.id);
  }
  // Software and a few special mines/turrets are represented only as wares.
  const wareOnly = Array.from(existing.values()).map(item => ({
    ...item,
    price: price(item.id, item.price),
    production: V9WareRecipes[item.id]?.length ? V9WareRecipes[item.id].map(recipe => ({
      ...recipe, name: recipe.method
    })) : item.production
  }));
  return updated.concat(additional, wareOnly);
}

const moduleTypes: Record<string, string> = {
  connectionmodule: ModuleTypes.connectionmodule,
  production: ModuleTypes.production,
  defencemodule: ModuleTypes.defencemodule,
  dockarea: ModuleTypes.dockarea,
  habitation: ModuleTypes.habitation,
  pier: ModuleTypes.pier,
  storage: ModuleTypes.storage,
  buildmodule: ModuleTypes.buildmodule,
  ventureplatform: ModuleTypes.ventureplatform,
  processingmodule: ModuleTypes.processingmodule,
  welfaremodule: 'Welfare Module',
  radar: 'Radar'
};

export function applyV9Modules(legacy: StationModule[]): StationModule[] {
  const existing = new Map(legacy.map(item => [item.id, item]));
  return V9Modules.map(record => {
    const old = existing.get(record.id) as StationModule | undefined;
    const macro = V9MacroStats[record.macroId] || {};
    const race = (Races as any)[record.race] || old?.makerRace;
    const item: StationModule = {
      ...(old || {} as StationModule),
      id: record.id,
      name: record.name,
      macro: record.macroId,
      description: old?.description || record.name,
      type: moduleTypes[record.type] || record.type,
      makerRace: race,
      hull: macro.hull ?? old?.hull ?? 0,
      explosionDamage: macro.explosionDamage ?? old?.explosionDamage,
      price: price(record.id, old?.price),
      production: [{
        time: record.buildTime,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: Object.keys(record.buildCost || {}).map(ware => ({ ware, amount: record.buildCost[ware] }))
      }],
      product: Object.keys(record.outputs || {}).map(ware => (Wares as any)[ware]).filter(Boolean),
      workForce: {
        ...(old?.workForce || {}),
        max: record.workforce?.needed || 0,
        capacity: record.workforce?.capacity || 0,
        race: old?.workForce?.race || race || (Races as any).argon
      },
      cargo: record.cargo ? {
        max: record.cargo.capacity,
        type: (CargoTypes as any)[record.cargo.type]
      } : old?.cargo,
      owners: old?.owners || [],
      isPlayerBlueprint: record.isPlayerBlueprint
    };
    return item;
  });
}
