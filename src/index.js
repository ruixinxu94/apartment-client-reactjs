import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/root.reducer"
import ReduxPromise from 'redux-promise';
import RegisterUser from "./RegisterUser";
import userLogin from "./LoginUser";
import auth from './auth.hoc';
import UserMainPage from "./UserMainPage";
import Users from "./Users";
import {EDIT_USER, editUser} from "./actions/users.action";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/register-user" component={RegisterUser}/>
                    <Route path="/login" component={userLogin}/>
                    <Route path="/user-main-page" component={auth(UserMainPage)}/>
                    <Route path="/admin-user-info-page" component={Users}/>
                    <Route path="/edit-user/:id"component={EditUser}/>
                    <Route path="/delete-user/:username"component={DeleteUser}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

