import {UserType} from "./user";

export type CommentType = {
    id: number,
    userId: number,
    postId: number,
    parentId?: number,
    answerId?: number,
    content: string,
    likes: number,
    status: number,
    commentUser:UserType
    isLike: boolean,
    createTime: Date,
    updateTime: Date
}
