import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeviceGroupDTO, ForexReportData, ReportIndexPageData, WalletReportData } from '../shared/models/export-report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // baseUrl: string = environment.apiUrl;   
  baseUrl = this.configService.getConfig('apiUrl');

  constructor(private http: HttpClient , private configService: ConfigService) {}


  getReport(reportName : string , values : any) : Observable<string> {
    return this.http.post(`${this.baseUrl}/Report/${reportName}`,values,{responseType:'text'});
  }
  getReportPdf(reportName : string , vlaues : any): Observable<Blob> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    const apiUrl = `${this.baseUrl}/Report/${reportName}`; 
  
    return this.http.post(apiUrl,vlaues, {headers, responseType: 'blob' }); // Expecting a binary PDF file (blob)
  }


  getWalletPageDependency() :  Observable<WalletReportData>{
    return this.http.get<WalletReportData>(`${this.baseUrl}/Report/WalletReportDependencies/`);
  }

  getForexPageDependency() :  Observable<ForexReportData>{ 
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<ForexReportData>(`${this.baseUrl}/Report/ForexReport/`,{headers});
  }

  GetDevices(){
    return this.http.get<ReportIndexPageData>(`${this.baseUrl}/ExportReport/GetDevices/`);
  }

  getUsersAndActions(){
    return this.http.get<any>(this.baseUrl+`/Report/UsersAndActions`);
  }
}
