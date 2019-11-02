import {LOGIN_USER, LOGOUT_USER} from '../actions/auth.action';

export default function (state = null, action) {
    let res;
    switch (action.type) {
        case LOGIN_USER:
            res = action.payload.data;
            if (res.success) {
                console.log("*")
                return res.user;
            } else {
                return null;
            }
        case LOGOUT_USER:
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
