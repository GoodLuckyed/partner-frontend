import {UserType} from "../models/user";

let currentUser:UserType


export const setCurrentUserState = (user) => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getCurrentUserState = () => {
    return JSON.parse(localStorage.getItem('user'))
}
