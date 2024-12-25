import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-report',
  templateUrl: './demo-report.component.html',
  styleUrls: ['./demo-report.component.css']
})
export class DemoReportComponent implements OnInit {
  reportSrc: SafeResourceUrl | null = null;   
  id : string = '';
  data : any;
  reportData: string = '';
  pdfUrl: SafeResourceUrl = '';
 
  constructor(private http : HttpClient, private activatedRoute : ActivatedRoute,private reportService: ReportService, private dataService : DataService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.data = this.dataService?.getData();
    console.log(this.data)
    this.getReportPdf();
  }

  getReportPdf(): void {
    this.reportService.getReportPdf(this.id,this.data).subscribe(
      (pdfBlob: Blob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
      },
      (error) => {
        console.error('Error fetching PDF report:', error);
      }
    );
  }
  
}
