import myAxios from "../../utils/request.ts";

enum API {
    //添加帖文
    ADD_POST = "/post/add",
    //获取帖文列表
    POST_LIST = "/post/list",
    //根据id获取帖文信息
    GET_POST_BY_ID = "/post/get",
    //点赞帖文
    LIKE_POST = "/post/like",
    //根据id删除帖文
    DELETE_POST_BY_ID = "/post/del/",
}

// 添加帖文
export const reqAddPost = (data: any) => {
    return myAxios.post(API.ADD_POST,data,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    });
}

// 获取帖文列表
export const reqPostList = (currentPage:number,title?:string) => {
    return myAxios.get(API.POST_LIST,{
        params:{
            currentPage:currentPage,
            title:title
        }
    })
}

//根据id获取帖文信息
export const reqPostById = (id:number) => {
    return myAxios.get(API.GET_POST_BY_ID + `/${id}`);
}

//点赞帖文
export const reqLikePost = (id:number) => {
    return myAxios.put(API.LIKE_POST + `/${id}`);
}

//根据id删除帖文
export const reqDeletePostById = (id:number) => {
    return myAxios.delete(API.DELETE_POST_BY_ID + `/${id}`);
}
