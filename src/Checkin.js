import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";


import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DelayingAppearance from "./DelayingAppearance";
import MuiPhoneNumber from "material-ui-phone-number";
import {connect} from "react-redux";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {registerUser} from "./actions/users.action";
import {reduxForm} from "redux-form";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {editRoom} from "./actions/rooms.action";
import {addPayLease} from "./actions/payLease.action";

const useStyles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        paddingTop: '5%',
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    cartButton: {
        // height: '40px',
        // marginTop:"10%",
        // marginLeft: "80%",
        // marginRight: '25%',
    },
    menuItem: {
        marginLeft: "9.5%",
        paddingBottom: "15%",
        marginBottom: "175%",
    },
    menuItems: {
        fontsize: "52px",
    },
    boxes: {
        marginLeft: "5px",
        fontSize: "15px",
        color: "text.primary",
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    }

});
const steps = ['Verifying Resident Credit', 'Lease information', 'Review Information'];


class Checkin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            open: false,
            address1: '',
            address2: '',
            state: '',
            zipcode: '',
            country: '',
            phone: '',
            ssn: '',
            passport: '',

            citizenship: '',
            electronicSignature: '',
            newUser: {
                id: '',
                username: '',
                password: 'xyz12345',
                firstname: '',
                lastname: '',
                birthday: '',
                room: '',
                leasestart: "",
                leaseend: "",
                rental: ''
            }
        }
        this.mySubmit = this.mySubmit.bind(this);
    }
    mySubmit = (value) => {
        this.props.registerUser(value, (res) => {
            console.log(value);
            console.log(res.data.success);
            if (res.data.success == "true") {
                let temp = {
                    "id": value.room,
                    "price": value.rental,
                    "user": {
                        "id" : value.id
                    }
                };
                let addPay = {
                    "balance" : value.rental,
                    "username": value.username
                }
                console.log(temp)
                this.props.editRoom(temp, (res) => {
                    if (res.data.success == "true") {
                        this.props.addPayLease(addPay, (res) => {
                            if (res.data.success == "true") {

                            } else {

                            }
                        })
                    } else {

                    }
                })


            } else {
                alert('Register user failed, please enter different username and id.')
            }
        });
    }
    handleAddress1(event) {
        this.state.address1=event.target.value;
        this.setState({
            address1: this.state.address1
        })
    }
    handleAddress2(event) {
        this.state.address2=event.target.value;
        this.setState({
            address2: this.state.address2
        })
    }
    handleState(event) {
        this.state.state=event.target.value;
        this.setState({
            state: this.state.state
        })
    }

    handleZipCode(event) {
        this.state.zipcode=event.target.value;
        this.setState({
            zipcode: this.state.zipcode
        })
    }

    handleCountry(event) {
        this.state.country=event.target.value;
        this.setState({
            country: this.state.country
        })
    }

    handlePhone(event) {
        this.state.phone=event.target.value;
        this.setState({
            phone: this.state.phone
        })
    }

    handleSSN(event) {
        this.state.ssn=event.target.value;
        this.setState({
            ssn: this.state.ssn
        })
    }

    handlePassport(event) {
        this.state.passport=event.target.value;
        this.setState({
            passport: this.state.passport
        })
    }

    handleCitizenship(event) {
        this.state.citizenship=event.target.value;
        this.setState({
            citizenship: this.state.citizenship
        })
    }

    handleFirstName(event) {
        this.state.newUser["firstname"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleLastName(event) {
        this.state.newUser["lastname"] = event.target.value;
        this.setState({
            newUser: this.state.newUser

        });
    }

    handleAccount(event) {
        this.state.newUser["id"] = event.target.value;
        this.setState({
            newUser: this.state.newUser

        });
    }

    handleBirthday(event) {
        this.state.newUser["birthday"] = event.target.value;
        this.setState({
            newUser: this.state.newUser

        });
    }

    handleRental(event) {
        this.state.newUser["rental"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleRoom(event) {
        this.state.newUser["room"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleLeaseStart(event) {
        this.state.newUser["leasestart"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleLeaseEnd(event) {
        this.state.newUser["leaseend"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleUsername(event) {
        this.state.newUser["username"] = event.target.value;
        this.setState({
            newUser: this.state.newUser
        });
    }

    handleElectronic(event) {
        this.state.electronicSignature=event.target.value;
        this.setState({
            electronicSignature: this.state.electronicSignature
        })
    }


    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Verification
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.state.newUser['firstname']}
                                    onChange={(event) => this.handleFirstName(event)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="lname"
                                    value={this.state.newUser['lastname']}
                                    onChange={(event) => this.handleLastName(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address1"
                                    name="address1"
                                    label="Former Address line 1"
                                    fullWidth
                                    autoComplete="address-line1"
                                    value={this.state.address1}
                                    onChange={(event) => this.handleAddress1(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address2"
                                    name="address2"
                                    label="Former Address line 2"
                                    fullWidth
                                    autoComplete="address-line2"
                                    value={this.state.address2}
                                    onChange={(event) => this.handleAddress2(event)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField id="state" name="state" label="State/Province/Region"
                                           fullWidth
                                           value={this.state.state}
                                           onChange={(event) => this.handleState(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    value={this.state.zipcode}
                                    onChange={(event) => this.handleZipCode(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="country"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    autoComplete="billing country"
                                    value={this.state.country}
                                    onChange={(event) => this.handleCountry(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPhoneNumber name="phone"
                                                label="phone"
                                                data-cy="user-phone"
                                                defaultCountry={"us"}

                                />


                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="ssn"
                                    name="SSN"
                                    label="SSN"
                                    fullWidth
                                    autoComplete="ssn"
                                    value={this.state.ssn}
                                    onChange={(event) => this.handleSSN(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                Birthday
                                <TextField
                                    required
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    fullWidth
                                    autoComplete="birthday"
                                    value={this.state.newUser['birthday']}
                                    onChange={(event) => this.handleBirthday(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="passport"
                                    name="passport"
                                    label="Passport"
                                    fullWidth
                                    autoComplete="passport"
                                    value={this.state.passport}
                                    onChange={(event) => this.handlePassport(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="citizenship"
                                    name="citizenship"
                                    label="Citizenship"
                                    fullWidth
                                    autoComplete="ssn"
                                    value={this.state.citizenship}
                                    onChange={(event) => this.handleCitizenship(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DelayingAppearance/>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )

            case 1:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Lease Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="Account"
                                    name="Account"
                                    label="Account"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.state.newUser['id']}
                                    onChange={(event) => this.handleAccount(event)}

                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="room"
                                    name="room"
                                    label="Room"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.state.newUser['room']}
                                    onChange={(event) => this.handleRoom(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Email"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.state.newUser['username']}
                                    onChange={(event) => this.handleUsername(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="rental"
                                    name="rental"
                                    label="Rental"
                                    fullWidth
                                    value={this.state.newUser['rental']}
                                    onChange={(event) => this.handleRental(event)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                Lease Start Date
                                <TextField
                                    required
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    fullWidth
                                    autoComplete="birthday"
                                    value={this.state.newUser['leasestart']}
                                    onChange={(event) => this.handleLeaseStart(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                Lease End Date
                                <TextField
                                    required
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    fullWidth
                                    autoComplete="birthday"
                                    value={this.state.newUser['leaseend']}
                                    onChange={(event) => this.handleLeaseEnd(event)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="electronic signature"
                                    name="electronic signature"
                                    label="electronic signature"
                                    fullWidth
                                    value={this.state.electronicSignature}
                                    onChange={(event) => this.handleElectronic(event)}
                                />
                            </Grid>

                        </Grid>
                    </React.Fragment>
                )

            case 2:
                const {classes} = this.props;
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Resident Information Check
                        </Typography>
                        <List disablePadding>
                                <ListItem className={classes.listItem} >
                                    Name
                                    <ListItemText />
                                    <Typography variant="body2">
                                        {this.state.newUser["lastname"]} {this.state.newUser["firstname"]}
                                    </Typography>
                                </ListItem>
                            <ListItem className={classes.listItem} >
                                Account
                                <ListItemText />
                                <Typography variant="body2">
                                    {this.state.newUser["id"]}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Birthday
                                <ListItemText />
                                <Typography variant="body2">
                                    {this.state.newUser["birthday"]}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Room No.
                                <ListItemText />
                                <Typography variant="body2">
                                    {this.state.newUser["room"]}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Lease Start Date
                                <ListItemText />
                                <Typography variant="body2">
                                    {this.state.newUser["leasestart"]}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Lease End Date
                                <ListItemText />
                                <Typography variant="body2">
                                    {this.state.newUser["leaseend"]}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography variant="subtitle1" className={classes.total}>
                                    User has read and known the policy and signed.
                                </Typography>
                            </ListItem>
                        </List>
                    </React.Fragment>
                );

            default:
                throw new Error('Unknown step');
        }
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        })
    }
    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>

                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Room Selection
                        </Typography>
                        <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>


                        <React.Fragment>
                            {this.state.activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        A new lease has been made, please check the new room and client reservation.
                                    </Typography>
                                    <Button variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick = {this.mySubmit(this.state.newUser)}
                                            >
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(this.state.activeStep)}
                                    <div className={classes.buttons}>
                                        {this.state.activeStep !== 0 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {this.state.activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }

}

export default connect(null, {registerUser, editRoom, addPayLease})(
    reduxForm({
        form: 'RegisterUserForm'
    })(withStyles(useStyles)(Checkin))
)
