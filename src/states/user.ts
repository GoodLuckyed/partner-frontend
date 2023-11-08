import {userType} from "../models/user";

let currentUser:userType


export const setCurrentUserState = (user) => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getCurrentUserState = () => {
    return JSON.parse(localStorage.getItem('user'))
}
