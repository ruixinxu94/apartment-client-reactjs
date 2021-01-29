import {LOGIN_USER, LOGOUT_USER} from '../actions/auth.action';

export default function (state = JSON.parse(localStorage.getItem('user')), action) {
    let res;
    switch (action.type) {
        case LOGIN_USER:
            res = action.payload.data;
            console.log(res)
            if (res.success) {
                console.log(res.user)
                return res.user;
            } else {
                return null;
            }
        case LOGOUT_USER:
            console.log(action.payload)
            res = action.payload.data;

            console.log(res.success);
            if (res.success) {
                return null;
            } else {
                return state;
            }
        default:
            return state;
    }
}
