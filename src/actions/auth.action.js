import axios from "axios";
import qs from 'qs';


export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function loginUser(user, callback) {
    console.log(user);
    const promise = axios.post('http://localhost:8080/login', qs.stringify(user), {withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: LOGIN_USER,
        payload: promise
    }
}

export function logoutUser(callback) {
    console.log("**")
    const promise = axios.post('http://localhost:8080/logout', {withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: LOGOUT_USER,
        payload: promise
    }
}
