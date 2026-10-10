import { EntityService } from './entity.service';
import { Ship } from './model/model';
import { Ships } from './data/ships-data';
import { BoronShipUpdates } from './data/boron-ship-updates';
import { applyV9Ships } from './data/v9-adapters';
import { Injectable } from '@angular/core';

@Injectable()
export class ShipService implements EntityService<Ship> {
  private readonly entities: Ship[] = applyV9Ships((Ships as Ship[])
    .map(ship => {
      const update = BoronShipUpdates[ship.id];
      return update ? { ...ship, ...update } : ship;
    }));

  getEntities(): Ship[] {
    return this.entities;
  }

  getEntity(id: any): Ship {
    return this.entities.find(x => x.id == id);
  }

  getEntitiesUsingWare(wareId: any) {
    return this.entities.filter(x => this.isUsing(x, wareId));
  }

  private isUsing(entity: Ship, wareId: string) {
    for (let i = 0; i < entity.production.length; i ++) {
      const production = entity.production[i];
      if (production.wares.find(y => y.ware == wareId) != null) {
        return true;
      }
    }

    return false;
  }
}
