import wares from './v9/wares.json';
import modules from './v9/modules.json';
import ships from './v9/ships.json';
import equipments from './v9/equipments.json';
import missiles from './v9/missiles.json';
import drones from './v9/drones.json';
import consumables from './v9/consumables.json';
import prices from './v9/prices.json';
import wareRecipes from './v9/ware-recipes.json';
import macroStats from './v9/macro-stats.json';

// Generated from the X4 9.0 game files. See scripts/update-v9-data.py.
export const V9Wares: any[] = wares;
export const V9Modules: any[] = modules;
export const V9Ships: any[] = ships;
export const V9Equipments: any[] = equipments;
export const V9Missiles: any[] = missiles;
export const V9Drones: any[] = drones;
export const V9Consumables: any[] = consumables;
export const V9Prices: Record<string, { min: number; avg: number; max: number }> = prices;
export const V9WareRecipes: Record<string, any[]> = wareRecipes;
export const V9MacroStats: Record<string, { hull?: number; explosionDamage?: number; inertia?: { pitch: number; yaw: number; roll: number } }> = macroStats;

export const V9ModuleById = new Map<string, any>(V9Modules.map(item => [item.id, item]));
export const V9ShipById = new Map<string, any>(V9Ships.map(item => [item.id, item]));
export const V9EquipmentById = new Map<string, any>(V9Equipments.map(item => [item.id, item]));
