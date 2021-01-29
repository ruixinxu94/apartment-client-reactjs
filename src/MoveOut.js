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
import { MDBInput } from 'mdbreact';

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
            width: 600,
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
const steps = ['Moving Out Resident Information', 'Inspection check', 'Review Inspection'];


class MoveOut extends React.Component {
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
            moveUser: {
                price: 5000,
                username: null,
                id:''
            }
        }
        this.mySubmit = this.mySubmit.bind(this);
    }
    mySubmit = (value) => {
        this.props.editRoom(value, (res) => {
            console.log(value);
            console.log(res.data.success);
            if (res.data.success == "true") {

            } else {
                alert('Move Out User Failed')
            }
        });
    }

    handleChange(event) {
        this.state.moveUser["id"]=event.target.value;
        this.setState({
            moveUser: this.state.moveUser
        })
    }


    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Resident Moving Out
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="room"
                                    name="room"
                                    label="Room Number"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.state.moveUser['id']}
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="Account"
                                    name="Account"
                                    label="Account"
                                    fullWidth
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address1"
                                    name="address1"
                                    label="New Address line 1"
                                    fullWidth
                                    autoComplete="address-line1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address2"
                                    name="address2"
                                    label="New Address line 2"
                                    fullWidth
                                    autoComplete="address-line2"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField id="state" name="state" label="State/Province/Region"
                                           fullWidth
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
                                />
                            </Grid>
                            </Grid>
                    </React.Fragment>
                )

            case 1:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>

                        </Typography>
                        <Grid container spacing={3}>
                            <div>

                                <MDBInput label="Kitchen Facility $200" type="checkbox" id="checkbox1" />

                                <MDBInput label="Floor  $150" type="checkbox" id="checkbox1" />

                                <MDBInput label="Toilet Facility $100" type="checkbox" id="checkbox1" />

                                <MDBInput label="Cleaning Fee $200" type="checkbox" id="checkbox1" />


                            </div>

                        </Grid>
                    </React.Fragment>
                )

            case 2:
                const {classes} = this.props;
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Inspection Check
                        </Typography>
                        <List disablePadding>
                            <ListItem className={classes.listItem} >
                                Kitchen Facility
                                <ListItemText />
                                <Typography variant="body2">
                                    $0
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Floor
                                <ListItemText />
                                <Typography variant="body2">
                                    $150
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Toilet Facility
                                <ListItemText />
                                <Typography variant="body2">
                                    $0
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                Cleaning Fee
                                <ListItemText />
                                <Typography variant="body2">
                                    $200
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" className={classes.total}>
                                    $350
                                </Typography>
                            </ListItem>
                        </List>
                    </React.Fragment>

                )


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
                            Move Out & Inspection
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
                                        Inspection bill would be billed to the users' new address.
                                    </Typography>
                                    <Button variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick = {this.mySubmit(this.state.moveUser)}
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
                                            {this.state.activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
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

export default connect(null, {editRoom})(
    reduxForm({
        form: 'RegisterUserForm'
    })(withStyles(useStyles)(MoveOut))
)
