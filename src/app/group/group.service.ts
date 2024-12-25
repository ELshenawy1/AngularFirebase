import { ConfigService } from './../report/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AssignUserToGroup, Group, UserWithGroups } from '../shared/models/group';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private httpClient : HttpClient, private router : Router, private configService : ConfigService) { }

  GetUserGroups(userId : number){    
    const headers = new HttpHeaders()
    .set('userId', userId.toString())

    return this.httpClient.get<UserWithGroups>(this.baseUrl+`/Group/GetUserGroups`, { headers: headers }).pipe(
      catchError(error => this.handleError(error)));;
  }
  GetAllGroups(){
    return this.httpClient.get<Group[]>(this.baseUrl+`/Group/GetAll`).pipe(
      catchError(error => this.handleError(error)));;
  }

  AssignUserToGroup(assignUserToGroup:AssignUserToGroup){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(this.baseUrl+`/Group/AssignUserToGroup`,assignUserToGroup,{headers}).pipe(
      catchError(error => this.handleError(error)));;
  }

  RemoveUserFromGroup(userId : number , groupId : number){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.delete(this.baseUrl+`/Group/${userId}/${groupId}`,{headers}).pipe(
      catchError(error => this.handleError(error)));;
  }
  RemoveGroup(groupId : number){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.delete(this.baseUrl+`/Group?groupId=${groupId}`,{headers}).pipe(
      catchError(error => this.handleError(error)));;
  }

  CreateGroup(group : any){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(this.baseUrl+`/Group/CreateGroup`,group,{headers}).pipe(
      catchError(error => this.handleError(error)));;
  }

  private handleError(error: HttpErrorResponse) {
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }

  GetById(groupId : any){
    const headers = new HttpHeaders()
    .set('groupId', groupId)
    return this.httpClient.get<Group>(this.baseUrl+`/Group/GetById`, { headers: headers }).pipe(
      catchError(error => this.handleError(error)));
  }

  EditGroup(vlaues : any){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.httpClient.put(this.baseUrl+'/Group',vlaues,{headers});
  }


}
