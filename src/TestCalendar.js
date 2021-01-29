import React from "react";
import Paper from "@material-ui/core/Paper";
import {EditingState, ViewState} from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments, MonthView, ViewSwitcher, Toolbar, EditRecurrenceMenu, DragDropProvider, TodayButton, DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { appointments } from "./data";


const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

export default class TestCalendar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: appointments
        };
    }




    render() {
        const { data, currentDate } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler data={data}>
                        <ViewState currentDate={currentDate}  />
                        <MonthView />
                        <WeekView startDayHour={14} endDayHour={22} />
                        <Appointments />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                    </Scheduler>
                </Paper>
            </MuiThemeProvider>
        );
    }
}
