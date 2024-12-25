import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css']
})
export class EditRegionComponent implements OnInit{

  errorMessage: string | null = null;
  regionId : any;

  constructor(private regionService : RegionService, private router : Router){}
  ngOnInit(): void {
    const regionId = localStorage.getItem('regionId')
    regionId && this.regionService.GetById(regionId).subscribe({
      next: (response) => {
        console.log(response)
        this.EditRegionForm.patchValue({
          regionId: response?.regionId.toString(),
          regionName: response?.regionName
        });
      }
    })  

    this.EditRegionForm.get('regionId')?.disable();
  }


  EditRegionForm = new FormGroup({
    regionId : new FormControl<string|null>(null),
    regionName: new FormControl<string|null>(null,[Validators.required]),
  })
  
  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
 
  
  get getRegionName(){
    return this.EditRegionForm.controls['regionName'];
  }


  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }


  onSubmit(e : any){
    if(this.EditRegionForm.status == 'VALID'){
      const formData = this.EditRegionForm.getRawValue();
      this.regionService.EditRegion(formData).subscribe({
        next:()=>{this.router.navigate(['/Region/ShowRegions']);},
        error:(err)=>{this.invalidData = true; this.errorMessage = err.error;}
      })
    }else{
      this.markAllAsTouched(this.EditRegionForm);
    }
  }


  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
