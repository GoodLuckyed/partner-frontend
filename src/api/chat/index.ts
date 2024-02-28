import myAxios from "../../utils/request.ts";

enum API {
    //私聊
    PRIVATE_CHAT = '/chat/privateChat',
    //大厅聊天
    HALL_CHAT = '/chat/hallChat',
    //队伍聊天
    TEAM_CHAT = '/chat/teamChat',
}

//私聊
export const reqPrivateChat = (data: any) => {
    return myAxios.post(API.PRIVATE_CHAT,{
        toId:data
    })
}

//大厅聊天
export const reqHallChat = () => {
    return myAxios.get(API.HALL_CHAT)
}

//队伍聊天
export const reqTeamChat = (data: any) => {
    return myAxios.post(API.TEAM_CHAT,{
        teamId:data
    })
}
