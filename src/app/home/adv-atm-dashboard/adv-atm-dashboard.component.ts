import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AtmDashboard, AtmDepositData } from 'src/app/shared/models/atm';
import { HomeService } from '../home.service';
import { PagingParams } from 'src/app/shared/models/paging';
import { ConfigService } from 'src/app/report/config.service';

@Component({
  selector: 'app-adv-atm-dashboard',
  templateUrl: './adv-atm-dashboard.component.html',
  styleUrls: ['./adv-atm-dashboard.component.css']
})
export class AdvAtmDashboardComponent  implements OnInit {
  constructor(private homeService: HomeService,private configService:ConfigService) { }

  atmParams = new PagingParams();
  totalRecords : number = 0;
  atms: AtmDashboard[] = [];
  dashboardBalance = this.configService.getConfig('dashboardBalance');
  atmDepositData: AtmDepositData[] = [];
  groupedAtms: AtmDashboard[][][] = [];

  ngOnInit(): void {
    console.log(this.dashboardBalance)
    this.homeService.GetAtmDasboardData(this.atmParams.pageIndex).subscribe({
      next: (response) => {
        this.atms = response.data;
        this.totalRecords = response.totalRecords;
        this.atmParams.pageSize = response.pageSize
        this.groupedAtms = this.groupAtms(response.data);
      }
    });

    this.homeService.GetAtmDepositData().subscribe({
      next: (response) => {
        this.atmDepositData = response;
      },
      error: () => { }
    });
  }

  @ViewChild('search') searchTerm?: ElementRef;

  onSearch() {
    const searchValue = this.searchTerm?.nativeElement.value || '';
    this.homeService.GetDevicesWithFilters(this.atmParams,searchValue,).subscribe({
      next: (response) => {
        this.atms = response.data;
        this.totalRecords = response.totalRecords;
        this.atmParams.pageSize = response.pageSize
        this.atmParams.pageIndex = response.pageIndex
        this.groupedAtms = this.groupAtms(response.data);
      },
      error: () => { }
    });
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.onSearch();
  }

  groupAtms(atms: AtmDashboard[]): AtmDashboard[][][] {
    const groups: AtmDashboard[][][] = [];
    const itemsPerSlide = 12;
    const itemsPerRow = 4;

    for (let i = 0; i < atms.length; i += itemsPerSlide) {
      const slide = atms.slice(i, i + itemsPerSlide);
      const rows = [];
      for (let j = 0; j < slide.length; j += itemsPerRow) {
        rows.push(slide.slice(j, j + itemsPerRow));
      }
      groups.push(rows);
    }

    return groups;
  }

  onPageChanged(event : any){
    if(this.atmParams.pageIndex!==event.page){
      this.atmParams.pageIndex = event.page;
      if (this.searchTerm?.nativeElement.value !== null){
        this.onSearch()
      }else{
        this.homeService.GetAtmDasboardData(this.atmParams.pageIndex).subscribe({
          next: (response) => {
            this.atms = response.data;
            this.totalRecords = response.totalRecords;
            this.atmParams.pageSize = response.pageSize
            this.groupedAtms = this.groupAtms(response.data);
          }
        })
      }

    }
  }
}