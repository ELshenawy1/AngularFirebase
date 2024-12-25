// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoReportComponent } from './demo-report/demo-report.component';
import { SystraceComponent } from './systrace/systrace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { RouterModule } from '@angular/router';
import { ExportReportComponent } from './export-report/export-report.component';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletReportComponent } from './wallet-report/wallet-report.component';
import { FrxReportComponent } from './frx-report/frx-report.component';



@NgModule({
  declarations: [
    DemoReportComponent,
    SystraceComponent,
    ReportDashboardComponent,
    ExportReportComponent,
    WalletReportComponent,
    FrxReportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TreeModule,
    CheckboxModule,
    TreeSelectModule,
    BrowserAnimationsModule
  ]
})
export class ReportModule { }
