import myAxios from "../../utils/request.ts";

enum API {
    // 获取公告列表
    GET_NOTICE_LIST = '/notice/list',
    //根据id获取公告信息
    GET_NOTICE_BY_ID = '/notice/get',
    //修改公告信息
    UPDATE_NOTICE = '/notice/update',
    //删除公告信息
    DELETE_NOTICE = '/notice/delete',
    //添加公告信息
    ADD_NOTICE = '/notice/add'
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

//修改公告信息
export const reqUpdateNotice = (noticeId:number,title:string,content:string) => {
    return myAxios.post(API.UPDATE_NOTICE,{
        id:noticeId,
        title:title,
        content:content
    });
}

//删除公告信息
export const reqDeleteNotice = (noticeId:number) => {
    return myAxios.post(API.DELETE_NOTICE,{},{
        params:{
            noticeId:noticeId
        }
    })
}

//添加公告信息
export const reqAddNotice = (data:any) => {
    return myAxios.post(API.ADD_NOTICE,{
        ...data
    })
}
