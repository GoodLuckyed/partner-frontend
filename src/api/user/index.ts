import myAxios from "../../utils/request.ts";

enum API {
    //根据id获取用户信息
    GET_USER_BY_ID = '/user',
    //根据用户昵称查询用户信息
    GET_USER_BY_USERNAME = '/user/search',
}

//根据id获取用户信息
export const reqGetUserById = (id:number) => {
    return myAxios.get(API.GET_USER_BY_ID + `/${id}`)
}

//根据用户昵称查询用户信息
export const reqGetUsers = (username:string) => {
    return myAxios.get(API.GET_USER_BY_USERNAME,{
        params:{
            username:username
        }
    })
}
