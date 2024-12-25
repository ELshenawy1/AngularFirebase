import { BranchBasic } from "./branch";
import { Region } from "./region";

export interface DeviceDTO {
  id: string;
  title: string;
  isCheck: boolean;
  location: string;
}

export interface DeviceSubGroupDTO {
  id: number;
  name: string;
  isGroup: boolean;
  deviceDTO: DeviceDTO[];
}

export interface DeviceGroupDTO {
  id: number;
  name: string;
  isGroup: boolean;
  deviceSubGroupDTO: DeviceSubGroupDTO[];
}

export interface ReportIndexPageData {
  deviceList: DeviceGroupDTO[];
  reportsTypes: { [key: number]: string };
}


export interface ExportReportDTO {
  actionType?: string | null;
  user?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  todate?: string | null;
  fromdate?: string | null;
  deviceIds?: string;
  from?: string | null;
  to?: string | null;
  termId? : string | null;
  mobileNumber?: string | null;
  transactionType?: string | null;
  transactionStatus?: string | null;
  brnach?: string | null;
  region?: string | null;
  responseCode? : string | null;
  reportCode? : string | null;

}

export interface ForexReportData {
  reportTypeList: { [key: number]: string };
  atmList: string[];
  selectedBranch: number;
  respCodeList: { [key: number]: string };
  branchesList: BranchBasic[];
  regionsList: Region[];
};


export interface WalletReportData {
  atmList: string[];
  transStatus: TransStatus[];
  transType: { [key: number]: string };
  branchesList: BranchBasic[];
  regionsList: Region[];
};

export interface TransStatus{
  responseCode : string;
  responseDesc : string
}