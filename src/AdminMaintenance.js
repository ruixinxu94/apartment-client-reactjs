import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {Table} from "reactstrap";
import {dark} from "@material-ui/core/styles/createPalette";
import Moment from "react-moment";
import {Maintenance} from "./maintenance";
import {connect} from "react-redux";
import {editMaintenance, loadMaintenances} from "./actions/maintenance.action";
import ResponsiveDrawer from "./ResponsiveDrawer";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import moment from "moment";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";




class AdminMaintenance extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            editMaintenance: {
                id: '',
                time: '',
                status: '',
                anytime: '',
                description: '',
                facility:'',
                email: '',
                firstname: '',
                lastname: '',
                roomnumber: ''
            },
            filterToday: '',
            filterStatus:''

        };
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.clickToSearchStatus = this.clickToSearchStatus.bind(this);
        this.clickToSearchToday=this.clickToSearchToday.bind(this);

    }

    componentDidMount() {
        this.props.loadMaintenances();
        this.props.editMaintenance();
    }
    handleMenu(event) {
        this.state.filterStatus = event.target.value;
        this.setState({
            filterStatus: this.state.filterStatus
        })
        console.log(this.state.filterStatus)
    }

    handleToday() {
        this.state.filterToday = moment().format().slice(0,-14);
        this.setState({
            filterToday: this.state.filterToday
        })
        console.log(this.state.filterToday)
    }

    handleReset() {
        this.state.filterStatus = '';
        this.state.filterToday = '';
        this.setState({
            filterStatus: this.state.filterStatus,
            filterToday: this.state.filterToday
        })
        console.log(this.state.filterStatus)

    }

    clickToSearchToday = (date) => {
        const {maintenances} = this.props;

        if (date == null) {
            return maintenances;
        } else {
            let filtered = [];

            for (let i = 0; i < maintenances.length; i++) {
                if (maintenances[i].time.toString().toLowerCase().startsWith(date.toLowerCase())) {
                    filtered.push(maintenances[i]);
                }console.log(maintenances[i].time.toString())
            }
            return filtered;
        }
    }

    clickToSearchStatus = (status) => {

        const {maintenances} = this.props;
        if (status == null) {
            return maintenances;
        } else {
            let filtered = [];
            for (let i = 0; i < maintenances.length; i++) {
                if (maintenances[i].status.toString().toLowerCase().startsWith(status.toLowerCase())) {
                    filtered.push(maintenances[i]);
                }console.log(maintenances[i].status.toString())
            }
            return filtered;
        }
    }

    combineFilter = () => {
        let result = this.clickToSearchToday(this.state.filterToday).filter(x => {
            if (this.clickToSearchStatus(this.state.filterStatus).indexOf(x) != -1) {
                return true;
            }
            return false
        });

        return result
    }



    handleCheck(id,time,roomnumber,lastname,firstname,email,facility,description,anytime) {
        this.state.editMaintenance["status"] = "solved";
        this.state.editMaintenance["time"]=time;
        this.state.editMaintenance["roomnumber"]=roomnumber;
        this.state.editMaintenance["lastname"]=lastname;
        this.state.editMaintenance["lastname"]=lastname;
        this.state.editMaintenance["firstname"]=firstname;
        this.state.editMaintenance["firstname"]=firstname;
        this.state.editMaintenance["email"]=email;
        this.state.editMaintenance["facility"]=facility;
        this.state.editMaintenance["description"]=description;
        this.state.editMaintenance["anytime"]=anytime;
        this.state.editMaintenance["id"]=id;
        this.setState({
            editMaintenance: this.state.editMaintenance
        });
        console.log(this.state);
        this.props.editMaintenance(this.state.editMaintenance, (res) => {
            if (res.data.success) {
                console.log("edit success")
                window.location.reload();
            } else {
                alert('edit failed!')
            }
        })
    }

    render() {

        return (
            <React.Fragment>
                <ResponsiveDrawer/>

                <Divider/>
                <div>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >


                        <h2>Maintenance Order</h2>
                        <Divider/>
                        <Grid item xs={12}>
                            <Grid container justify='space-evenly' spacing={10}>
                                <Grid spacing={10}>
                                    <Button variant="contained" color="primary" onClick={this.handleToday}>
                                        Today
                                    </Button>

                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            value={this.state.filterStatus}
                                            onChange={this.handleMenu}
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            <MenuItem value={"pending"}>Pending</MenuItem>
                                            <MenuItem value={"solved"}>Solved</MenuItem>
                                        </Select>

                                </Grid>
                                <Grid spacing={10}>

                                </Grid>
                                <Grid spacing={10}>
                                    <Button variant="contained" color="secondary" onClick={this.handleReset}>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
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
                                    <td></td>
                                    <th>Request ID</th>
                                    <th>Request Date</th>
                                    <th>Room</th>
                                    <th>Name</th>
                                    <th>Facility</th>
                                    <th>Description</th>
                                    <th>Allow Entering</th>
                                    <th>Status</th>
                                    </thead>

                                    <tbody>
                                    {
                                        this.combineFilter().sort(function(a,b) {
                                            return (Date.parse(b.time) - Date.parse(a.time))

                                        }).
                                        map((maintenances) => {
                                            return (
                                                <tr key={maintenances.id}>
                                                    <td>
                                                        <IconButton  aria-label="check" onClick={() => this.handleCheck(maintenances.id, maintenances.time
                                                        , maintenances.roomnumber, maintenances.lastname, maintenances.firstname, maintenances.email,
                                                            maintenances.facility, maintenances.description, maintenances.anytime
                                                        )}>
                                                            <CheckCircleIcon/>
                                                        </IconButton>

                                                    </td>
                                                    <td>
                                                        <Maintenance maintenance={maintenances.id}/>
                                                    </td>
                                                    <td>
                                                        <Moment format="YYYY/MM/DD">
                                                            {maintenances.time}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        <Maintenance maintenance={maintenances.roomnumber}/>
                                                    </td>
                                                    <td>
                                                        {maintenances.firstname} {maintenances.lastname}
                                                    </td>
                                                    <td>
                                                        <Maintenance maintenance={maintenances.facility}/>
                                                    </td>
                                                    <td>
                                                        <Maintenance maintenance={maintenances.description}/>
                                                    </td>
                                                    <td>
                                                        <Maintenance maintenance={maintenances.anytime}/>
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

function mapStateToProps(appState, maintenances) {
    return {
        maintenances: appState.maintenances,
    };
}

export default connect(mapStateToProps, {loadMaintenances, editMaintenance})(AdminMaintenance)
