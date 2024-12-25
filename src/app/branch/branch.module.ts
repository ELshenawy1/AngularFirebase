import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchDashboardComponent } from './branch-dashboard/branch-dashboard.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    BranchDashboardComponent,
    BranchDetailsComponent,
    CreateBranchComponent,
    EditBranchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    CoreModule
  ],
  exports:[]
})
export class BranchModule { }
