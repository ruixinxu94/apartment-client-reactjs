import React from 'react'
import {loadUsers} from "./actions/users.action";
import {connect} from "react-redux";
import {User} from "./User";
import {Table} from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {dark} from "@material-ui/core/styles/createPalette";

import ResponsiveDrawer from "./ResponsiveDrawer";
import Grid from "@material-ui/core/Grid";
import {Container, makeStyles} from "@material-ui/core";
import myContainer from './marginpadding.css'


const myStyles = theme => ({
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

});


class UserFilter extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.inputChangeHandlerEmail = this.inputChangeHandlerEmail.bind(this);
        this.inputChangeHandlerFirstname = this.inputChangeHandlerFirstname.bind(this);
        this.inputChangeHandlerLastname = this.inputChangeHandlerLastname.bind(this);
        this.state = {
            filterStr: '',
            filterEmail: '',
            filterUsername: '',
            filterFirstname: '',
            filterLastname: ''

        }
    }

    inputChangeHandler = (event) => {
        this.setState({
            filterStr: event.target.value
        });
    }
    inputChangeHandlerEmail = (event) => {
        this.setState({
            filterEmail: event.target.value
        });
    }
    inputChangeHandlerFirstname = (event) => {
        this.setState({
            filterFirstname: event.target.value
        });
    }
    inputChangeHandlerLastname = (event) => {
        this.setState({
            filterLastname: event.target.value
        });
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    clickToDeletePage(username) {
        this.props.history.push(`/delete-user/${username}`)
    }

    clickToEditPage(id) {
        this.props.history.push(`/edit-user/${id}`)
    }

    clickToSearchRoom = (roomnumber) => {

        const {users} = this.props;
        if (roomnumber == 0) {
            return users;
        } else {
            let filtered = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].room == roomnumber) {
                    filtered.push(users[i]);
                }
            }
            return filtered;
        }
    }
    clickToSearchEmail = (filterstring) => {

        const {users} = this.props;
        if (filterstring == null) {
            return users;
        } else {
            let filtered = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase().startsWith(filterstring.toLowerCase())) {
                    filtered.push(users[i]);
                }
            }
            console.log(filtered)
            return filtered;
        }
    }
    clickToSearchFirstname = (filterstring) => {

        const {users} = this.props;
        if (filterstring == null) {
            return users;
        } else {
            let filtered = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].firstname.toLowerCase().startsWith(filterstring.toLowerCase())) {
                    filtered.push(users[i]);
                }
            }
            console.log(filtered)
            return filtered;
        }
    }
    clickToSearchLastname = (filterstring) => {

        const {users} = this.props;
        if (filterstring == null) {
            return users;
        } else {
            let filtered = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].lastname.toLowerCase().startsWith(filterstring.toLowerCase())) {
                    filtered.push(users[i]);
                }
            }
            console.log(filtered)
            return filtered;
        }
    }
    combineFilter = () => {
        let result = this.clickToSearchRoom(this.state.filterStr).filter(x => {
            if (this.clickToSearchEmail(this.state.filterEmail).indexOf(x) != -1) {
                return true;
            }
            return false
        }).filter(x => {
            if (this.clickToSearchFirstname(this.state.filterFirstname).indexOf(x) != -1) {
                return true;
            }
            return false
        }).filter(x => {
            if (this.clickToSearchLastname(this.state.filterLastname).indexOf(x) != -1) {
                return true;
            }
            return false
        });
        console.log(result);
        return result
    }


    render() {


        return (


            <React.Fragment>
                <ResponsiveDrawer/>

                <div>

                    <Container maxWidth="lg"
                    >
                        <Grid container
                              justify="center"
                              spacing={0}>
                            <Grid item xs={2}>
                                <h6>Room Number:</h6>

                                <input
                                    type="number"
                                    onChange={this.inputChangeHandler}
                                    value={this.state.filterStr}
                                    style={{width: "100px"}}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Email:</h6>
                                <input
                                    type="text"
                                    onChange={this.inputChangeHandlerEmail}
                                    value={this.state.filterEmail}
                                    style={{width: "100px"}}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Firstname:</h6>
                                <input
                                    type="text"
                                    onChange={this.inputChangeHandlerFirstname}
                                    value={this.state.filterFirstname}
                                    style={{width: "100px"}}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Lastname:</h6>
                                <input
                                    type="text"
                                    onChange={this.inputChangeHandlerLastname}
                                    value={this.state.filterLastname}
                                    style={{width: "100px"}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container
                              justify="center">
                            <ul>


                                <Table responsive>
                                    <thead className={dark}>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Username(Email)</th>
                                    <th>Firstname</th>
                                    <th>LastName</th>
                                    <th>Room</th>
                                    <th>Birthday</th>
                                    <th>lease Start date</th>
                                    <th>lease end date</th>
                                    </thead>

                                    <tbody>
                                    {
                                        this.combineFilter().map((user) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td><
                                                        IconButton className={myStyles.button} aria-label="delete"
                                                                   onClick={() => this.clickToDeletePage(user.username)}>
                                                        <DeleteIcon/>
                                                    </IconButton>

                                                        <Fab color="secondary" aria-label="edit"
                                                             className={myStyles.fab}
                                                             onClick={() => this.clickToEditPage(user.id)}>
                                                            <EditIcon/>
                                                        </Fab>
                                                    </td>
                                                    <td>
                                                        #NYCFORT<User user={user.id}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.username}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.firstname}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.lastname}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.room}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.birthday}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.leasestart}/>
                                                    </td>
                                                    <td>
                                                        <User user={user.leaseend}/>
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

        )

    }
}

function mapStateToProps(appState) {
    return {
        users: appState.users
    };
}

export default connect(mapStateToProps, {loadUsers})(UserFilter)
