import { AtmService } from './../atm.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Atm, AtmDashboard } from 'src/app/shared/models/atm';
import { BranchBasic } from 'src/app/shared/models/branch';
import { start } from '@popperjs/core';
import { PagingParams } from 'src/app/shared/models/paging';
@Component({
  selector: 'app-atm-dashboard',
  templateUrl: './atm-dashboard.component.html',
  styleUrls: ['./atm-dashboard.component.css']
})
export class AtmDashboardComponent implements OnInit{
  constructor(private atmService : AtmService){}
  value : string = ''
  atms : Atm[] = [];
  atmParams = new PagingParams();
  totalRecords : number = 0;
  branches : BranchBasic[] = []
  selectedBranchId: string = ''

  ngOnInit(): void {
    const searchValue = this.searchTerm?.nativeElement.value || '';
    this.atmService.GetAtms(this.atmParams,searchValue,this.selectedBranchId).subscribe({
      next:(response)=>
        {
          this.atms = response.data; 
          this.totalRecords = response.totalRecords;
          this.atmParams.pageSize = response.pageSize
        },
      error:()=>{}
    })

    this.atmService.GetAtmBranches().subscribe({
      next:(response)=>{
        this.branches = response;
      },
      error:()=>{}
    })
  }
  saveAtmId(atmId : string){
    localStorage.setItem("atmId",atmId.toString());
  }


  RemoveAtm(atmId : string){
    this.atmService.RemoveAtm(atmId).subscribe({
      next:()=>{ this.atms = this.atms.filter(a=> a.id != atmId)}
    });
  }
  @ViewChild('dataTable') dataTable!: ElementRef;
  @ViewChild('search') searchTerm?:ElementRef;

  
  onSearch(){
    const searchValue = this.searchTerm?.nativeElement.value || '';
    this.atmService.GetAtms(this.atmParams,searchValue,this.selectedBranchId).subscribe({
      next:(response)=>{
        this.atms = response.data;
        this.totalRecords = response.totalRecords;
        this.atmParams.pageSize = response.pageSize
      },
      error:()=>{}
    })
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value  = '';
    this.atmService.GetAtms(this.atmParams,this.searchTerm?.nativeElement.value,this.selectedBranchId).subscribe({
      next:(response)=>{
        this.atms = response.data;
        this.totalRecords = response.totalRecords;
        this.atmParams.pageSize = response.pageSize
      },
    })
  }
 
  onPageChanged(event : any){
    if(this.atmParams.pageIndex!==event.page){
      this.atmParams.pageIndex = event.page;
      if (this.searchTerm?.nativeElement.value !== null){
        this.onSearch()
      }else{
        this.atmService.GetAtms(this.atmParams,this.searchTerm?.nativeElement.value,this.selectedBranchId).subscribe({
          next: (response) => {
            this.atms = response.data;
            this.totalRecords = response.totalRecords;
            this.atmParams.pageSize = response.pageSize
          }
        })
      }

    }
  }


}
