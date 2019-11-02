import {DELETE_USER, EDIT_USER, LOAD_USERS, REGISTER_USER} from "../actions/users.action";

export function usersReducer(oldState = [], action) {
    switch (action.type) {
        case REGISTER_USER:
            if (action.payload.success) {
                return [...oldState, action.payload.newUser];
            } else {
                return oldState
            }
        case EDIT_USER:
            const editUser = action.payload;
            const index = oldState.findIndex(b => b.id == editUser.id);
            if (index !== -1) {
                oldState.splice(index, 1, editUser);
            }
            return oldState;


        case DELETE_USER:
            const deleteUser = action.payload;

            if (oldState.findIndex(b => b.username == deleteUser.username) !== -1) {
                oldState.splice(oldState.findIndex(b => b.username == deleteUser.username), 1, deleteUser);
            }
            return oldState;



        case LOAD_USERS:
            return action.payload.data;
        default:
            return oldState;
    }


}
