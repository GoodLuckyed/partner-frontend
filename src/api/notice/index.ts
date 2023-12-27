import myAxios from "../../utils/request.ts";

enum API {
    // 获取公告列表
    GET_NOTICE_LIST = '/notice/list',
    //根据id获取公告信息
    GET_NOTICE_BY_ID = '/notice/get',
}

//获取公告列表
export const reqGetNoticeList = () => {
    return myAxios.get(API.GET_NOTICE_LIST);
}

//根据id获取公告信息
export const reqGetNoticeById = (noticeId:number) => {
    return myAxios.get(API.GET_NOTICE_BY_ID,{
        params:{
            noticeId:noticeId
        }
    });
}
