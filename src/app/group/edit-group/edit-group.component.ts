import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit{
  constructor(public router : Router, 
    public groupService : GroupService){
    }
  ngOnInit(): void {
    const groupId = localStorage.getItem('groupId')
    groupId && this.groupService.GetById(groupId).subscribe({
      next: (response) => {
        this.editGruopForm.patchValue({
          groupId: response?.groupId,
          groupName: response?.groupName,
          notes: response?.notes,
        });
      }
    })  
  }
    
  editGruopForm = new FormGroup({
    groupId : new FormControl<number|null>(null),
    groupName : new FormControl('',[Validators.required]),
    notes : new FormControl('',[])
  })
  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }


  get getGroupName(){
    return this.editGruopForm.controls['groupName'];
  }
  get getGroupNotes(){
    return this.editGruopForm.controls['notes'];
  }


  onSubmit(e : any){    
    if(this.editGruopForm.status == 'VALID'){
      this.groupService.EditGroup(this.editGruopForm.value).subscribe({
        next:(val)=>{this.router.navigate(['/Group/Index'])},
        error:(val)=>{this.invalidData = true}
      })
    }else{
      this.invalidData = true
    }
  }

}
