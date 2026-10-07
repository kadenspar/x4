import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FleetBuilderComponent } from './fleet-builder.component';
import { FleetBuilderRoutingModule } from './fleet-builder-routing.module';
import { FleetBuilderService } from './fleet-builder.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FleetBuilderRoutingModule
  ],
  declarations: [
    FleetBuilderComponent
  ],
  providers: [
    FleetBuilderService
  ]
})
export class FleetBuilderModule {
}
