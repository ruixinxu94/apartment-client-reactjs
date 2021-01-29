import {ADD_PAYLEASE, EDIT_PAYLEASE, LOAD_PAYLEASE, LOAD_PAYLEASES} from "../actions/payLease.action";



export function payLeaseReducer(oldState = [], action) {
    switch (action.type) {
        case ADD_PAYLEASE:
            if (action.payload.success) {
                return [...oldState, action.payload.newPayLease];
            } else {
                return oldState
            }


        case LOAD_PAYLEASES:
            return action.payload.data;

        case LOAD_PAYLEASE:
            return action.payload.data;

        case EDIT_PAYLEASE:
            const editPaylease = action.payload;
            const index = oldState.findIndex(b => b.id == editPaylease.id);
            if (index !== -1) {
                oldState.splice(index, 1, editPaylease);
            }
            return oldState;


        default:
            return oldState;
    }
}
