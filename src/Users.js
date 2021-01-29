import React from 'react'
import {loadUsers} from "./actions/users.action";
import {connect} from "react-redux";
import {User} from "./User";
import {Link} from "react-router-dom";
import {Table} from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {dark} from "@material-ui/core/styles/createPalette";



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


class Users extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    clickToDeletePage(username) {
        this.props.history.push(`/delete-user/${username}`)
    }
    clickToEditPage(id) {
        this.props.history.push(`/edit-user/${id}`)
    }

    render() {

        return (
            <div>

                <h2>Users</h2>
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
                            this.props.users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td><
                                            IconButton className={myStyles.button} aria-label="delete"
                                                       onClick={() => this.clickToDeletePage(user.username)}>
                                            <DeleteIcon/>
                                        </IconButton>

                                        <Fab color="secondary" aria-label="edit" className={myStyles.fab}
                                             onClick={() => this.clickToEditPage(user.id)}>
                                            <EditIcon />
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
            </div>


        )


    }
}

function mapStateToProps(appState) {
    return {
        users: appState.users
    };
}

export default connect(mapStateToProps, {loadUsers})(Users)
