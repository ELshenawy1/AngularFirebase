import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { CoreModule } from '../core/core.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditGroupComponent } from './edit-group/edit-group.component';



@NgModule({
  declarations: [
    GroupDashboardComponent,
    UserGroupsComponent,
    CreateGroupComponent,
    EditGroupComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    CoreModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GroupModule { }
