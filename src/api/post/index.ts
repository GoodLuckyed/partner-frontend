import myAxios from "../../utils/request.ts";

enum API {
    //添加帖文
    ADD_POST = "/post/add",
    //获取帖文列表
    POST_LIST = "/post/page",
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
export const reqPostList = (currentPage:number,PageSize:number) => {
    return myAxios.get(`${API.POST_LIST}/${currentPage}/${PageSize}`)
}
