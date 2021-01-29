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
import UserFilter from "./UserFilter";
import Reminders from "./Reminders";
import AdminReminders from "./AdminReminders";
import EditReminder from "./EditReminder";
import DeleteReminder from "./DeleteReminder";
import TestCalendar from "./TestCalendar";
import ReservationPartyRoom from "./ReservationPartyRoom";
import ReservationPartyRooms from "./ReservationPartyRooms";
import Checkout from "./Checkout";
import UserMaintenanceHistory from "./UserMaintenanceHistory";
import UserMaintenance from "./UserMaintenance";
import AdminMaintenance from "./AdminMaintenance";
import DelayingAppearance from "./DelayingAppearance";
import ResetPassword from "./ResetPassword";
import RoomSelect from "./RoomSelect";
import AllTypesRoom from "./AllTypesRoom";
import StudioRooms from "./StudioRooms";
import Checkin from "./Checkin";
import PayLease from "./PayLease";
import LeasePaymentHistory from "./LeasePaymentHistory";
import MoveOut from "./MoveOut";
import AdminSignIn from "./AdminSignIn";
import BookPractice from "./BookPractice";




const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/login" component={userLogin}/>
                    <Route path="/user-main-page" component={UserMainPage}/>
                    <Route path="/edit-user/:id"component={EditUser}/>
                    <Route path="/delete-user/:username"component={DeleteUser}/>
                    <Route path="/admin-user-info-page" component={UserFilter}/>
                    <Route path="/admin-post-news" component={AdminReminders}/>
                    <Route path="/edit-reminder/:id" component={EditReminder}/>
                    <Route path="/delete-reminder/:id" component={DeleteReminder}/>
                    <Route path='/calendar' component={TestCalendar}/>
                    <Route path='/reserve-party-room' component={ReservationPartyRooms}/>
                    <Route path='/reservation-check-out' component={Checkout}/>
                    <Route path='/user-maintenance-history' component={UserMaintenanceHistory}/>
                    <Route path='/admin-maintenance' component={AdminMaintenance}/>
                    <Route path='/test-rolling' component={DelayingAppearance}/>
                    <Route path='/admin-select-home' component={RoomSelect}/>
                    <Route path='/lease-history' component={LeasePaymentHistory}/>
                    <Route path='/admin-signin' component={AdminSignIn}/>
                    <Route path='aaa' component={BookPractice}/>





                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

