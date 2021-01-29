import {ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER, LOAD_REMINDERS} from "../actions/reminder.action";


export function remindersReducer(oldState = [], action) {
    switch (action.type) {
        case ADD_REMINDER:
            if (action.payload.success) {
                return [...oldState, action.payload.newReminder];
            } else {
                return oldState
            }
        case EDIT_REMINDER:
            const editReminder = action.payload;
            const index = oldState.findIndex(b => b.id == editReminder.id);
            if (index !== -1) {
                oldState.splice(index, 1, editReminder);
            }
            return oldState;


        case DELETE_REMINDER:
            const deleteReminder = action.payload;

            if (oldState.findIndex(b => b.id == deleteReminder.id) !== -1) {
                oldState.splice(oldState.findIndex(b => b.id == deleteReminder.id), 1, deleteReminder);
            }
            return oldState;



        case LOAD_REMINDERS:
            return action.payload.data;
        default:
            return oldState;
    }


}
