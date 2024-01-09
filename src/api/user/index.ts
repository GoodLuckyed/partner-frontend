import myAxios from "../../utils/request.ts";

enum API {
    //根据id获取用户信息
    GET_USER_BY_ID = '/user'
}

//根据id获取用户信息
export const reqGetUserById = (id:number) => {
    return myAxios.get(API.GET_USER_BY_ID + `/${id}`)
}
