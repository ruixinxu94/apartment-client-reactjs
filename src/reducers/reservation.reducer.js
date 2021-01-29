import {
    ADD_RESERVATIONPARTYROOM,
    DELETE_RESERVATIONPARTYROOMS,
    EDIT_RESERVATIONPARTYROOMS, LOAD_RESERVATIONPATRYROOMS
} from "../actions/reservationPartyRoom.action";
import {makeStyles} from "@material-ui/core";

export function reservationReducer(oldState = [], action) {
    switch (action.type) {
        case ADD_RESERVATIONPARTYROOM:
            if (action.payload.success) {
                return [...oldState, action.payload.newReminder];
            } else {
                return oldState
            }
        case EDIT_RESERVATIONPARTYROOMS:
            const editReservationPartyRoom = action.payload;
            const index = oldState.findIndex(b => b.id == editReservationPartyRoom.id);
            if (index !== -1) {
                oldState.splice(index, 1, editReservationPartyRoom);
            }
            return oldState;


        case DELETE_RESERVATIONPARTYROOMS:
            const deleteReservationPartyRoom = action.payload;

            if (oldState.findIndex(b => b.id == deleteReservationPartyRoom.id) !== -1) {
                oldState.splice(oldState.findIndex(b => b.id == deleteReservationPartyRoom.id), 1, deleteReservationPartyRoom);
            }
            return oldState;



        case LOAD_RESERVATIONPATRYROOMS:
            return action.payload.data;
        default:
            return oldState;
    }


}
