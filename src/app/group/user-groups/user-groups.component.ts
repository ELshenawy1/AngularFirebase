import { GroupService } from './../group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignUserToGroup, Group, UserWithGroups } from 'src/app/shared/models/group';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit{

  userWithGroups? : UserWithGroups;
  groups : Group[] = [];
  In :Group[] = [];
  Out :Group[] = [];
  constructor(private activatedRoute : ActivatedRoute, private groupService:GroupService){
    
  }
  
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    const id =  userIdString ? +userIdString : null//Number(this.activatedRoute.snapshot.paramMap?.get('id'));
    this.groupService.GetAllGroups().subscribe({
      next:(groups)=>{this.groups = groups}
    });

    (id || id == 0) && this.groupService.GetUserGroups(id).subscribe({
      next:(val)=>
        {
          this.userWithGroups = val;
          this.In = this.groups.filter(g => this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
          this.Out = this.groups.filter(g => !this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
        },
    })
  }

  Assign(groupId : number, groupName : string){
    if(this.userWithGroups?.userId || this.userWithGroups?.userId == 0){
      let assignUserToGroup : AssignUserToGroup = {
        userId:this.userWithGroups?.userId,
        groupId : groupId
      }

      this.groupService.AssignUserToGroup(assignUserToGroup).subscribe({
        next:()=>
          {
            this.userWithGroups?.groups.push({groupId : groupId , groupName : groupName});
            this.In = this.groups.filter(g => this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
            this.Out = this.groups.filter(g => !this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
            }
      })
    }
  }
  Remove(groupId : number){
    if(this.userWithGroups?.userId || this.userWithGroups?.userId == 0){
      this.groupService.RemoveUserFromGroup(this.userWithGroups?.userId,groupId).subscribe({
        next:()=>{
          if (this.userWithGroups && this.userWithGroups.groups){
            this.userWithGroups.groups = this.userWithGroups?.groups.filter(g => g.groupId != groupId);
          }
          this.In = this.groups.filter(g => this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
          this.Out = this.groups.filter(g => !this.userWithGroups?.groups.map(g=>g.groupId).includes(g.groupId))
        }
      })
    }

  }
}
