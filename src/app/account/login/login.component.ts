import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ConfigService } from 'src/app/report/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(public router : Router, 
    public accountService : AccountService,
    private activatedRouter : ActivatedRoute,
    private configService:ConfigService){
      this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'] || '/home'
    }
  baseUrl = this.configService.getConfig('apiUrl');
  currentBank = this.configService.getConfig('currentBank');
  ngOnInit(): void {
    this.bankLogo = this.baseUrl.slice(0, -3) + `${this.currentBank}_banklogo.png`;
  }
  bankLogo : string = "";
  invalidEmailAndPassword : boolean = false;
  returnUrl : string  = "";

  loginForm = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  hideAlert(){
    this.invalidEmailAndPassword = false;
  }


  get getUserName(){
    return this.loginForm.controls['userName'];
  }
  get getPassword(){
    return this.loginForm.controls['password'];
  }

  onSubmit(e : any){
    
    if(this.loginForm.status == 'VALID'){
      this.accountService.login(this.loginForm.value).subscribe({
        next:()=>this.router.navigate([((this.returnUrl=="/login" ? "/home": this.returnUrl))]),
        error:()=> this.invalidEmailAndPassword = true
      })
    }
  }

}
