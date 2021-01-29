import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import handleSubmit from "redux-form/lib/handleSubmit";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




const API_URL = process.env.REACT_APP_API_URL;

export default function ResetPassword() {
    const classes = useStyles();
    const [form, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        emailAddress: JSON.parse(localStorage.getItem("user")).username
    });
    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const mySubmit = () => {
        const promise = axios.put(`${API_URL}/resetpassword/reset`,form)
            .then(res => {
            if (res.data.success) {
                console.log(res.data.success)
                alert("your password has been changed, please relogged in ")
                return null;
                } else {
                alert("your old Password is not correct")
                return null;
                }
        });

    }


    return (
        <React.Fragment>
            <Divider/>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    label={"reqeust"}
                >
                    <Grid container
                          justify="center">
                        <Typography component="h3" variant="h4">Account Password Reset</Typography>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container
                          justify="center"
                          spacing={5}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Change Password
                                </Typography>
                                <form
                                    onSubmit={mySubmit}
                                    className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="oldPassword"
                                        label="OldPassword"
                                        type="password"
                                        id="oldPassword"
                                        autoComplete="current-password"
                                        value={form.oldPassword}
                                        onChange={updateField}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="newPassword"
                                        label="NewPassword"
                                        type="password"
                                        id="newPassword"
                                        autoComplete="current-password"
                                        value={form.newPassword}
                                        onChange={updateField}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={mySubmit}
                                    >
                                        Confirm
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    );
}
