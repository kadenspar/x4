import { Injectable } from '@angular/core';
import { AllModules } from './data/modules-data';
import { StationModule } from './model/model';
import { EntityService } from './entity.service';
import { applyV9Modules } from './data/v9-adapters';

@Injectable()
export class ModuleService implements EntityService<StationModule> {
   private readonly entities = applyV9Modules(AllModules as StationModule[]);
   private readonly byId = new Map(this.entities.map(item => [item.id, item]));
   getModulesByType(moduleType: string): StationModule[] {
      return this.getEntities()
         .filter(x => x.type == moduleType && x.isPlayerBlueprint);
   }

   getEntity(id: string): StationModule {
      return this.byId.get(id);
   }

   getModulesByMacro(macro: string) {
      return this.getEntities()
         .filter(x => x.macro === macro);
   }

   getModuleByWare(wareId: string, productionMethod: string = 'default'): StationModule {
      if (productionMethod === 'default') {
         let module = this.getEntities()
            .find(x => x.isPlayerBlueprint && x.product != null && x.product.find(y => y.id == wareId) != null && x.makerRace == null);

         if (module == null) {
            module = this.getEntities()
               .find(x => x.isPlayerBlueprint && x.product != null && x.product.find(y => y.id == wareId) != null);
         }
         return module;
      } else {
         return this.getEntities()
            .find(x => x.isPlayerBlueprint && x.product != null && x.product.find(y => y.id == wareId) != null && x.makerRace != null && x.makerRace.id == productionMethod);
      }
   }

   getEntities(): StationModule[] {
      return this.entities;
   }

   getModulesUsingWare(wareId: any) {
      return this.entities
         .filter(x => this.isUsing(x, wareId));
   }

   private isUsing(module: StationModule, wareId: string) {
      for (let i = 0; i < module.production.length; i++) {
         const production = module.production[i];
         if (production.wares.find(y => y.ware == wareId) != null) {
            return true;
         }
      }

      return false;
   }
}
