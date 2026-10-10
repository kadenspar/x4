import { EntityService } from './entity.service';
import { Equipment } from './model/model';
import { Equipments } from './data/equipment-data';
import { SupplementalEquipments } from './data/boron-equipment-data';
import { applyV9Equipments } from './data/v9-adapters';
import { Injectable } from '@angular/core';

@Injectable()
export class EquipmentService implements EntityService<Equipment> {
   private readonly entities: Equipment[];

   constructor() {
      const byId = new Map<string, Equipment>();
      (Equipments as Equipment[]).forEach(item => byId.set(item.id, item));
      SupplementalEquipments.forEach(item => byId.set(item.id, item));
      this.entities = applyV9Equipments(Array.from(byId.values()));
   }

   getEntities(): Equipment[] {
      return this.entities;
   }

   getEntity(id: any): Equipment {
      return this.entities.find(x => x.id == id);
   }
}
