import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css']
})
export class CreateBranchComponent implements OnInit{
  constructor(private branchService : BranchService, private router : Router){}
  ngOnInit(): void {

  }


  CreateBranchFrom = new FormGroup({
    branchName: new FormControl<string|null>(null,[Validators.required]),
    region : new FormControl<string|null>(null,[Validators.required]),
    branchAddress : new FormControl<string|null>(null,[]),
    branchTel : new FormControl<string|null>(null,[]),
    contactUser1 : new FormControl<number|null>(null,[]),
    contactUser1Tel : new FormControl<number|null>(null,[]),
    contactUser2 : new FormControl<number|null>(null,[Validators.required]),
    contactUser2Tel : new FormControl<string|null>(null,[Validators.required]),
  })
  
  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }


  get getBranchName(){
    return this.CreateBranchFrom.controls['branchName'];
  }


  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }


  onSubmit(e : any){    
    if(this.CreateBranchFrom.status == 'VALID'){
      this.branchService.CreateAtm(this.CreateBranchFrom.value).subscribe({
        next:(val)=>{this.router.navigate(['/ATM/ShowATMs'])},
        error:(val)=>{this.invalidData = true}
      })
    }else{
      this.markAllAsTouched(this.CreateBranchFrom);
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
