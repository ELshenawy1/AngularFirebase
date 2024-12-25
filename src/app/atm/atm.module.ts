import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmDashboardComponent } from './atm-dashboard/atm-dashboard.component';
import { AtmDetailsComponent } from './atm-details/atm-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAtmComponent } from './create-atm/create-atm.component';
import { EditAtmComponent } from './edit-atm/edit-atm.component';
import { AtmDashboardHomeComponent } from './atm-dashboard-home/atm-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AtmDashboardComponent,
    AtmDetailsComponent,
    CreateAtmComponent,
    EditAtmComponent,
    AtmDashboardHomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PaginationModule
  ],
  exports:[
    AtmDashboardComponent
  ]
})
export class AtmModule { }
