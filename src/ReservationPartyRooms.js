import React from "react";
import Paper from "@material-ui/core/Paper";
import {EditingState, ViewState} from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments,
    MonthView,
    ViewSwitcher,
    Toolbar,
    EditRecurrenceMenu,
    DragDropProvider,
    TodayButton,
    DateNavigator,
    AppointmentTooltip, AppointmentForm
} from "@devexpress/dx-react-scheduler-material-ui";
import {MuiThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {addReservationPartyRoom, loadReservationPartyRoom} from "./actions/reservationPartyRoom.action";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MuiPhoneNumber from "material-ui-phone-number"
import {DatetimePicker} from 'rc-datetime-picker';
import moment from 'moment';


const theme = createMuiTheme({palette: {type: "light", primary: blue}});
const renderTextField = ({input, label, type, name, id, autoFocus}) => (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...input}
        label={label}
        type={type}
        name={name}
        id={id}
        autoFocus={autoFocus}
    />
)
const useStyles = makeStyles(theme => ({
    form: {
        width: '75%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight:theme.spacing(2)
    }}));

const renderPhone = ({input}) => (
    <MuiPhoneNumber name="phone"
                    label="phone"
                    data-cy="user-phone"
                    defaultCountry={"us"}
                    {...input}
                    />
)
class ReservationPartyRooms extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: '2019-11-18',
            moment : moment()
        };
        this.mySubmit = this.mySubmit.bind(this);
    }
    handleChange = (moment) => {
        this.setState({
            moment
        });
    }

    mySubmit = (value) => {
        console.log(value);
        this.props.addReservationPartyRoom(value, (res) => {
            console.log(res.data.success);
            if (res.data.success == "true") {
                window.location.reload(true);
            } else {
                alert('Fail')
            }
        });
    }
    componentDidMount() {
        this.props.loadReservationPartyRoom();
        // this.props.addReservationPartyRoom();
    }

    render() {
        let data = [];
        const {currentDate} = this.state;

        this.props.reservationPartyRooms.map((reservationPartyRoom) => {
            console.log(reservationPartyRoom)
            let temp =
                {
                    "title": reservationPartyRoom.firstname + " " + reservationPartyRoom.lastname + "\n"
                        + reservationPartyRoom.phone + "\n",

                    "startDate": reservationPartyRoom.starttime + " " + "18:00",
                    "endDate": reservationPartyRoom.starttime + " " + "22:00",
                    "id": reservationPartyRoom.id
                    // title: "Launch New Website",
                    // startDate: '2019-10-31 14:30',
                    // endDate: '2019-10-31 18:00',

                }

            data.push(temp);
            console.log(data)
            return data;
        })


        return (
            <React.Fragment>
                <ResponsiveDrawer/>
                <Container component="main" maxWidth="md">

                    <Grid container
                          justify="center">

                    </Grid>
                </Container>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12}
                              sm ={6}>
                            <MuiThemeProvider theme={theme}>
                                <Paper>
                                    <Scheduler data={data}>
                                        <ViewState defaultCurrentDate={currentDate}/>
                                        <MonthView/>
                                        <WeekView startDayHour={14} endDayHour={22}/>
                                        <Appointments/>
                                        <AppointmentTooltip
                                        />
                                        <AppointmentForm />
                                        <Toolbar/>
                                        <DateNavigator/>
                                        <TodayButton/>
                                        <ViewSwitcher/>
                                    </Scheduler>
                                </Paper>
                            </MuiThemeProvider>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid
                            item xs={6}
                            sm ={3}>
                            <Paper >
                                <Typography component="h4" variant="h5">
                                    Reservation Registration
                                </Typography>
                                <form onSubmit={this.props.handleSubmit(this.mySubmit)} className={useStyles.form}>
                                    <Field
                                        id="firstname"
                                        label="Firstname"
                                        name="firstname"
                                        autoFocus={true}
                                        component={renderTextField}
                                    />
                                    <Field
                                        id="lastname"
                                        label="lastname"
                                        name="lastname"
                                        autoFocus={false}
                                        component={renderTextField}
                                    />
                                    <Field
                                        id="phone"
                                        label="phone"
                                        name="phone"
                                        autoFocus={false}
                                        component={renderPhone}
                                    />
                                    <Typography component="h6" variant="h6">
                                        Date
                                    </Typography>
                                    <Field
                                        id="starttime"
                                        name="starttime"
                                        type="date"
                                        component={renderTextField}
                                        />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Reserve
                                    </Button>
                                    <p></p>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>

        );
    }
}

function mapStateToProps(appState) {
    return {
        reservationPartyRooms: appState.reservationPartyRooms
    };
}

export default connect(mapStateToProps, {loadReservationPartyRoom, addReservationPartyRoom})
(
    reduxForm({
        form:'AddReservationPartyRoomForm'
    })
    (ReservationPartyRooms))


