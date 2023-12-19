import myAxios from "../../utils/request";

//接口地址
enum API {
    //创建队伍接口地址
    ADD_TEAM = '/team/addTeam',
    //获取队伍列表接口地址
    GET_TEAM_LIST = '/team/list',
    //加入队伍接口地址
    JOIN_TEAM = '/team/join'
}

//创建队伍请求接口
export const reqAddTeam = (data:any) => {
    return myAxios.post(API.ADD_TEAM,data)
}

//获取队伍列表请求接口
export const reqGetTeamList = () => {
    return myAxios.get(API.GET_TEAM_LIST)
}

//加入队伍请求接口
export const reqJoinTeam = (id:string) => {
    return myAxios.post(API.JOIN_TEAM,{
        teamId:id
    })
}
