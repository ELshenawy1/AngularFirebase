import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-region',
  templateUrl: './create-region.component.html',
  styleUrls: ['./create-region.component.css']
})
export class CreateRegionComponent implements OnInit{

  errorMessage: string | null = null;

  constructor(private regionService : RegionService, private router : Router){}
  ngOnInit(): void {}


  CreateRegionForm = new FormGroup({
    regionName: new FormControl<string|null>(null,[Validators.required]),
  })
  
  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
 
  
  get getRegionName(){
    return this.CreateRegionForm.controls['regionName'];
  }


  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }


  onSubmit(e : any){
    if(this.CreateRegionForm.status == 'VALID'){
      this.regionService.CreateRegion(this.CreateRegionForm.value).subscribe({
        next:(val)=>{this.router.navigate(['/Region/ShowRegions'])},
        error:(err)=>{this.invalidData = true; this.errorMessage = err.error;}
      })
    }else{
      this.markAllAsTouched(this.CreateRegionForm);
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
