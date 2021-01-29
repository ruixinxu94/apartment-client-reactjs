import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {loginUser} from "./actions/auth.action";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import './loginBackGround.css'
import Reminders from "./Reminders";
import ForgetPassword from "./ForgetPassword";
import NewUserSignUp from "./NewUserSignUp";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/brooklyn-point-1-city-point-01.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paperContainer: {
        backgroundImage: `url(${"static/src/img/main.jpg"})`
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(4),
            padding: theme.spacing(3),
        },
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

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
}));

function LoginUser(props) {
    const classes = useStyles();

    const onSubmit = (user) => {

        props.loginUser(user, (res) => {
            if (res.data.success) {
                // this.props.history.push('/products');
                console.log("logged in")
                localStorage.setItem("user", JSON.stringify(res.data.user));
                props.history.push('/user-main-page')
            } else {
                alert("The password doesn't match with the username, please enter a correct one.");
            }
        });
    }

    const renderTextField = ({input, label, type, name, id, autoComplete, autoFocus}) => (
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
            autoComplete={autoComplete}
            autoFocus={autoFocus}
        />

    )

    return (


        <React.Fragment>


            <Paper className={classes.paper}>
                <Grid>
                    <Typography component="h1" variant="h1">
                        <Box fontFamily="fontFamily" m={2}>
                            Welcome to Bavlon Access!
                        </Box>
                    </Typography>
                </Grid>


                <Grid container spacing="auto">
                    <Grid item xs={12} sm={6}>
                        <main className={classes.layout}>
                            <Paper className={classes.paper}>
                                <p>With exclusive access to our resident-only web sites, hop on any computer with
                                    Internet access to:</p>
                                <li>Pay your rent online</li>
                                <li>Submit and track service requests</li>
                                <li>Find community forms and policies</li>
                                <li>And much, much more...</li>
                                <p>Log in now to get started!</p>
                            </Paper>
                        </main>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <main className={classes.layout}>
                            <Paper className={classes.paper}>
                                <Reminders/>
                                <Typography component="h1" variant="h4">
                                    <Box fontFamily="fontFamily" m={1}>
                                        Please Sign in:
                                    </Box>
                                </Typography>
                                <form onSubmit={props.handleSubmit(onSubmit)} className={classes.form}>
                                    <Field
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus={true}
                                        component={renderTextField}
                                    />
                                    <Field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="current-password"
                                        type="password"
                                        autoFocus={false}
                                        component={renderTextField}
                                    />

                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"/>}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <ForgetPassword/>
                                        </Grid>
                                        <Grid item xs>

                                            <NewUserSignUp/>

                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </main>
                    </Grid>

                </Grid>
            </Paper>
        </React.Fragment>


    );
}

function mapStateToProps(state) {
    return {}
}


export default connect(mapStateToProps, {loginUser})(
    reduxForm({
        form: 'LoginForm'
    })(LoginUser)
);


