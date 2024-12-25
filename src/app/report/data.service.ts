import { Injectable } from '@angular/core';
import { ExportReportDTO } from '../shared/models/export-report';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: ExportReportDTO|null = null; 

  setData(data: ExportReportDTO) {
    this.data = {
      user : data.user,
      todate: data.todate,
      fromdate: data.fromdate,
      deviceIds: data.deviceIds,
      from : data.from,
      to : data.to,
      brnach : data.brnach,
      actionType : data.actionType,
      dateFrom :data.dateFrom,
      dateTo : data.dateTo,
      mobileNumber : data.mobileNumber,
      region : data.region,
      termId : data.termId,
      transactionStatus : data.transactionStatus,
      transactionType : data.transactionType,
      reportCode : data.reportCode,
      responseCode : data.responseCode
    };
  }
  getData() { 
    return this.data;
  }

}
