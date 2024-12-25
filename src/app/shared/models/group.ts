export interface Group{
    groupId: number,
    groupName : string,
    notes?: string,
    lastUpdateUserid?: number,
    lastUpdateDate?: Date
}

export interface UserWithGroups{
    userId : number ,
    userName : string,
    groups : Group[]
}

export interface AssignUserToGroup{
    userId:number,
    groupId:number
}