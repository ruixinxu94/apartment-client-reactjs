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



// const myStyles = theme => ({
//     root: {
//         height: '100vh',
//     },
//     image: {
//         backgroundImage: 'url(https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/IMG_1625.JPG)',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//     },
//     paper: {
//         margin: theme.spacing(8, 4),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// });

// class LoginUser extends Component {
//
//     onSubmit = (user) => {
//         this.props.loginUser(user, (res) => {
//             if (res.data.success) {
//                 // this.props.history.push('/products');
//                 console.log("logged in")
//                 this.props.history.push('/user_main_page')
//             } else {
//                 alert("The password doesn't match with the username, please enter a correct one.");
//             }
//         });
//     }
//
//     renderField({input, label, type}) {
//         return (
//             <div className="form-group">
//                 <label>
//                     {label}
//                     <input
//                         type={type}
//                         name={input.name}
//                         className="form-control"
//                         {...input}
//                     />
//                 </label>
//             </div>
//         )
//     }
//
//     render() {
//
//             return (
//                 <Container maxWidth="sm">
//                     <Grid container component="main" className={myStyles.root}>
//                         <CssBaseline/>
//                         <div className="col-md-6 col-md-offset-3">
//
//                             <h2>Login</h2>
//                             <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={myStyles.form}>
//                                 <Field
//                                     name="username"
//                                     label="Username"
//                                     type="text"
//                                     component={this.renderField}
//                                     FullWidth
//                                 />
//                                 <Field
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     component={this.renderField}
//                                     FullWidth
//                                 />
//                                 <Button
//                                     type="submit"
//
//                                     variant="contained"
//                                     color="primary"
//                                 >
//                                     Sign In
//                                 </Button>
//                                 <p></p>
//                                 <Grid container>
//                                     <Grid item xs>
//                                         <Link href="#" variant="body2">
//                                             Forgot password?
//                                         </Link>
//                                     </Grid>
//
//                                 </Grid>
//                             </form>
//                         </div>
//                     </Grid>
//                 </Container>
//             );
//
//         }

//     return (
//         <Grid container component="main" className={classes.root}>
//             <CssBaseline/>
//             <Grid item xs={false} sm={4} md={7} className={classes.image}/>
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <div className={classes.paper}>
//                     <Avatar className={classes.avatar}>
//                         <LockOutlinedIcon/>
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     <form className={classes.form} noValidate onSubmit={this.props.handleSubmit(this.onSubmit)}>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary"/>}
//                             label="Remember me"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                         >
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="#" variant="body2">
//                                     Forgot password?
//                                 </Link>
//                             </Grid>
//                             <Grid item>
//                                 <Link href="#" variant="body2">
//                                     {"Don't have an account? Sign Up"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </div>
//             </Grid>
//         </Grid>
//     );
// }


// }

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
            marginTop: theme.spacing(18),
            marginBottom: theme.spacing(6),
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
            width: 500,
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

            <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Welcome Home!
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
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                        </Paper>
                    </main>


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


