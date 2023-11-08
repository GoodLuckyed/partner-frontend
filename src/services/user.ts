import {getCurrentUserState, setCurrentUserState} from "../states/user";
import myAxios from "../utils/request";

//获取用户信息
export const getCurrentUser = async () => {
    const user = await getCurrentUserState();
    if (user){
        return user;
    }
    //从远程后端获取用户信息
    const result = await myAxios.get('/user/current')
    if (result.code === 0) {
        setCurrentUserState(result.data)
        return result.data;
    }
    return null;
}

//存放用户信息
export const setCurrentUser = async (user) => {
    await setCurrentUserState(user);
}
