import { ConfigService } from './../report/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Region } from '../shared/models/region';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private httpClient : HttpClient, private router : Router, private configService : ConfigService) { }
  GetAllRegions(){
    return this.httpClient.get<Region[]>(this.baseUrl+`/region/GetAll`).pipe(
      catchError(error => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse) {
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }
  RemoveRegion(id : number){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.httpClient.delete(this.baseUrl+`/Region?id=${id}`,{headers});
  }

  CreateRegion(vlaues : any){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.httpClient.post(this.baseUrl+'/Region',vlaues,{headers});
  }  
  EditRegion(vlaues : any){

    return this.httpClient.put(this.baseUrl+'/Region',vlaues);
  }
  

  GetById(regionId : any){
    const headers = new HttpHeaders()
    .set('regionId', regionId)
    return this.httpClient.get<Region>(this.baseUrl+`/Region/GetByID`, { headers: headers }).pipe(
      catchError(error => this.handleError(error)));
  }
}
