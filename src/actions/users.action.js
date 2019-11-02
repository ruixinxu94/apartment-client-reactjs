import axios from "axios";

export const REGISTER_USER = "REGISTER_USER";
export const LOAD_USERS = "LOAD_USERS";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER"


export function registerUser(newUser, callback) {
    const promise = axios.post('http://localhost:8080/users/register',newUser)
        .then(res => {
            callback(res);
            return {
                newUser,
                success:res.data.success
            };
        });
    return {
        type: REGISTER_USER,
        payload: promise
    }
}

export function loadUsers() {

    const promise = axios.get('http://localhost:8080/users/');
    return {
        type: LOAD_USERS,
        payload:promise
    }
}

export function editUser(editUser, callback) {
    const promise = axios.put('http://localhost:8080/users/admin-edit', editUser)
        .then(res => {
            callback(res);
            return {
                editUser,
                success: res.data.success
            };
        });
    return {
        type:EDIT_USER,
        payload: promise
    }
}

export function deleteUser(deleteUser, callback) {
    console.log(deleteUser.username);
    const username = deleteUser.username;

    const promise = axios.delete(`http://localhost:8080/users/${username}`)
        .then(res => {
            callback(res);
            return {
                deleteUser,
                success: res.data.success
            }
        });
    return {
        type:DELETE_USER,
        payload: promise
    }
}






