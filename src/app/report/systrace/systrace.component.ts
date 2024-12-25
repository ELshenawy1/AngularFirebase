import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-systrace',
  templateUrl: './systrace.component.html',
  styleUrls: ['./systrace.component.css']
})
export class SystraceComponent implements OnInit{
  constructor(public router : Router, private reportService : ReportService, private dataService : DataService){}

  users : any;
  actions : any;
  ngOnInit(): void {
    this.reportService.getUsersAndActions().subscribe({
      next:(response)=>{
        this.users = response?.users;
        this.actions = response.actionTypes;
      }
    })
  }


  reportForm = new FormGroup({
    actionType : new FormControl(null),
    user : new FormControl(null),
    fromdate : new FormControl(null,[Validators.required]),
    todate : new FormControl(null,[Validators.required])
  })

  get getActionType(){
    return this.reportForm.controls['actionType'];
  }
  get getUser(){
    return this.reportForm.controls['user'];
  }
  get getDateFrom(){
    return this.reportForm.controls['fromdate'];
  }
  get getDateTo(){
    return this.reportForm.controls['todate'];
  }
  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit(e : any){    
    if(this.reportForm.status == 'VALID'){
      this.dataService.setData(this.reportForm.value);
      this.router.navigate(['/demo-report/GetAuditReport']);
      // this.atmService.CreateAtm(this.CreateAtmFrom.value).subscribe({
      //   next:(val)=>{this.router.navigate(['/atm-dashboard'])},
      //   error:(val)=>{this.invalidData = true}
      // })
    }else{
      this.markAllAsTouched(this.reportForm);
      console.log(console.error());
    }
  }
}
