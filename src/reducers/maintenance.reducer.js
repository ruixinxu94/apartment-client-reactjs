import {ADD_MAINTENANCE, EDIT_MAINTENANCES, LOAD_MAINTENANCE, LOAD_MAINTENANCES} from "../actions/maintenance.action";


export function maintenancesReducer(oldState = [], action) {
    switch (action.type) {
        case ADD_MAINTENANCE:
            if (action.payload.success) {
                return [...oldState, action.payload.newMaintenance];
            } else {
                return oldState
            }
        case EDIT_MAINTENANCES:
            const editMaintenance = action.payload;
            const index = oldState.findIndex(b => b.id == editMaintenance.id);
            if (index !== -1) {
                oldState.splice(index, 1, editMaintenance);
            }
            return oldState;

        case LOAD_MAINTENANCE:
            return action.payload.data;

        case LOAD_MAINTENANCES:
            return action.payload.data;
        default:
            return oldState;
    }
}

