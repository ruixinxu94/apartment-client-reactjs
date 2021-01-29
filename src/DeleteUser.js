
import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {deleteUser} from "./actions/users.action";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


const DELETE_USER_FORM_CONTROLS = [
    {label: 'ID', type: 'number', field: 'id'},
    {label: 'userName', type: 'text', field: 'username'},
    {label: 'firstName', type: 'text', field: 'firstname'},
    {label: 'LastName', type: 'text', field: 'lastname'},
    {label: 'Birthday', type: 'date', field: 'birthday'},
    {label: 'Room', type: 'txt', field: 'room'},
    {label: 'Lease Start Date', type: 'txt', field: 'leasestart'},
    {label: 'Lease End Date', type: 'txt', field: 'leaseend'}
]

class DeleteUser extends React.Component {

    constructor(props) {
        super(props);
        const initialUserName = props.match.params.username;
        const initialUser = props.users.find(b => b.username == initialUserName);
        this.state = {
            deleteUser: initialUser
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleControlDeleteChange = this.handleControlDeleteChange.bind(this);

    };

    handleDelete(event) {
        event.preventDefault();
        this.props.deleteUser(this.state.deleteUser, (res) => {
            if (res.data.success) {
                this.props.history.push('/admin-user-info-page');
            } else {
                alert('delete book failed!')
            }
        });
    }
    handleControlDeleteChange(event) {
        const {username, value}=event.target;
        this.state.deleteUser[username]=value;
        this.setState( {
            deleteUser: this.state.deleteUser
        })
    }




    renderDeleteControl(control) {
        return (
            <div className="form-group" key={control.field}>
                <label>
                    {control.label}
                    <input type={control.type}
                           id={control.field}
                           className="form-control"
                           value={this.state.deleteUser[control.field]}
                           disabled={control.field === 'username' || control.field === 'id' || control.field === 'firstname' || control.field === 'lastname' || control.field === 'birthday' || control.field === "email" || control.field === "room"}
                           onChange={this.handleControlDeleteChange}
                    />
                </label>
            </div>
        );
    }

    render() {
        return (

            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box mx="auto" bgcolor="background.paper" p={5}>
                    <div >
                        <p></p>

                        <Typography component="h1" variant="h1">
                            Are you sure to delete this user?
                        </Typography>
                        <p></p>
                        <p></p>
                        <div >
                            <form onSubmit={this.handleDelete}>
                                {
                                    DELETE_USER_FORM_CONTROLS.map(control => this.renderDeleteControl(control))
                                }
                                <p>
                                    <button type="submit" className="btn btn-danger">Delete</button>
                                </p>
                            </form>

                            <Button variant="contained" component={Link} to={"/admin-user-info-page"}>
                                Cancel
                            </Button>

                        </div>
                    </div>
                </Box>


            </Container>
        )
    }


}

function mapStateToProps({users}) {
    return {
        users
    };
}

export default connect(mapStateToProps, {deleteUser})(DeleteUser);
