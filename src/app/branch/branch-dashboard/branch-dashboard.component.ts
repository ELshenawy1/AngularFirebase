import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Branch } from 'src/app/shared/models/branch';

@Component({
  selector: 'app-branch-dashboard',
  templateUrl: './branch-dashboard.component.html',
  styleUrls: ['./branch-dashboard.component.css']
})
export class BranchDashboardComponent implements OnInit{
  constructor(private branchService : BranchService){}
  branches : Branch[] = [];
  ngOnInit(): void {
    this.branchService.GetAllBranches().subscribe({
      next:(response)=>{this.branches = response;},
      error:()=>{}
    })
  }
}
