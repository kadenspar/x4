import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../shared/components/component-base';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as convert from 'xml-js';
import { ModuleService } from '../../shared/services/module.service';
import { LayoutService } from '../services/layout-service';
import { Layout, ModuleConfig } from '../../shared/services/module-config';

interface EntryAttribute {
    macro: string;
}

interface Entry {
    _attributes: EntryAttribute;
}

interface PlanAttribute {
    name: string;
}

interface Plan {
    _attributes: PlanAttribute;
    entry: Entry | Entry[];
}

interface PlanList {
    plan: Plan | Plan[];
}

interface ConstructionPlan {
    plans: PlanList;
}

export interface ImportResult {
    error: string;
    layouts: string[];
}

@Component({
    selector: 'app-import-plans',
    templateUrl: './import-plans.component.html'
})
export class ImportPlansComponent extends ComponentBase implements OnInit {
    xml: string;
    fileName: string;
    fileError: string;

    constructor(public activeModal: NgbActiveModal,
                private moduleService: ModuleService,
                private layoutService: LayoutService) {
        super();
    }

    ngOnInit(): void {
    }

    onFileSelected(event: Event) {
        this.fileError = null;

        const input = event.target as HTMLInputElement;
        const file = input.files && input.files.length > 0 ? input.files[0] : null;
        if (!file) {
            return;
        }

        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            this.xml = typeof reader.result === 'string' ? reader.result : '';
            if (!this.xml) {
                this.fileError = 'The selected file is empty.';
            }
        };
        reader.onerror = () => {
            this.xml = null;
            this.fileError = 'Unable to read the selected file.';
        };
        reader.readAsText(file);
    }

    importPlans() {
        let layouts: string[];
        let error: string = null;

        try {
            const result = convert.xml2js(this.xml, { compact: true }) as any;
            layouts = this.importCore(result);
        } catch (e) {
            error = 'Failed to import layouts';
        }

        this.activeModal.close({ error: error, layouts: layouts });
    }

    private toArray<T>(value: T | T[]): T[] {
        if (value == null) {
            return [];
        }
        return Array.isArray(value) ? value : [value];
    }

    private importCore(result: ConstructionPlan) {
        const layouts: string[] = [];

        for (const plan of this.toArray(result.plans.plan)) {
            const entries = this.toArray(plan.entry);
            if (entries.length === 0) {
                continue;
            }

            const name = plan._attributes?.name || 'Imported Plan';

            const modules: ModuleConfig[] = [];

            for (const item of entries) {
                const [ module ] = this.moduleService.getModulesByMacro(item._attributes.macro);
                if (module) {
                    const existing = modules.find(x => x.moduleId === module.id);
                    if (!existing) {
                        modules.push({ moduleId: module.id, count: 1 });
                    } else {
                        existing.count++;
                    }
                }
            }

            const layout: Layout = {
                name: name,
                config: modules
            };

            this.layoutService.saveLayout(layout);

            layouts.push(name);
        }

        return layouts;
    }

    get canImport() {
        return !!this.xml && this.xml.trim().length > 0;
    }
}
