import { Component, OnInit } from '@angular/core';
import { EntityDetailsComponent } from '../../shared/components/entity-details.component';
import { Equipment, Ware } from '../../shared/services/model/model';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../shared/services/equipment.service';
import { Title } from '@angular/platform-browser';
import { WareService } from '../../shared/services/ware.service';
import { BASE_TITLE } from '../../shared/services/constants';

interface ProductionWareData {
   ware: Ware;
   amount: number;
}

interface ProductionData {
   time: number;
   amount: number;
   method: string;
   name: string;
   wares: ProductionWareData[];
}

@Component({
   templateUrl: './equipment-detail.component.html'
})
export class EquipmentDetailComponent extends EntityDetailsComponent<Equipment> implements OnInit {
   entityProduction: ProductionData[];

   constructor(service: EquipmentService, private wareService: WareService,
               route: ActivatedRoute, private titleService: Title) {
      super(service, route);
   }

   override ngOnInit(): void {
      this.titleService.setTitle(`${BASE_TITLE} - Equipment`);
      super.ngOnInit();
   }

   override onEntityLoaded(entity: Equipment) {
      this.titleService.setTitle(`${BASE_TITLE} - ${entity.name}`);
      this.entityProduction = (entity.production || []).map<ProductionData>(x => ({
         amount: x.amount,
         method: x.method,
         name: x.name,
         time: x.time,
         wares: x.wares.map(y => ({
            ware: this.wareService.getEntity(y.ware),
            amount: y.amount
         }))
      }));
   }

   getTotalMin(production: ProductionData) {
      return production.wares.reduce((total, x) => total + x.amount * x.ware.price.min, 0);
   }

   getTotalMax(production: ProductionData) {
      return production.wares.reduce((total, x) => total + x.amount * x.ware.price.max, 0);
   }

   getTotalAvg(production: ProductionData) {
      return production.wares.reduce((total, x) => total + x.amount * x.ware.price.avg, 0);
   }

   getProductionTime(amount: number) {
      const minutes = Math.trunc(amount / 60);
      const seconds = amount - minutes * 60;
      const parts: string[] = [];

      if (minutes > 0) {
         parts.push(minutes + (minutes === 1 ? ' minute' : ' minutes'));
      }
      if (seconds > 0) {
         parts.push(seconds + (seconds === 1 ? ' second' : ' seconds'));
      }

      return parts.join(' ') || '0 seconds';
   }
}
