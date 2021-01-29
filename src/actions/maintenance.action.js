import axios from "axios";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const ADD_MAINTENANCE = "ADD_MAINTENANCE";
export const LOAD_MAINTENANCE = "LOAD_MAINTENANCE";
export const LOAD_MAINTENANCES = "LOAD_MAINTENANCES";
export const EDIT_MAINTENANCES = "EDIT_MAINTENANCES ";

const API_URL = process.env.REACT_APP_API_URL;
export function addMaintenance(newMaintenance, callback) {
    const promise = axios.post(`${API_URL}/maintenance/post`,newMaintenance)
        .then(res => {
            callback(res);
            return {
                newMaintenance,
                success:res.data.success
            };
        });
    return {
        type: ADD_MAINTENANCE,
        payload: promise
    }
}

export function loadMaintenances() {
    const promise = axios.get(`${API_URL}/maintenance`);
    return {
        type: LOAD_MAINTENANCES,
        payload:promise
    }
}
export function loadMaintenance() {
    const roomnumber = JSON.parse(localStorage.getItem("user")).room ;
    console.log(roomnumber);
    const promise = axios.get(`${API_URL}/maintenance/?roomnumber=${roomnumber}`);
    return {
        type: LOAD_MAINTENANCES,
        payload:promise
    }
}

export function editMaintenance(editMaintenance, callback) {
    const promise = axios.put(`${API_URL}/maintenance/edit`, editMaintenance)
        .then(res => {
            callback(res);
            return {
                editMaintenance,
                success: res.data.success
            };
        });
    return {
        type:EDIT_MAINTENANCES,
        payload: promise
    }
}

