import React, {Component} from "react";
import {connect} from "react-redux";
import {loadReminders} from "./actions/reminder.action";
import Reminder from "./Reminder";


class Reminders extends Component {

    componentDidMount() {
        this.props.loadReminders();
    }

    render() {
        return (
            <ul>
                {
                    this.props.reminders.map((reminder) => {
                            if (reminder.status == "true") {
                                return (

                                    <li key={reminder.id} style={{color:'red'}}>
                                        <Reminder reminder={reminder.content}/>
                                    </li>
                                )
                            }
                        }
                    )}
            </ul>
        );
    }

}

function mapStateToProps(appState) {
    return {
        reminders: appState.reminders
    };
}

export default connect(mapStateToProps, {loadReminders})(Reminders)
