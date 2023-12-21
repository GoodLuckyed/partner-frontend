export type UserType = {
    id:number;
    username:string;
    userAccount:string;
    profile?:string,
    avatarUrl?:string;
    gender:number;
    phone:string;
    email:string;
    userRole:number,
    planetCode?:string;
    tags:string;
    createTime:Date;
}
