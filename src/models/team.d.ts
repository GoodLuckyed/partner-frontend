import {UserType} from "./user";
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;//表示可有可无
    maxNum: number;
    password?: string,
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
    userId:number;
}
