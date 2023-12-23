import myAxios from "../../utils/request";

//接口地址
enum API {
    //创建队伍接口地址
    ADD_TEAM = '/team/addTeam',
    //获取队伍列表接口地址
    GET_TEAM_LIST = '/team/list',
    //加入队伍接口地址
    JOIN_TEAM = '/team/join',
    //根据队伍id查询队伍信息接口地址
    GET_TEAM_INFO_BY_ID = '/team/getTeam',
    //修改队伍信息接口地址
    UPDATE_TEAM_INFO = '/team/updateTeam',
    //获取已加入队伍的列表接口地址
    GET_JOINED_TEAM_LIST = '/team/list/my/join',
    //获取已创建队伍的列表接口地址
    GET_CREATED_TEAM_LIST = '/team/list/my/create',
    //退出队伍接口地址
    QUIT_TEAM = '/team/quit',
    //解散队伍接口地址
    DELETE_TEAM = '/team/deleteTeam'
}

//创建队伍请求接口
export const reqAddTeam = (data:any) => {
    return myAxios.post(API.ADD_TEAM,data)
}

//获取队伍列表请求接口
export const reqGetTeamList = (val?:string,status?:number) => {
    return myAxios.get(API.GET_TEAM_LIST,{
        params:{
            searchText:val,
            pageNum:1,
            status:status
        }
    })
}

//加入队伍请求接口
export const reqJoinTeam = (id:number,password?:string) => {
    return myAxios.post(API.JOIN_TEAM,{
        teamId:id,
        password:password
    })
}

//根据队伍id查询队伍信息请求接口
export const reqGetTeamInfoById = (id:number) => {
    return myAxios.get(API.GET_TEAM_INFO_BY_ID,{
        params:{
            id:id
        }
    })
}

//修改队伍信息请求接口
export const reqUpdateTeamInfo = (data:any) => {
    return myAxios.post(API.UPDATE_TEAM_INFO,data)
}

//获取已加入队伍的列表请求接口
export const reqGetJoinedTeamList = (val?:string) => {
    return myAxios.get(API.GET_JOINED_TEAM_LIST,{
        params:{
            searchText:val,
            pageNum:1
        }
    })
}

//获取已创建队伍的列表请求接口
export const reqGetCreatedTeamList = (val?:string) => {
    return myAxios.get(API.GET_CREATED_TEAM_LIST,{
        params:{
            searchText:val,
            pageNum:1
        }
    })
}

//退出队伍请求接口
export const reqQuitTeam = (id:number) => {
    return myAxios.post(API.QUIT_TEAM,{
        teamId:id
    })
}

//解散队伍请求接口
export const reqDeleteTeam = (id:number) => {
    return myAxios.post(API.DELETE_TEAM,{
        teamId:id
    })
}
