import { DataService } from './../data.service';
import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForexReportData } from 'src/app/shared/models/export-report';

@Component({
  selector: 'app-frx-report',
  templateUrl: './frx-report.component.html',
  styleUrls: ['./frx-report.component.css']
})
export class FrxReportComponent implements OnInit {
  forexReportData: ForexReportData | null = null

  constructor(private reportService: ReportService, private router: Router, private dataService:DataService) {

  }
  ngOnInit(): void {
    this.reportService.getForexPageDependency().subscribe({
      next: (result) => { this.forexReportData = result; }
    })
  }

  forexReportForm = new FormGroup({
    reportCode: new FormControl(null, [Validators.required]),
    termId: new FormControl(null, []),
    responseCode: new FormControl(null, []),
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null, [Validators.required]),
  })


  get getReportCode() {
    return this.forexReportForm.controls['reportCode'];
  }
  get getTermId() {
    return this.forexReportForm.controls['termId'];
  }
  get getResponseCode() {
    return this.forexReportForm.controls['responseCode'];
  }
  get getFrom() {
    return this.forexReportForm.controls['from'];
  }
  get getTo() {
    return this.forexReportForm.controls['to'];
  }

  hasAnyError(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit(e: any) {
    if (this.forexReportForm.status == 'VALID') {
      this.dataService.setData(
        {
          from: this.getFrom.value,
          to: this.getTo.value,
          termId: this.getTermId.value,
          reportCode: this.getReportCode.value,
          responseCode: this.getResponseCode.value,
        });
        this.router.navigate([`/demo-report/FRXNewTransactionsReport`])
      // })
    } else {
      this.markAllAsTouched(this.forexReportForm);
      console.log(console.error());
    }
  }
}
