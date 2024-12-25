import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';
import { Region } from 'src/app/shared/models/region';

@Component({
  selector: 'app-region-dashboard',
  templateUrl: './region-dashboard.component.html',
  styleUrls: ['./region-dashboard.component.css']
})
export class RegionDashboardComponent implements OnInit{
  constructor(private regionService : RegionService){}
  regions : Region[] = [];
  ngOnInit(): void {
    this.regionService.GetAllRegions().subscribe({
      next:(response)=>{this.regions = response;},
      error:()=>{}
    })
  }
  RemoveRegion(regionId : number){
    this.regionService.RemoveRegion(regionId).subscribe({
      next:()=>{ this.regions = this.regions.filter(a=> a.regionId != regionId)}
    });
  }

  saveRegionId(regionId : number){
    localStorage.setItem("regionId",regionId.toString());
  }

}
