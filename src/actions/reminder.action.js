import axios from "axios";

export const ADD_REMINDER = "ADD_REMINDER";
export const LOAD_REMINDERS = "LOAD_REMINDERS";
export const EDIT_REMINDER = "EDIT_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER"

const API_URL = process.env.REACT_APP_API_URL;
export function addReminder(newReminder, callback) {
    const promise = axios.post(`${API_URL}/reminder/post`,newReminder)
        .then(res => {
            callback(res);
            return {
                newReminder,
                success:res.data.success
            };
        });
    return {
        type: ADD_REMINDER,
        payload: promise
    }
}

export function loadReminders() {

    const promise = axios.get(`${API_URL}/reminder`);
    return {
        type: LOAD_REMINDERS,
        payload:promise
    }
}

export function editReminder(editReminder, callback) {
    const promise = axios.put(`${API_URL}/reminder/edit`, editReminder)
        .then(res => {
            callback(res);
            return {
                editReminder,
                success: res.data.success
            };
        });
    return {
        type:EDIT_REMINDER,
        payload: promise
    }
}

export function deleteReminder(deleteReminder, callback) {
    const id = deleteReminder.id;

    const promise = axios.delete(`${API_URL}/reminder/${id}`)
        .then(res => {
            callback(res);
            return {
                deleteReminder,
                success: res.data.success
            }
        });
    return {
        type:DELETE_REMINDER,
        payload: promise
    }
}
