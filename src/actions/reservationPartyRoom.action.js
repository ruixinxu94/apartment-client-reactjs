import axios from "axios";

export const ADD_RESERVATIONPARTYROOM = "ADD_RESERVATIONPARTYROOM";
export const LOAD_RESERVATIONPATRYROOMS = "LOAD_RESERVATIONPATRYROOMS";
export const EDIT_RESERVATIONPARTYROOMS= "EDIT_RESERVATIONPARTYROOMS";
export const DELETE_RESERVATIONPARTYROOMS = "DELETE_RESERVATIONPARTYROOMS"

const API_URL = process.env.REACT_APP_API_URL;
export function addReservationPartyRoom(newReservationPartyRoom, callback) {
    const promise = axios.post(`${API_URL}/reservepartyroom/add`,newReservationPartyRoom)
        .then(res => {
            callback(res);
            return {
                newReservationPartyRoom: newReservationPartyRoom,
                success:res.data.success
            };
        });
    return {
        type: ADD_RESERVATIONPARTYROOM,
        payload: promise
    }
}

export function loadReservationPartyRoom() {

    const promise = axios.get(`${API_URL}/reservepartyroom`);
    return {
        type: LOAD_RESERVATIONPATRYROOMS,
        payload:promise
    }
}

export function editReservationPartyRoom(editReservationPartyRoom, callback) {
    const promise = axios.put(`${API_URL}/reservepartyroom/edit`, editReservationPartyRoom)
        .then(res => {
            callback(res);
            return {
                editReservationPartyRoom,
                success: res.data.success
            };
        });
    return {
        type:EDIT_RESERVATIONPARTYROOMS,
        payload: promise
    }
}

export function deleteReservationPartyRoom(deleteReservationPartyRoom, callback) {
    const id = deleteReservationPartyRoom.id;

    const promise = axios.delete(`${API_URL}/reservepartyroom/${id}`)
        .then(res => {
            callback(res);
            return {
                deleteReservationPartyRoom,
                success: res.data.success
            }
        });
    return {
        type:DELETE_RESERVATIONPARTYROOMS,
        payload: promise
    }
}
