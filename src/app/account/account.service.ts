import { ConfigService } from './../report/config.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, catchError, map, of, tap, throwError } from 'rxjs';
import { EditUser, User, UserData } from '../shared/models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // baseUrl: string = environment.apiUrl;  
  baseUrl = this.configService.getConfig('apiUrl');

  private currentUserSource = new ReplaySubject<User|null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpClient : HttpClient, private router : Router, private configService:ConfigService) { }

  register(vlaues : any){ 
    // return this.httpClient.post(this.baseUrl+'/register',vlaues)
    let headers = new HttpHeaders();
    headers = headers.set('ngrok-skip-browser-warning',`69420`);
    return this.httpClient.post(this.baseUrl+'/Account/CreateUser',vlaues,{headers});
    // .pipe(
    //   tap(user =>{
    //     localStorage.setItem('token' , user.token);
    //     this.currentUserSource.next(user);
    //   }))
  }
  
  loadCurrentUser(token : string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.httpClient.get<User>(this.baseUrl+"/Account/GetCurrent",{headers}).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          return user;
        }else{
          return null
        }
        
      }),
      catchError(error => this.handleError(error))
    );
  } 

  private handleError(error: HttpErrorResponse) {
    if(error.status == 401 ){
      localStorage.removeItem('token');
      this.router.navigate([`/login`]);
    }
    this.router.navigate([`/error/${(error.status == 0 ? 500 : error.status)}`]);
    return throwError('Something bad happened; please try again later.');
  }


  login(vlaues : any){
    return this.httpClient.post<User>(this.baseUrl+'/Account/login',vlaues).pipe(
      tap(user =>{
        localStorage.setItem('token' , user.token);
        this.currentUserSource.next(user);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 400)) {
          return throwError(error);
        } else {
          return this.handleError(error);
        }
      })
    )
  }

  logout(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/Account/Logout`,{headers}).subscribe({
      next:()=>{
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.error('Logout failed', err);
      }
    })


  }


  checkUsernameExists(email : string){
    return this.httpClient.get<boolean>(`${this.baseUrl}/Account/UserNameExists?username=${email}`);
  }

  getAllUsers(){
    return this.httpClient.get<UserData[]>(this.baseUrl+'/User/GetAllUsers').pipe(
      catchError(error => this.handleError(error)));
  }
  RemoveUser(id : number){
    return this.httpClient.get<UserData[]>(this.baseUrl+`/User/RemoveUser?id=${id}`);
  }
  GetUserData(id : number){
    const headers = new HttpHeaders()
    .set('userId', id.toString())

    return this.httpClient.get<EditUser>(this.baseUrl+`/User/GetUserData`, { headers: headers });
  }

  UpdateUser(updatedUser : any){
    return this.httpClient.put(this.baseUrl+`/User/`,updatedUser).pipe(
      catchError(error => this.handleError(error)));
  }


}
