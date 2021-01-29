import React, {Component} from "react";
import {connect} from "react-redux";
import {addReminder, loadReminders} from "./actions/reminder.action";
import Reminder from "./Reminder";
import {Table} from "reactstrap";
import {dark} from "@material-ui/core/styles/createPalette";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Switch from "react-switch";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



const myStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },

    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));


class AdminReminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newReminder: {
                content: '',
                type: '',
                status: false,
            },
            filterType: '',
            filterStatus: ''
        }
        this.mySubmit = this.mySubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.inputChangeHandlerStatus = this.inputChangeHandlerStatus.bind(this);
        this.inputChangeHandlerType = this.inputChangeHandlerType.bind(this);


    }

    inputChangeHandlerType = (event) => {
        this.setState({
            filterType: event.target.value
        });
    }
    inputChangeHandlerStatus = (event) => {
        this.setState({
            filterStatus: event.target.value
        });
    }
    mySubmit = () => {
        console.log(this.state.newReminder)
        this.props.addReminder(this.state.newReminder, (res) => {
            console.log(res.data.success);
            if (res.data.success == "true") {
                window.location.reload();
            } else {
                alert('Fail')
            }
        });
    }

    handleChange(checked) {
        this.state.newReminder["status"] = checked;
        this.setState({
            newReminder: this.state.newReminder
        });
        console.log(this.state.newReminder)

    }

    handleMenu(event) {
        this.state.newReminder['type'] = event.target.value;
        this.setState({
            newReminder: this.state.newReminder
        })
        console.log(this.state.newReminder)

    }

    handleContent(event) {
        console.log(event.target.value)
        this.state.newReminder['content'] = event.target.value;
        this.setState({
            newReminder: this.state.newReminder
        })
        console.log(this.state.newReminder)

    }


    clickToSearchType = (type) => {

        const {reminders} = this.props;
        if (type == null) {
            return reminders;
        } else {
            let filtered = [];
            for (let i = 0; i < reminders.length; i++) {
                if (reminders[i].type.toString().toLowerCase().startsWith(type.toLowerCase())) {
                    filtered.push(reminders[i]);
                }
            }
            return filtered;
        }
    }

    clickToSearchStatus = (status) => {


        const {reminders} = this.props;

        if (status == null) {
            return reminders;
        } else {
            let filtered = [];
            for (let i = 0; i < reminders.length; i++) {
                if (reminders[i].status.toString().toLowerCase().startsWith(status.toLowerCase())) {
                    filtered.push(reminders[i]);
                }
            }
            return filtered;
        }
    }


    clickToDeletePage(id) {
        this.props.history.push(`/delete-reminder/${id}`)
    }

    clickToEditPage(id) {
        this.props.history.push(`/edit-reminder/${id}`)
    }

    combineFilter = () => {
        let result = this.clickToSearchType(this.state.filterType).filter(x => {
            if (this.clickToSearchStatus(this.state.filterStatus).indexOf(x) != -1) {
                return true;
            }
            return false
        });

        return result
    }


    componentDidMount() {
        this.props.loadReminders();
        this.props.addReminder();

    }

    render() {
        return (
            <React.Fragment>
                <ResponsiveDrawer/>

                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <Box mx="auto" bgcolor="background.paper" p={5}>
                        <div className={myStyles.paper}>
                            <p></p>

                            <Typography component="h4" variant="h4">
                                Add News
                            </Typography>
                            <p></p>
                            <p></p>
                            <Grid>

                                <form onSubmit={this.props.handleSubmit(this.mySubmit)}>
                                    <Grid item xs={12} sm={6}>

                                        News Type: <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={this.state.newReminder.type}
                                        onChange={this.handleMenu}
                                    >
                                        <MenuItem value="Community">
                                            <em>Community</em>
                                        </MenuItem>
                                        <MenuItem value={"Daily Life"}>Daily life</MenuItem>
                                        <MenuItem value={"Safety"}>Safety</MenuItem>
                                        <MenuItem value={"Emergency"}>Emergency</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            id="filled-multiline-static"
                                            label="news content"
                                            multiline
                                            rows="5"
                                            margin="normal"
                                            variant="filled"
                                            placeholder="Content"
                                            fullWidth
                                            value={this.state.newReminder['content']}
                                            onChange={(event) => this.handleContent(event)}
                                        />


                                        Post Status OFF<Switch
                                        checked={this.state.newReminder['status'] == "true" ? true : false}
                                        onChange={this.handleChange}
                                    /> ON
                                        <p>
                                            <button type="submit" className={"btn btn-success"}>Submit</button>
                                        </p>
                                    </Grid>
                                </form>
                            </Grid>
                        </div>
                    </Box>
                </Container>
                <div>
                    <Container maxWidth="lg">
                        <Grid container
                              justify="center"
                              spacing={0}>
                            <Grid item xs={2}>
                                <h6>Type:</h6>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={this.state.filterType}
                                    onChange={this.inputChangeHandlerType}
                                >
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={"Community"}>Community</MenuItem>
                                    <MenuItem value={"Daily life"}>Daily Life</MenuItem>
                                    <MenuItem value={"Safety"}>Safety</MenuItem>
                                    <MenuItem value={"Emergency"}>Emergency</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Posted Status:</h6>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={this.state.filterStatus}
                                    onChange={this.inputChangeHandlerStatus}
                                >
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={"true"}>Posted</MenuItem>
                                    <MenuItem value={"false"}>UnPosted</MenuItem>

                                </Select>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg">
                    <Grid container
                          justify="center">
                        <ul>
                            <Table responsive>
                                <thead className={dark}>
                                <th></th>
                                <th></th>
                                <th>Type</th>
                                <th>Content</th>
                                </thead>

                                <tbody>
                                {
                                    this.combineFilter().map((reminder) => {
                                        return (
                                            <tr key={reminder.id}>
                                                <td><
                                                    IconButton className={myStyles.button} aria-label="delete"
                                                               onClick={() => this.clickToDeletePage(reminder.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>


                                                </td>
                                                <td>
                                                    <Fab color="secondary" aria-label="edit" className={myStyles.fab}
                                                         onClick={() => this.clickToEditPage(reminder.id)}>
                                                        <EditIcon/>
                                                    </Fab>
                                                </td>
                                                <td>
                                                    <Reminder reminder={reminder.type}/>
                                                </td>
                                                <td>
                                                    <Reminder reminder={reminder.content}/>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </ul>
                    </Grid>
                    </Container>
                </div>
            </React.Fragment>
        );

    }

}

function mapStateToProps(appState) {
    return {
        reminders: appState.reminders
    };
}

export default connect(mapStateToProps, {loadReminders, addReminder})
(
    reduxForm({
        form: 'AddReminderForm',
    })
    (AdminReminders))

