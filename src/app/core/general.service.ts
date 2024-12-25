import { ConfigService } from './../report/config.service';
import { Injectable } from '@angular/core';
import { NavLink } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private httpClient : HttpClient, private router : Router, private configService : ConfigService) { }

  GetMenusTab(){
    return this.httpClient.get<NavLink[]>(this.baseUrl+`/General/MenusTab`);
  }

}
