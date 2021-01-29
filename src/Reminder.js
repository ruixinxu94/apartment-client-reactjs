import React from 'react';

function Reminder(props) {
    let {reminder} = props;
    return (
        <span>{reminder}</span>
    );
}
export default Reminder;
