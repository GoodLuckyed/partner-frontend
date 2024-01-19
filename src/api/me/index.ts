import myAxios from "../../utils/request.ts";

enum API {
    //获取我的关注列表
    GET_MY_FOLLOW = '/follow//list/follows',
    //获取我的粉丝列表
    GET_MY_FANS = '/follow/list/fans',
    //获取我的帖文列表
    GET_MY_POST = '/post/list/myPost',
}

//获取我的关注列表
export const getMyFollow = () => {
    return myAxios.get(API.GET_MY_FOLLOW)
}

//获取我的粉丝列表
export const getMyFans = () => {
    return myAxios.get(API.GET_MY_FANS)
}

//获取我的帖文列表
export const getMyPost = () => {
    return myAxios.get(API.GET_MY_POST)
}
