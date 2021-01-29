import {reducer as formReducer} from 'redux-form';
import {combineReducers} from "redux";
import {usersReducer} from "./users.reducer";
import AuthReducer from './auth.reducer';
import {remindersReducer} from "./reminder.reducer";
import {reservationReducer} from "./reservation.reducer";
import {maintenancesReducer} from "./maintenance.reducer";
import {roomsReducer} from "./room.reducer";
import {payLeaseReducer} from "./payLease.reducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    form: formReducer,
    loggedIn: AuthReducer,
    reminders: remindersReducer,
    reservationPartyRooms: reservationReducer,
    maintenances: maintenancesReducer,
    rooms: roomsReducer,
    payLease: payLeaseReducer
})
