import React from 'react'
import {connect} from "react-redux";
import {editUser} from "./actions/users.action";
import {deleteUser} from "./actions/users.action";
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


const EDIT_USER_FORM_CONTROLS = [
    {label: 'ID', type: 'number', field: 'id'},
    {label: 'userName', type: 'text', field: 'username'},
    {label: 'firstName', type: 'text', field: 'firstname'},
    {label: 'LastName', type: 'text', field: 'lastname'},
    {label: 'Birthday', type: 'date', field: 'birthday'},
    {label: 'Room', type: 'txt', field: 'room'},
    {label: 'Lease Start Date', type: 'txt', field: 'leasestart'},
    {label: 'Lease End Date', type: 'txt', field: 'leaseend'}

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

class EditUser extends React.Component {

    constructor(props) {
        super(props);
        const initialUserId = props.match.params.id;
        const initialUser = props.users.find(b => b.id == initialUserId);
        this.state = {
            editUser: initialUser,
        };


        this.handleEdit = this.handleEdit.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);

    };

    handleEdit(event) {
        event.preventDefault();
        this.props.editUser(this.state.editUser, (res) => {
            if (res.data.success) {
                this.props.history.push('/admin-user-info-page');
            } else {
                alert('edit book failed!')
            }
        });
    }

    handleControlChange(event) {
        const {id, value} = event.target;
        this.state.editUser[id] = value;
        this.setState({
            editUser: this.state.editUser
        });
    }

    renderControl(control) {
        return (
            <div className="form-group" key={control.field}>
                <label>
                    {control.label}
                    <input type={control.type}
                           id={control.field}
                           className="form-control"
                           value={this.state.editUser[control.field]}
                           disabled={control.field === 'username' || control.field === 'id'}
                           onChange={this.handleControlChange}
                    />
                </label>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <ResponsiveDrawer/>
            <Container component="main" maxWidth="md">
                <CssBaseline/>

                <Box mx="auto" bgcolor="background.paper" p={5}>
                    <div className={useStyles.paper}>
                        <p></p>

                        <Typography component="h1" variant="h1">
                            Edit User
                        </Typography>
                        <p></p>
                        <p></p>
                        <div className={useStyles.paper}>
                            <form onSubmit={this.handleEdit}>
                                {
                                    EDIT_USER_FORM_CONTROLS.map(control => this.renderControl(control))
                                }
                                <p>
                                    <button type="submit" className="btn btn-primary">Edit</button>
                                </p>

                            </form>
                            <Button variant="contained" component={Link} to={"/admin-user-info-page"}>Cancel </Button>

                        </div>
                    </div>
                </Box>


            </Container>
            </React.Fragment>
        )
    }


}

function mapStateToProps({users}) {
    return {
        users
    };
}

export default connect(mapStateToProps, {editUser})(EditUser);





