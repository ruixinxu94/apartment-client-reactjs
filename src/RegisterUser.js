import React from 'react'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {registerUser} from "./actions/users.action";
import {makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import ResponsiveDrawer from "./ResponsiveDrawer";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";


const REGISTER_USER_FORM_CONTROLS = [
    {label: 'ID', type: 'number', field: 'id'},
    {label: 'userName', type: 'text', field: 'username'},
    {label: 'firstName', type: 'text', field: 'firstname'},
    {label: 'LastName', type: 'text', field: 'lastname'},
    {label: 'Email', type: 'text', field: 'email'},
    {label: 'Password', type: 'password', field: 'password'},
    {label: 'Birthday', type: 'date', field: 'birthday'},
    {label: 'Job', type: 'text', field: 'job'},
    {label: 'Salary', type: 'number', field: 'salary'},
    {label: 'Room', type: 'txt', field: 'room'}

];
const useStyles = makeStyles(theme => ({
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
}));

class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                id: '',
                username: '',
                firstname: '',
                lastname: '',
                birthday: '',
                email: '',
                job: '',
                password: '',
                room: '',
                salary: ''
            }
        }
        this.mySubmit = this.mySubmit.bind(this);
    }

    RegisterUserFormControl(props) {
        const {control, input, meta} = props;
        return (
            <div className="form-group">
                <label>
                    {control.label}
                    <TextField type={control.type}
                               className="form-control"

                               {...input}
                    />
                    <p className="text-danger">{meta.error}</p>
                </label>
            </div>
        )
    }


    mySubmit = (value) => {
        console.log(value);
        this.props.registerUser(value, (res) => {
            console.log(res.data.success);
            if (res.data.success == "true") {
                this.props.history.push('/admin-user-info-page')
            } else {
                alert('Register user failed, please enter different username and id.')
            }
        });
    }


    render() {

        return (
            <React.Fragment>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box mx="auto" bgcolor="background.paper" p={5}>
                    <div className={useStyles.paper}>
                        <Avatar className={useStyles.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <p></p>

                        <Typography component="h1" variant="h1">
                            Register User
                        </Typography>
                        <p></p>
                        <p></p>
                        <div className={useStyles.paper}>
                            <form onSubmit={this.props.handleSubmit(this.mySubmit)}>
                                {
                                    REGISTER_USER_FORM_CONTROLS.map(control => {
                                        return <Field
                                            className={useStyles.form}
                                            component={this.RegisterUserFormControl}
                                            name={control.field}
                                            control={control}
                                            key={control.field}
                                        />
                                    })
                                }
                                <button type="submit" className={"btn btn-success"}>Submit</button>
                                <Button variant="contained" component={Link} to={"/admin-user-info-page"}>
                                    Cancel
                                </Button>

                            </form>
                        </div>
                    </div>
                </Box>


            </Container>
            </React.Fragment>
        )
    }


}

function myValidations(values) {
    let errors = {};
    const {id, username, firstname, lastname, email, password} = values;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!id) {
        errors.id = 'Id must be provided';
    }
    if (!username) {
        errors.username = 'Username must be provided.';
    }
    if (!email) {
        errors.email = 'Email must be provided';
    } else {
        if (!emailRegex.test(email)) {
            errors.email = 'Email Format is not correct';
        }
    }

    if (!firstname) {
        errors.firstname = 'First name must be provided';
    }

    if (!lastname) {
        errors.lastname = 'Last name must be provided';
    }

    if (!passwordRegex.test(password)) {
        errors.password = 'Password must be at least 8 characters long with at least one character.'
    }

    return errors;
}

export default connect(null, {registerUser})(
    reduxForm({
        form: 'RegisterUserForm',
        validate: myValidations
    })(RegisterUser)
);


