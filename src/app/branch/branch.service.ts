import { ConfigService } from './../report/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Branch, BranchBasic } from '../shared/models/branch';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private httpClient : HttpClient, private router : Router, private configService :ConfigService) { }

  GetAllBranches(){
    return this.httpClient.get<Branch[]>(this.baseUrl+`/branch/all`).pipe(
      catchError(error => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse) {
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }
  GetAllBasic(){

    return this.httpClient.get<BranchBasic[]>(this.baseUrl+'/branch/basic');
  }
  
  CreateAtm(vlaues : any){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.httpClient.post(this.baseUrl+'/Branch',vlaues,{headers});
  }
  
}
