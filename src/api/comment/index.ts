import myAxios from "../../utils/request.ts";

enum API{
    //根据帖文id获取评论列表
    GET_COMMENT_LIST = "/comments/list/",
    //点赞评论
    LIKE_COMMENT = "/comments/like/",
    //根据评论id获取评论
    GET_COMMENT = "/comments/get/",
    //根据评论id删除评论
    DELETE_COMMENT = "/comments/del/",
    //添加评论
    ADD_COMMENT = "/comments/add/",
}

//获取评论列表
export const reqCommentList = (id:number) => {
    return myAxios.get(API.GET_COMMENT_LIST + id);
}

//点赞评论
export const reqLikeComment = (id:number) => {
    return myAxios.put(API.LIKE_COMMENT + id);
}

//根据评论id获取评论
export const reqComment = (id:number) => {
    return myAxios.get(API.GET_COMMENT + id);
}

//根据评论id删除评论
export const reqDeleteComment = (id:number) => {
    return myAxios.delete(API.DELETE_COMMENT + id);
}

//添加评论
export const reqAddComment = (id:number,comment:string) => {
    return myAxios.post(API.ADD_COMMENT,{
        postId:id,
        content:comment
    });
}
