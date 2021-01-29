import {ADD_ROOM, EDIT_ROOM, LOAD_ROOMS} from "../actions/rooms.action";


export function roomsReducer(oldState = [], action) {
    switch (action.type) {
        case ADD_ROOM:
            if (action.payload.success) {
                return [...oldState, action.payload.newRoom];
            } else {
                return oldState
            }
        case EDIT_ROOM:
            const editRoom = action.payload;

            const index = oldState.findIndex(b => b.id == editRoom.id);
            if (index !== -1) {
                oldState.splice(index, 1, editRoom);
            }
            return oldState;

        case LOAD_ROOMS:
            return action.payload.data;
        default:
            return oldState;
    }


}
