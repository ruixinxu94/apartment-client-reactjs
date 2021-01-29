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
import {loadPaylease} from "./actions/payLease.action";



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


class LeasePaymentHistory extends React.Component {

    componentDidMount() {
        this.props.loadPaylease();

    }

    render() {

        return (

            <React.Fragment>
                <MiniDrawer/>
                <Divider/>
                <div>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <h2>Lease Payment History</h2>
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
                                    <th>Pay Date</th>
                                    <th>Balance</th>
                                    <th>Payment</th>
                                    <th>credit card</th>
                                    </thead>

                                    <tbody>
                                    {

                                        this.props.payLease.map((payLease) => {
                                            return (
                                                <tr key={payLease.id}>
                                                    <td>
                                                        <Moment format="YYYY/MM/DD">
                                                            {payLease.paydate}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        ${payLease.balance}
                                                    </td>
                                                    <td>
                                                        ${payLease.payment}
                                                    </td>
                                                    <td>
                                                        **** **** **** 8691
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

        payLease: appState.payLease
    };
}

export default connect(mapStateToProps, {loadPaylease})(LeasePaymentHistory)
