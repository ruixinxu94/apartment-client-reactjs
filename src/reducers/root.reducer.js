import {reducer as formReducer} from 'redux-form';
import {combineReducers} from "redux";
import {usersReducer} from "./users.reducer";
import AuthReducer from './auth.reducer';
export const rootReducer = combineReducers({
    users: usersReducer,
    form: formReducer,
    loggedIn: AuthReducer,
    loggedOut: AuthReducer
})
