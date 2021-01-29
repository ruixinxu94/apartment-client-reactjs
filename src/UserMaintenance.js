import TextField from "@material-ui/core/TextField";
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {addMaintenance} from "./actions/maintenance.action";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const renderTextField = ({input, label, type, name, id, autoFocus}) => (
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
        autoFocus={autoFocus}
    />
)

const useStyles = makeStyles(theme => ({
    form: {
        width: '75%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

class UserMaintenance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newMaintenance: {
                roomnumber: JSON.parse(localStorage.getItem("user")).room,
                lastname: JSON.parse(localStorage.getItem("user")).lastname,
                firstname: JSON.parse(localStorage.getItem("user")).firstname,
                email: JSON.parse(localStorage.getItem("user")).email,
                status: 'pending',
                anytime: '',
                time: moment(),
                facility: '',
                description: ''
            },
            open: false
        }
        this.mySubmit = this.mySubmit.bind(this);
        this.handleAnytime = this.handleAnytime.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleFacility = this.handleFacility.bind(this);
    }

    handleFacility(event) {
        this.state.newMaintenance["facility"] = event.target.value;
        this.setState({
            newMaintenance: this.state.newMaintenance
        });
        console.log(this.state.newMaintenance)
    }
    handleClickOpen = () => {
        console.log(this.state);
        this.state.open=true;
        this.setState({
            open: this.state.open
        })
    };

    handleClickClose = () => {
        this.state.open=false;
        this.setState({
            open: this.state.open
        })
    };

    handleDescription(event) {
        this.state.newMaintenance["description"] = event.target.value;
        this.setState({
            newMaintenance: this.state.newMaintenance
        });
        console.log(this.state.newMaintenance)
    }

    handleAnytime(event) {
        this.state.newMaintenance["anytime"] = event.target.value;
        this.setState({
            newMaintenance: this.state.newMaintenance
        });
        console.log(this.state.newMaintenance)
    }

    mySubmit = () => {
        this.state.newMaintenance['time'] = moment();
        this.setState({
            newMaintenance: this.state.newMaintenance
        });
        console.log(this.state.newMaintenance)
        this.props.addMaintenance(this.state.newMaintenance, (res) => {
            console.log(res.data.success);
            if (res.data.success == "true") {
                // window.location.reload();
            } else {
                alert('Fail')
            }
        });
    }


    componentDidMount() {
        this.props.addMaintenance();
    }

    render() {
        return (
            <React.Fragment>
                <Divider />
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        label={"reqeust"}
                    >
                        <Grid container
                              justify="center">
                        <Typography component="h3" variant="h4">Request for Maintenance</Typography>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container
                              justify="center"
                              spacing={5}>
                            <form onSubmit={this.props.handleSubmit(this.mySubmit)}>
                                <Grid container
                                      justify="center">
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="h6" variant="h6">
                                            Facility Type:
                                        </Typography> <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={this.state.newMaintenance.facility}
                                        onChange={this.handleFacility}
                                    >
                                        <MenuItem value="kitchen">
                                            <em>Kitchen</em>
                                        </MenuItem>
                                        <MenuItem value={"RestRoom"}>RestRoom</MenuItem>
                                        <MenuItem value={"BedRoom"}>BedRoom</MenuItem>
                                        <MenuItem value={"Public Area"}>Public Area</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <p>Is it ok to enter your room at daily time?</p>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            value={this.state.newMaintenance.anytime}
                                            onChange={this.handleAnytime}
                                        >
                                            <MenuItem value="Yes">
                                                <em>Yes</em>
                                            </MenuItem>
                                            <MenuItem value={"No"}>No</MenuItem>
                                        </Select>
                                    </Grid>

                                </Grid>

                                <Grid >
                                    <Typography component="h4" variant="h4">
                                    Description
                                </Typography>
                                    <Grid container
                                          justify="center">

                                        <TextField
                                            id="filled-multiline-static"
                                            label="Description"
                                            multiline
                                            rows="7"
                                            margin="normal"
                                            variant="filled"
                                            placeholder="Problem Description"
                                            fullWidth
                                            value={this.state.newMaintenance['Description']}
                                            onChange={(event) => this.handleDescription(event)}
                                        />
                                    </Grid>


                                </Grid>
                                <Button
                                    type="submit"

                                    variant="contained"
                                    color="primary"
                                    iconSizeSmall
                                    onClick={this.handleClickOpen}
                                >
                                    Submit Request Service
                                </Button>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClickClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Your request is being under scheduling, it would be resolved soon!
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClickClose} color="primary"
                                        >
                                           Ok
                                        </Button>

                                    </DialogActions>
                                </Dialog>
                            </form>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
            </React.Fragment>
        )
    }

}

function mapStateToProps(appState) {
    return {
        maintenance: appState.maintenance
    }
}

export default connect(mapStateToProps, {addMaintenance})(
    reduxForm({
        form: 'AddMaintenanceForm'
    })
    (UserMaintenance)
);
