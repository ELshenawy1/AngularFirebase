import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { JouranlComponent } from './jouranl/jouranl.component';
import { SurveillanceComponent } from './surveillance/surveillance.component';
import { AdvAtmDashboardComponent } from './adv-atm-dashboard/adv-atm-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AtmModule } from '../atm/atm.module';
import { SharedModule } from 'primeng/api';
import { PaginationModule } from 'ngx-bootstrap/pagination';




@NgModule({
  declarations: [
    HomeComponent,
    JouranlComponent,
    SurveillanceComponent,
    AdvAtmDashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbPopoverModule,
    AtmModule,
    SharedModule,
    PaginationModule
  ]
})
export class HomeModule { }
