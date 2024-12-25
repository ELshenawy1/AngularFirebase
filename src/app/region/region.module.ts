import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionDashboardComponent } from './region-dashboard/region-dashboard.component';
import { CreateRegionComponent } from './create-region/create-region.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditRegionComponent } from './edit-region/edit-region.component';



@NgModule({
  declarations: [
    RegionDashboardComponent,
    CreateRegionComponent,
    EditRegionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,


  ]
})
export class RegionModule { }
