import axios from "axios";
import qs from 'qs';


const API_URL = process.env.REACT_APP_API_URL;


export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function loginUser(user, callback) {
    console.log(user);
    const promise = axios.post(`${API_URL}/login`, qs.stringify(user), {withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });

    return {
        type: LOGIN_USER,
        payload: promise
    }
}

export function logoutUser(user,callback) {
    console.log("**")
    const promise = axios.post(`${API_URL}/logout`,qs.stringify(user),{withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: LOGOUT_USER,
        payload: promise
    }
}
