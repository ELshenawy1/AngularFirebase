import { Component } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from 'src/app/shared/models/group';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.css']
})
export class GroupDashboardComponent {
  constructor(private groupService : GroupService){}
  groups : Group[] = [];
  ngOnInit(): void {
    this.groupService.GetAllGroups().subscribe({
      next:(response)=>{this.groups = response;},
      error:(err)=>{console.log(err)}
    })
  }

  saveGroupId(groupId : number){
    localStorage.setItem("groupId",groupId.toString());
  }

  RemoveGroup(groupId : number){
    this.groupService.RemoveGroup(groupId).subscribe({
      next:()=>{ this.groups = this.groups.filter(a=> a.groupId != groupId)}
    });
  }


}
