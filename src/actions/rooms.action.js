import axios from "axios";

export const ADD_ROOM = "ADD_ROOM";
export const LOAD_ROOMS = "LOAD_ROOMS";
export const EDIT_ROOM = "EDIT_ROOM";


const API_URL = process.env.REACT_APP_API_URL;
export function registerRoom(newRoom, callback) {
    const promise = axios.post(`${API_URL}/rooms/add`,newRoom)
        .then(res => {
            callback(res);
            return {
                newRoom,
                success:res.data.success
            };
        });
    return {
        type: ADD_ROOM,
        payload: promise
    }
}

export function loadRooms() {

    const promise = axios.get(`${API_URL}/rooms`);
    return {
        type: LOAD_ROOMS,
        payload:promise
    }
}

export function editRoom(editRoom, callback) {
    const promise = axios.put(`${API_URL}/rooms/edit`, editRoom)
        .then(res => {
            callback(res);
            return {
                editRoom,
                success: res.data.success
            };
        });
    return {
        type:EDIT_ROOM,
        payload: promise
    }
}


