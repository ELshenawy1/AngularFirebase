import { ConfigService } from './../../report/config.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private configService:ConfigService){}
  // url : string = '';
  baseUrl = this.configService.getConfig('apiUrl');
  currentBank = this.configService.getConfig('currentBank');
  ngOnInit(): void {
    
    this.bankBackground = this.baseUrl.slice(0, -3) + `${this.currentBank}_BankBackgroud.png`;




  }
  bankBackground : string = "";
}
