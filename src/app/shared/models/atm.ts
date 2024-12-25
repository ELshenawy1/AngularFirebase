import { BranchBasic } from "./branch";

export interface Atm{
    id: string;
    id1: string;
    id2: string;
    description : string | null;
    address: string | null;
    branchId: number;
    activeFrx: boolean | null;
    activeMnr: boolean | null;
    activeWlt: boolean | null;
    atmBranch: string;
    atmType: CorAtmType;
    atmIp : string;
    cassetteGroupList : CassetteGroup[];
    selectedRegion : number | null;
    selectedCassetteGroup : number | null;
    cassetteGroup : string;
    frxProfile : string;
    selectedType : number;
    SelectedBranch : number | null;
    regionName : string | null;
}
export interface CorAtmType {
    atmType: number;
    typeName: string;
}

export interface CassetteGroup{
    groupId : number;
    groupName : string;
}
export interface CreateAtmDependencies {
    frxAtmProfile: FrxAtmProfile[];
    corBranchTab: BranchBasic[];
    corAtmType: CorAtmType[];
    corRegionTab: CorRegionTab[];
    // corCassettesGroup: CorCassettesGroup[];
}
export interface CorRegionTab {
    regionId: number;
    regionName: string;
  }
export interface FrxAtmProfile {
    atmProfile: number;
    atmProfileDesc: string;
}
export interface AtmDashboard {
    atmId: number;
    groupName: string;
    balance: number;
    replinshDate: Date;
    depositAmount : number
  }

  export interface AtmDepositData {
    id: string;
    count: number;
    totalCashInAmount: number;
    lastDepositDate : Date;
    lastDepositAmount : number,
    atmBalance : number,
    lastReplenishmentDate : Date
  }
