import { BranchService } from './../../branch/branch.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { BranchBasic } from 'src/app/shared/models/branch';
import { catchError, map, of } from 'rxjs';
import { ConfigService } from 'src/app/report/config.service';

function usernameExistsValidator(accountService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const username = control.value;
    return accountService.checkUsernameExists(username).pipe(
      map(exists => exists ? { usernameExists: true } : null),
      catchError(() => of(null))
    );
  };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  branches: BranchBasic[] = [];
  baseUrl = this.configService.getConfig('apiUrl');
  currentBank = this.configService.getConfig('currentBank');
  bankLogo : string = "";
  constructor(public router: Router,
    public accountService: AccountService,
    public branchService: BranchService,
    private configService: ConfigService) {
  }
  ngOnInit(): void {
    this.bankLogo = this.baseUrl.slice(0, -3) + `${this.currentBank}_banklogo.png`;

    this.branchService.GetAllBasic().subscribe({
      next: (b: BranchBasic[]) => { this.branches = b; }
    })
  }

  registerationForm = new FormGroup({
    userName: new FormControl('', [Validators.required], [usernameExistsValidator(this.accountService)]),
    branchId: new FormControl(null, []),
    password: new FormControl('', [Validators.required])
  })
  invalidData: boolean = false;
  hideAlert() {
    this.invalidData = false
  }


  get getUserName() {
    return this.registerationForm.controls['userName'];
  }
  get getPassword() {
    return this.registerationForm.controls['password'];
  }



  onSubmit(e: any) {
    if (this.registerationForm.status == 'VALID') {
      this.accountService.register(this.registerationForm.value).subscribe({
        next: (val) => { this.router.navigate(['/user/showusers']) },
        error: (val) => { this.invalidData = true }
      })
    } else {
      this.invalidData = true
    }


  }

}
