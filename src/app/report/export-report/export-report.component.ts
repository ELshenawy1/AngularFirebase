import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DeviceDTO, DeviceGroupDTO, DeviceSubGroupDTO } from 'src/app/shared/models/export-report';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-export-report',
  templateUrl: './export-report.component.html',
  styleUrls: ['./export-report.component.css']
})
export class ExportReportComponent implements OnInit {
  devices: DeviceGroupDTO[] = [];
  reportsTypes:  { [key: number]: string } = {}
  treeOptions: TreeNode[] = [];
  selectedOption: any; 
  reportType : any;
  showCassetteFields = false;
  showDateFrom = false;
  showDateTo = false;
  showBalance = false;

  constructor(private reportService: ReportService, private dataService : DataService, private router : Router) {}
  ngOnInit(): void {
    this.loadDeviceData();
  }

  
  exportReportForm = new FormGroup({ 
    reportType : new FormControl(null,[Validators.required]),
    dateFrom : new FormControl(null,[]),
    dateTo : new FormControl(null,[]), 
    cassette1 : new FormControl(null,[]), 
    cassette2 : new FormControl(null,[]), 
    cassette3 : new FormControl(null,[]),
    cassette4 : new FormControl(null,[]),
    balanceGreaterThan : new FormControl(null,[]),
    balanceLessThan : new FormControl(null,[]), 
  })
  get getReportType(){
    return this.exportReportForm.controls['reportType'];
  }
  get getDateTo(){
    return this.exportReportForm.controls['dateTo'];
  }
  get getDateFrom(){
    return this.exportReportForm.controls['dateFrom'];
  }
  get getFrom(){
    return this.exportReportForm.controls['balanceGreaterThan'];
  }
  get getTo(){
    return this.exportReportForm.controls['balanceLessThan'];
  }

  loadDeviceData(): void {
    this.reportService.GetDevices().subscribe({
      next: (response) => {
        this.reportsTypes = response.reportsTypes;

        this.devices = response.deviceList;
        this.loadTreeData();
      },
      error: (error) => {
        console.error('Error fetching devices:', error);
      }
    });
  }

  loadTreeData(): void {
    this.treeOptions = this.devices.map(group => ({
      key: group.id.toString(),
      label: group.name,
      data: group,
      children: this.mapSubGroupsToNodes(group.deviceSubGroupDTO)
    }));
  }

  mapSubGroupsToNodes(subGroups: DeviceSubGroupDTO[]): TreeNode[] {
    return subGroups.map(subGroup => ({
      key: subGroup.id.toString(),
      label: subGroup.name,
      data: subGroup,
      children: this.mapDevicesToNodes(subGroup.deviceDTO)
    }));
  }

  mapDevicesToNodes(devices: DeviceDTO[]): TreeNode[] {
    return devices.map(device => ({
      key: device.id,
      label: device.title,
      data: device,
      icon: device.isCheck ? 'pi pi-check' : '',
      children: []
    }));
  }


  onReportTypeChange(): void {
    if(this.exportReportForm.get('reportType')){
      this.reportType = this.exportReportForm.get('reportType')?.value ; 
    }
    this.exportReportForm.get('dateFrom')?.reset();
    this.exportReportForm.get('dateTo')?.reset();

    this.showCassetteFields = false;
    this.showDateFrom = false;
    this.showDateTo = false;
    this.showBalance = false;
  
    switch (+this.reportType) {
      case 1 : 
      case 2 : 
      case 7 : 
          this.showDateTo = true;
        break;
      case 3 : 
      case 4 : 
      case 5 : 
      case 8 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 :
      case 15:
          this.showDateTo = true;
          this.showDateFrom = true;
        break;
      case 9:
           this.showBalance = true;
        break;
      case 6:
        this.showCassetteFields = true;
        this.showDateTo = true;
        break;
      case 14:
          this.showDateTo = true;
          this.showDateFrom = true;
          this.showBalance = true;
        break;
      default:
        break;
    }
  }
  
  onSubmit(e : any){   
    if(this.exportReportForm.status == 'VALID'){
      if(this.getDateTo.value != null){
        this.dataService.setData({todate : this.getDateTo.value , 
          deviceIds : this.selectedOption.map((node: TreeNode) => node.data.id).join(',')});
      }
      if(this.getDateFrom.value != null && this.getDateTo.value != null){
        this.dataService.setData({todate : this.getDateTo.value ,
          fromdate : this.getDateFrom.value , 
          deviceIds : this.selectedOption.map((node: TreeNode) => node.data.id).join(',')});

      }
      if(this.getFrom.value != null && this.getTo.value != null){
        this.dataService.setData({from : this.getFrom.value , 
          to : this.getTo.value , 
          deviceIds : this.selectedOption.map((node: TreeNode) => node.data.id).join(',')});

      }
      if(this.getReportType.value != null) 
        this.router.navigate([`/demo-report/${this.reportsTypes[this.getReportType.value]}`]);
    }else{
      console.log(console.error());
    }
  }
}
