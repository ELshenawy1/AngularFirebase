import { ConfigService } from './../report/config.service';
import { Pagination, PagingParams } from './../shared/models/paging';
import { Injectable } from '@angular/core';
import { AtmDashboard, AtmDepositData } from '../shared/models/atm';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private httpClient : HttpClient, private router : Router, private configService : ConfigService) { }

  GetAtmDepositData(){
    return this.httpClient.get<AtmDepositData[]>(this.baseUrl+`/Atm/HighesDeposits`).pipe(
      catchError(error => this.handleError(error)));
  }

  
  GetAtmDasboardData(pageIndex : number){
    return this.httpClient.get<Pagination<AtmDashboard[]>>(this.baseUrl+`/Atm/GetAtmDashboardData?PageSize=12&PageIndex=${pageIndex}`).pipe(
      catchError(error => this.handleError(error)));
  }
  // GetDevicesWithFilters(deviceId? : string, pageIndex? : number) {
  GetDevicesWithFilters(pagingParams : PagingParams, deviceId? : string) {
    let params = new HttpParams();
    if(deviceId  && deviceId.trim().length > 0) 
      params = params.append("SearchTerm", deviceId)
    params = params.append("PageIndex", pagingParams.pageIndex.toString());
    params = params.append("PageSize", pagingParams.pageSize.toString());
  
    return this.httpClient.get<Pagination<AtmDashboard[]>>(this.baseUrl+`/Atm/GetAtmDashboardData`,{params}).pipe(
      catchError(error => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse) {
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }

}
