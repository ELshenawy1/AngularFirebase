export interface User{
    // email : string,
    displayName : string,
    token : string
}

export interface UserData{
    userId: number,
    branch: string,
    userName: string,
    login: string ,
    isSecurityOfficer: boolean,
    locked: boolean
}
export interface EditUser{
    id: number,
    branchId: string,
    userName: string,
    loginName: string ,
    isSecurityOfficer: boolean,
    isLocked: boolean,
    branches : { [key: number]: string }
}

export interface NavLink {
    menuEnabled: boolean;
    menuId : number;
    menuName : string;
    menuParent? : number;
    menuUrl : string;
    navLink : NavLink[];
  }
  