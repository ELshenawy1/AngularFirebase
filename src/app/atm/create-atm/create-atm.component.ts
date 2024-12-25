import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../atm.service';
import { CreateAtmDependencies } from 'src/app/shared/models/atm';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
function atmIdExistsValidator(atmService: AtmService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const atmId = control.value;
    return atmService.checkAtmIdExists(atmId).pipe(
      map(exists => exists ? { atmIdExists: true } : null),
      catchError(() => of(null))
    );
  };
}
function atmIpExistsValidator(atmService: AtmService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const atmIp = control.value;
    return atmService.checkAtmIpExists(atmIp).pipe(
      map(exists => exists ? { atmIpExists: true } : null),
      catchError(() => of(null))
    );
  };
}


@Component({
  selector: 'app-create-atm',
  templateUrl: './create-atm.component.html', 
  styleUrls: ['./create-atm.component.css']
})
export class CreateAtmComponent implements OnInit{
  constructor(private atmService : AtmService, private router : Router){}
  ngOnInit(): void {
    this.atmService.GetCreateAtmDependencies().subscribe({
      next:(response)=>
        {
          this.createAtmDependencies= response
        },
      error:(err)=>{}
    })
  }

  createAtmDependencies: CreateAtmDependencies|null = null; 

  CreateAtmFrom = new FormGroup({
    atmId: new FormControl<string|null>(null,[Validators.required,Validators.maxLength(20)],[atmIdExistsValidator(this.atmService)]),
    atmId1 : new FormControl<string|null>(null,[Validators.required]),
    atmId2 : new FormControl<string|null>(null,[]),
    // atmDesc : new FormControl('',[]),
    atmAddress : new FormControl<string|null>(null,[]),
    atmRegionId : new FormControl<number|null>(null,[]),
    atmBranchId : new FormControl<number|null>(null,[]),
    atmType : new FormControl<number|null>(null,[Validators.required]),
    atmIp : new FormControl<string|null>(null,[Validators.required,this.ipAddressValidator()],[atmIpExistsValidator(this.atmService)]),
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
  updateValidators() {
    const control = this.CreateAtmFrom.get('frxProfile');
    if(control){
      if(this.getActiveFRX.value) 
        control.setValidators([Validators.required]) 
      else{
        control.clearValidators();
        control.setValue(null);
      }
        
      control.updateValueAndValidity();
    }
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
      this.atmService.CreateAtm(this.CreateAtmFrom.value).subscribe({
        next:(val)=>{this.router.navigate(['/ATM/ShowATMs'])},
        error:(val)=>{this.invalidData = true}
      })
    }else{
      this.markAllAsTouched(this.CreateAtmFrom);
      console.log(console.error());
    }
  }


  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
