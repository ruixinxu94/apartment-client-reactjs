import axios from "axios";
import React from "react";


export const ADD_PAYLEASE = "ADD_PAYLEASE";
export const LOAD_PAYLEASE = "LOAD_PAYLEASE";
export const LOAD_PAYLEASES = "LOAD_PAYLEASES";
export const EDIT_PAYLEASE = "EDIT_PAYLEASE"


const API_URL = process.env.REACT_APP_API_URL;
export function addPayLease(newPayLease, callback) {
    const promise = axios.post(`${API_URL}/lease/add`,newPayLease)
        .then(res => {
            callback(res);
            return {
                newPayLease,
                success:res.data.success
            };
        });
    return {
        type: ADD_PAYLEASE,
        payload: promise
    }
}

export function loadPayleases() {
    const promise = axios.get(`${API_URL}/lease`);
    return {
        type: LOAD_PAYLEASES,
        payload:promise
    }
}
export function loadPaylease() {
    const username = JSON.parse(localStorage.getItem("user")).username ;
    const promise = axios.get(`${API_URL}/lease/?username=${username}`);
    return {
        type: LOAD_PAYLEASE,
        payload:promise
    }
}

export function editPayLease(editPayLease, callback) {
    const promise = axios.put(`${API_URL}/lease/edit`, editPayLease)
        .then(res => {
            callback(res);
            return {
                editPayLease,
                success: res.data.success
            };
        });
    return {
        type:EDIT_PAYLEASE,
        payload: promise
    }
}
