// import { AtmService } from './../atm.service';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Atm, AtmDashboard } from 'src/app/shared/models/atm';
// import { BranchBasic } from 'src/app/shared/models/branch';
// import { start } from '@popperjs/core';
// import { Pagination, PagingParams } from 'src/app/shared/models/paging';
// @Component({
//   selector: 'app-atm-dashboarad',
//   templateUrl: './atm-dashboarad.component.html',
//   styleUrls: ['./atm-dashboard.component.css']
// })
// export class AtmDashboardComponenta implements OnInit{
//   constructor(private atmService : AtmService){}
//   value : string = ''
//   atms : Atm[] = [];
//   branches : BranchBasic[] = []
//   selectedBranchId: string = ''
//   atmParams = new PagingParams();
//   totalRecords : number = 0;

//   ngOnInit(): void {
//     this.atmService.GetAllAtms(this.atmParams).subscribe({
//       next:(response)=>
//         {
//           this.totalRecords = response.totalRecords;
//           this.atmParams.pageSize = response.pageSize
//           this.atms = response.data;
//         },
//       error:()=>{}
//     })

//     this.atmService.GetAtmBranches().subscribe({
//       next:(response)=>{
//         this.branches = response;
//       },
//       error:()=>{}
//     })
//   }
//   saveAtmId(atmId : string){
//     localStorage.setItem("atmId",atmId.toString());
//   }
  
//   onPageChanged(event : any){    console.log("PageChange")

//     const searchValue = this.searchTerm?.nativeElement.value || ''
//     if(this.atmParams.pageIndex!==event.page){
//       this.atmParams.pageIndex = event.page;
//       if (searchValue !== null){
//         this.onSearch()
//       }else{
//         this.atmService.GetAtmsWithFilters(this.atmParams,searchValue,this.selectedBranchId).subscribe({
//           next: (response) => {
//             console.log(response)
//             this.atms = response.data;
//             this.totalRecords = response.totalRecords;
//             this.atmParams.pageSize = response.pageSize
//           }
//         })
//       }

//     }
//   }

//   RemoveAtm(atmId : string){
//     this.atmService.RemoveAtm(atmId).subscribe({
//       next:()=>{ this.atms = this.atms.filter(a=> a.id != atmId)}
//     });
//   }
//   @ViewChild('dataTable') dataTable!: ElementRef;
//   @ViewChild('search') searchTerm?:ElementRef;

  
//   onSearch(){
//     console.log("Searching")
//     const searchValue = this.searchTerm?.nativeElement.value || ''
//     this.atmService.GetAtmsWithFilters(this.atmParams,searchValue,this.selectedBranchId).subscribe({
//       next: (response) => {            console.log(response)
//         this.atms = response.data;
//         this.totalRecords = response.totalRecords;
//         this.atmParams.pageSize = response.pageSize
//       },
//       error:()=>{}
//     })
//   }

//   onReset(){
//     const searchValue = this.searchTerm?.nativeElement.value || ''
//     this.atmService.GetAtmsWithFilters(this.atmParams,searchValue,this.selectedBranchId).subscribe({
//       next: (response) => {            console.log(response)
//         this.atms = response.data;
//         this.totalRecords = response.totalRecords;
//         this.atmParams.pageSize = response.pageSize
//       }
//     })
//   }
 


// }
