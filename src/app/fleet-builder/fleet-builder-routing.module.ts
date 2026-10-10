import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FleetBuilderComponent } from './fleet-builder.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FleetBuilderComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class FleetBuilderRoutingModule {
}
