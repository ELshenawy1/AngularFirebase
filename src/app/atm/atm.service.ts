import { ConfigService } from './../report/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Atm, AtmDashboard, CreateAtmDependencies } from '../shared/models/atm';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BranchBasic } from '../shared/models/branch';
import { Pagination, PagingParams } from '../shared/models/paging';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  // baseUrl: string = environment.apiUrl;  

  baseUrl = this.configService.getConfig('apiUrl');
  constructor(private httpClient: HttpClient, private router: Router, private configService: ConfigService) { }

  GetById(atmId: any) {
    const headers = new HttpHeaders()
      .set('atmId', atmId)
    return this.httpClient.get<Atm>(this.baseUrl + `/Atm/GetById`, { headers: headers }).pipe(
      catchError(error => this.handleError(error)));
  }

  CreateAtm(vlaues: any) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.baseUrl + '/Atm', vlaues, { headers });
  }
  EditAtm(vlaues: any) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.put(this.baseUrl + '/Atm', vlaues, { headers });
  }


  GetCreateAtmDependencies() {
    return this.httpClient.get<CreateAtmDependencies>(this.baseUrl + '/ATM/GetCreateAtmDependencies');
  }


  GetAtmBranches() {
    return this.httpClient.get<BranchBasic[]>(this.baseUrl + '/Branch/Basic');
  }

  private handleError(error: HttpErrorResponse) {
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }


  RemoveAtm(id: string) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(this.baseUrl + `/Atm?atmId=${id}`, { headers });
  }
  checkAtmIdExists(atmId: string) {
    return this.httpClient.get<boolean>(`${this.baseUrl}/ATM/AtmIdExists?atmId=${atmId}`);
  }
  checkAtmIpExists(atmIp: string) {
    return this.httpClient.get<boolean>(`${this.baseUrl}/ATM/AtmIpExists?atmIp=${atmIp}`);
  }



  GetAtms(pagingParams: PagingParams, atmId?: string, branchId?: string) {
    let params = new HttpParams();

    params = params.append("PageIndex", pagingParams.pageIndex.toString());
    params = params.append("PageSize", pagingParams.pageSize.toString());
    if(atmId  && atmId.trim().length > 0) 
      params = params.append("atmId", atmId)
    if(branchId  && branchId.trim().length > 0) 
      params = params.append("branchId", branchId)
    
    return this.httpClient.get<Pagination<Atm[]>>(this.baseUrl + `/Atm/GetATMs`, { params }).pipe(
      catchError(error => this.handleError(error)));
  }

}
