import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllModuleTypes, ModuleTypes } from '../../shared/services/data/module-types-data';
import { StationModule } from '../../shared/services/model/model';
import { ModuleService } from '../../shared/services/module.service';
import { WareService } from '../../shared/services/ware.service';
import { RECYCLING_MODULES, ResourceCalculator, StationModuleModel, StationResourceModel, WareGroupModel } from './station-calculator.model';
import { StationSummaryService } from './station-summary/services/station-summary.service';
import { V9ModuleById } from '../../shared/services/data/v9-reference';

@Component({
    selector: 'app-station-modules',
    templateUrl: './station-modules.component.html',
    styleUrls: [ './station-modules.component.scss' ],
})
export class StationModulesComponent implements OnInit {
    wareGroups: WareGroupModel[];

    @Output()
    change = new EventEmitter();

    @Input()
    modules: StationModuleModel[];

    @Input()
    sunlight = 100;

    constructor(private moduleService: ModuleService, private wareService: WareService, private stationSummaryService: StationSummaryService) {
    }

    ngOnInit(): void {
        const groupsObj = this.moduleService.getModulesByType(ModuleTypes.production)
            .reduce((obj, item: StationModule) => {
                if (RECYCLING_MODULES.includes(item.id)) {
                    obj[ModuleTypes.recycling] = obj[ModuleTypes.recycling] || {
                        name: ModuleTypes.recycling,
                        group: ModuleTypes.recycling,
                        modules: []
                    };
                    obj[ModuleTypes.recycling].modules.push(item);
                    return obj;
                }

                for (let product of item.product) {
                    obj[product.group.id] = obj[product.group.id] || {
                        name: product.group.name,
                        group: product.group,
                        modules: []
                    };
                    obj[product.group.id].modules.push(item);
                }
                return obj;
            }, []);

        this.wareGroups = Object.keys(groupsObj)
            .map(x => groupsObj[x])
            .sort((a, b) => this.wareService.compareGroups(a.group, b.group));

        for (const type of AllModuleTypes) {
            this.wareGroups.push({ name: type, modules: this.moduleService.getModulesByType(type) });
        }
    }

    removeModule(item: StationModuleModel) {
        const index = this.modules.indexOf(item);
        if (index >= 0) {
            this.modules.splice(index, 1);
            this.onChange();
        }
    }

    addModule() {
        this.modules.push(new StationModuleModel(this.wareService, this.moduleService));
    }

    onChange() {
        this.change.emit();
    }

    decrementCount(item: StationModuleModel) {
        item.count = Math.max(0, Number(item.count || 0) - 1);
        this.onChange();
    }

    incrementCount(item: StationModuleModel) {
        item.count = Math.max(0, Number(item.count || 0) + 1);
        this.onChange();
    }

    onCountChanged(item: StationModuleModel) {
        const count = Number(item.count);
        item.count = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;
        this.onChange();
    }

    autofillModules() {
        const habitat = this.modules.find(x => x.module?.type === ModuleTypes.habitation);
        let method = 'default';
        if (habitat) {
            method = habitat.module.makerRace.id;
        }

        // Stop when a deficit cannot be filled, such as solar power at 0% sunlight.
        for (let pass = 0; pass < 100; pass++) {

            const resources: StationResourceModel[] = ResourceCalculator.calculate(this.modules, this.sunlight, this.stationSummaryService.$partialWorkforce);
            let didChange = false;

            const modules = this.modules;

            for (const resource of resources) {
                if (resource.amount >= 0) {
                    continue;
                }

                const module = this.moduleService.getModuleByWare(resource.ware.id, method) || this.moduleService.getModuleByWare(resource.ware.id);
                if (module == null) {
                    continue;
                }

                const product = module.product.find(x => x.id == resource.ware.id);
                const productionWare = product?.production.find(p => p.method == method) || product?.production.find(p => p.method == 'default');
                const v9Module = V9ModuleById.get(module.id);
                let productionPerHour = v9Module?.outputs?.[resource.ware.id] ||
                    (productionWare ? productionWare.amount * (3600 / productionWare.time) : 0);
                if (resource.ware.id === 'energycells') {
                    const sun = Number(this.sunlight);
                    productionPerHour *= Number.isFinite(sun) ? Math.max(0, sun) / 100 : 1;
                }
                if (!Number.isFinite(productionPerHour) || productionPerHour <= 0) {
                    continue;
                }
                const moduleCount = Math.ceil(-resource.amount / productionPerHour);
                if (!Number.isFinite(moduleCount) || moduleCount <= 0) {
                    continue;
                }
                didChange = true;

                const existingModule = modules.find(m => m.module?.id == module.id);
                if (existingModule == null) {
                    modules.push(new StationModuleModel(this.wareService, this.moduleService, module.id, moduleCount));
                } else {
                    existingModule.count += moduleCount;
                }
            }

            if (!didChange) {
                break;
            }
        }

        this.onChange();
    }

    /**
     * on module selected
     *
     * @param id module id
     * @param item the station module item
     */
    onSelectModule(id: string, item: StationModuleModel) {
        this.modules[this.modules.indexOf(item)].moduleId = id;
        this.onChange();
    }

    /**
     * move item in modules on drop
     *
     * @param event drop event
     */
    drop(event: CdkDragDrop<StationModuleModel[]>) {
        moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
    }
}
