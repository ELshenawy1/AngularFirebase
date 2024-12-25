import { AccountService } from 'src/app/account/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditUser } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  editUser? : EditUser;
  selectedBranchId: number = 2; // Initialize with a default value

  constructor(public accountService : AccountService,private activatedRoute : ActivatedRoute,private router : Router){
    
  }

  ngOnInit(): void {
    const id = localStorage.getItem('userId')//this.activatedRoute.snapshot.paramMap.get('id')
    id && this.accountService.GetUserData(+id).subscribe({
      next:(val)=>{      
        this.editUser = val;
        this.selectedBranchId = +val.branchId
        this.userBranchId = +val.branchId
        this.getUserName.setValue(this.editUser.userName)
        this.getLoginName.setValue(this.editUser.loginName)
        this.branches = Object.entries(val.branches).map(([id, name]) => ({ id: +id, name }));
        this.UpdateUserForm.patchValue({
          isSecurityOfficer: this.editUser.isSecurityOfficer
        });
        this.UpdateUserForm.patchValue({
          isLocked: this.editUser.isLocked
        });
        this.UpdateUserForm.patchValue({
          branchId: +this.editUser.branchId
        });
      }
    })
  }


  UpdateUserForm = new FormGroup({
    id: new FormControl(localStorage.getItem('userId')),// new FormControl(this.activatedRoute.snapshot.paramMap.get('id')),
    userName : new FormControl(this.editUser?.userName,[Validators.required]),
    loginName : new FormControl('',[Validators.required]),
    branchId : new FormControl(0,[Validators.required]),
    isSecurityOfficer : new FormControl(false,[Validators.required]),
    isLocked : new FormControl(false,[Validators.required]),
  })

  branches: { id: number, name: string }[] = []; 
  userBranchId? : number;
  get getUserName(){
    return this.UpdateUserForm.controls['userName'];
  }
  get getLoginName(){
    return this.UpdateUserForm.controls['loginName'];
  }
  get getBranch(){
    return this.UpdateUserForm.controls['branchId'];
  }
  get getIsSecurityOfficer(){
    return this.UpdateUserForm.controls['isSecurityOfficer'];
  }
  get getIsLocked(){
    return this.UpdateUserForm.controls['isLocked'];
  }


  formOperation(e:any){
    if(this.UpdateUserForm.status == 'VALID'){
      
      this.accountService.UpdateUser(this.UpdateUserForm.value).subscribe({
        next:()=>{this.router.navigate(['user/showusers'])}
      })
      

    }
    e.preventDefault
  }
  test(){
    this.getBranch.setValue(3)

  }
}
