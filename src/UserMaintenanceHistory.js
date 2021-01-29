import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Table} from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {dark} from "@material-ui/core/styles/createPalette";
import {Maintenance} from "./maintenance";
import {loadMaintenance} from "./actions/maintenance.action";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MiniDrawer from "./MiniDrawer";
import Moment from "react-moment";



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


class UserMaintenanceHistory extends React.Component {

    componentDidMount() {
        this.props.loadMaintenance();
        console.log(this.props.maintenances)
    }

    render() {

        return (

            <React.Fragment>
                <MiniDrawer/>
                <Divider/>
            <div>
                {console.log(this.props.maintenances)}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                <h2>Maintenance History</h2>
                    <Divider/>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ maxWidth: '120vh' }}
                    >
                <ul>
                    <Table responsive>
                        <thead className={dark}>
                        <th>Request Date</th>
                        <th>Facility</th>
                        <th>Description</th>
                        <th>Status</th>
                        </thead>

                        <tbody>
                        {

                            this.props.maintenances.sort(function(a,b) {
                                return (Date.parse(b.time) - Date.parse(a.time))
                            }).map((maintenances) => {
                                return (
                                    <tr key={maintenances.id}>
                                        <td>
                                            <Moment format="YYYY/MM/DD">
                                                {maintenances.time}
                                            </Moment>
                                        </td>
                                        <td>
                                            <Maintenance maintenance={maintenances.facility}/>
                                        </td>
                                        <td>
                                            <Maintenance maintenance={maintenances.description}/>
                                        </td>
                                        <td>
                                            <Maintenance maintenance={maintenances.status}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </ul>
                </Grid>
                </Grid>
            </div>
            </React.Fragment>

        )


    }
}

function mapStateToProps(appState) {
    return {

        maintenances: appState.maintenances
    };
}

export default connect(mapStateToProps, {loadMaintenance})(UserMaintenanceHistory)
