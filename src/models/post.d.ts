import {UserType} from "./user";

export type PostType = {
    id: number;
    title: string;
    content: string;
    image: string;
    userId: number;
    likes: number;
    comments: number;
    isLike: boolean;
    author:UserType;
    createTime: Date;
    updateTime: Date;
}
