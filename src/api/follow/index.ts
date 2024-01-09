import myAxios from "../../utils/request.ts";

enum API {
    //添加关注
    ADD_FOLLOW = "/follow/add",
}

// 添加关注
export const reqFollowUser = (id:number) => {
    return myAxios.post(API.ADD_FOLLOW + `/${id}`);
}
