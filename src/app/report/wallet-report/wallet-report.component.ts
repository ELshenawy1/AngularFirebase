import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { WalletReportData } from 'src/app/shared/models/export-report';

@Component({
  selector: 'app-wallet-report',
  templateUrl: './wallet-report.component.html',
  styleUrls: ['./wallet-report.component.css']
})
export class WalletReportComponent implements OnInit{
  walletReportData : WalletReportData | null = null
  constructor(private reportService : ReportService , private router : Router , private dataService:DataService){
    
  }
  ngOnInit(): void {
    this.reportService.getWalletPageDependency().subscribe({
      next:(result) => { this.walletReportData = result ;}
    })
  }

  walletReportForm = new FormGroup({ 
    dateFrom : new FormControl(null,[Validators.required]), 
    dateTo : new FormControl(null,[Validators.required]),
    termId : new FormControl(null),
    mobileNumber : new FormControl(null),
    transactionType : new FormControl(null),
    transactionStatus : new FormControl(null),
    brnach : new FormControl(null),
    region : new FormControl(null),
  })

  
  get getDateFrom(){
    return this.walletReportForm.controls['dateFrom'];
  } 
  get getDateTo(){
    return this.walletReportForm.controls['dateTo'];
  }
  get getTermId(){
    return this.walletReportForm.controls['termId'];
  }
  get getMobileNumber(){
    return this.walletReportForm.controls['mobileNumber'];
  }
  get getTransactionType(){
    return this.walletReportForm.controls['transactionType'];
  }
  get getTransactionStatus(){
    return this.walletReportForm.controls['transactionStatus'];
  }
  get getBranch(){
    return this.walletReportForm.controls['brnach'];
  }
  get getRegion(){
    return this.walletReportForm.controls['region'];
  }


  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  
  onSubmit(e : any){   
      if(this.getDateFrom.value != null && this.getDateTo.value != null){
        this.dataService.setData(
          {
            dateTo : this.getDateTo.value ,
            dateFrom : this.getDateFrom.value, 
            termId : this.getTermId.value,
            mobileNumber : this.getMobileNumber.value,
            transactionType : this.getTransactionType.value,
            transactionStatus : this.getTransactionStatus.value,
            brnach : this.getBranch.value,
            region : this.getRegion.value
          });
          this.router.navigate([`/demo-report/WalletReport`])
      }
      this.markAllAsTouched(this.walletReportForm)
      // if(this.getReportType.value != null) 
        // this.router.navigate([`/demo-report/${this.reportsTypes[this.getReportType.value]}`]);
  }
  
  
}
