import { Equipment, Ship, Ware } from '../shared/services/model/model';

export type HardwareKind = 'engine' | 'thruster' | 'shield' | 'weapon' | 'turret';

export interface HardwareSlotGroup {
  id: string;
  kind: HardwareKind;
  label: string;
  size: string;
  count: number;
  types: string[];
  hittable: boolean;
}

export interface HardwareBulkGroup {
  id: string;
  kind: HardwareKind;
  label: string;
  size: string;
  slotGroupIds: string[];
}

export interface FleetShipEntry {
  id: string;
  shipId: string;
  quantity: number;
  selections: { [key: string]: string };
  bulkSelections: { [key: string]: string };
  consumables: { [key: string]: number };
  software: string[];
  pendingConsumableId?: string;
  pendingSoftwareId?: string;
}

export interface FleetPlan {
  name: string;
  productionMethod: string;
  ships: FleetShipEntry[];
}

export interface FleetBuildItem {
  id: string;
  name: string;
  kind: string;
  quantity: number;
  priceMin: number;
  priceAvg: number;
  priceMax: number;
}

export interface FleetResourceSummary {
  ware: Ware;
  amount: number;
  priceMin: number;
  priceAvg: number;
  priceMax: number;
}

export interface FleetSummary {
  shipCount: number;
  purchaseMin: number;
  purchaseAvg: number;
  purchaseMax: number;
  resourcePurchaseMin: number;
  resourcePurchaseAvg: number;
  resourcePurchaseMax: number;
  items: FleetBuildItem[];
  resources: FleetResourceSummary[];
}

export interface SelectedConsumable {
  equipment: Equipment;
  quantity: number;
}

export interface FleetBuildEntity {
  entity: Ship | Equipment;
  kind: string;
  quantity: number;
}
