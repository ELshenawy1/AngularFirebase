import { Component, OnInit } from '@angular/core';
import { AtmService } from '../atm.service';
import { Router } from '@angular/router';
import { CreateAtmDependencies } from 'src/app/shared/models/atm';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-atm',
  templateUrl: './edit-atm.component.html',
  styleUrls: ['./edit-atm.component.css']
})
export class EditAtmComponent implements OnInit{
  constructor(private atmService : AtmService, private router : Router){}

  
  ngOnInit(): void {
    const atmId = localStorage.getItem('atmId')//this.activatedRoute.snapshot.paramMap.get('id')
    atmId && this.atmService.GetById(atmId).subscribe({
      next: (response) => {
        this.CreateAtmFrom.patchValue({
          originalAtmId: response?.id,
          atmId: response?.id,
          atmId1: response?.id1,
          atmId2: response?.id2,
          atmAddress: response?.address,
          atmRegionId: (response?.selectedRegion)?response?.selectedRegion : null,
          atmBranchId: (response?.branchId)?response?.branchId : null,
          atmType: (response?.atmType?.atmType)?response?.atmType?.atmType : null,
          atmIp: response?.atmIp,
          activeFRX: (response?.activeFrx) ? (response?.activeFrx) : false,
          frxProfile: response?.frxProfile
        });
      }
    })  
    this.atmService.GetCreateAtmDependencies().subscribe({
      next:(response)=>
        {
          this.createAtmDependencies= response
        },
      error:(err)=>{}
    })


    
  }

  updateValidators() {
    const control = this.CreateAtmFrom.get('frxProfile');
    if(control){
      (this.getActiveFRX.value) ? control.setValidators([Validators.required]) : control.clearValidators();
      control.updateValueAndValidity();
    }
  }
  
  
  createAtmDependencies: CreateAtmDependencies|null = null; 

  CreateAtmFrom = new FormGroup({
    originalAtmId: new FormControl<string|null>(null,[Validators.required]),
    atmId: new FormControl<string|null>(null,[Validators.required]),
    atmId1 : new FormControl<string|null>(null,[Validators.required]),
    atmId2 : new FormControl<string|null>(null,[]),
    // atmDesc : new FormControl('',[]),
    atmAddress : new FormControl<string|null>(null,[]),
    atmRegionId : new FormControl<number|null>(null,[]),
    atmBranchId : new FormControl<number|null>(null,[]),
    atmType : new FormControl<number|null>(null,[Validators.required]),
    atmIp : new FormControl<string|null>(null,[Validators.required,this.ipAddressValidator()]),
    // jrnLastDownload : new FormControl('',[]),
    // lastUpdateUserid : new FormControl('',[]),
    // lastUpdateDate : new FormControl('',[]),
    // atmaccountNum : new FormControl('',[]),
    activeFRX : new FormControl<boolean|null>(false,[]),
    frxProfile : new FormControl<string|null>(null,[]),
  })
  
  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
  



  
  ipAddressValidator() {
    return (control: { value: string }) => {
      const regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      if (regex.test(control.value)) {
        return null;
      } else {
        return { invalidIpAddress: true }; // invalid IP
      }
    };
  }

  get getAtmId(){
    return this.CreateAtmFrom.controls['atmId'];
  }
  get getAtmType(){
    return this.CreateAtmFrom.controls['atmType'];
  }
  get getAtmId1(){
    return this.CreateAtmFrom.controls['atmId1'];
  }

  get getActiveFRX(){
    return this.CreateAtmFrom.controls['activeFRX'];
  }
  get getFrxProfile(){
    return this.CreateAtmFrom.controls['frxProfile'];
  }
  get getAtmIp(){
    return this.CreateAtmFrom.controls['atmIp'];
  }

  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }


  onSubmit(e : any){    
    if(this.CreateAtmFrom.status == 'VALID'){
      this.atmService.EditAtm(this.CreateAtmFrom.value).subscribe({
        next:(val)=>{;this.router.navigate(['/ATM/ShowATMs'])},
        error:(val)=>{this.invalidData = true}
      })
    }else
      this.markAllAsTouched(this.CreateAtmFrom);
  }


  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
