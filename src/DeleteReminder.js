import {makeStyles} from "@material-ui/core";
import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {deleteReminder} from "./actions/reminder.action";
import {Link} from "react-router-dom";
const DELETE_REMINDER_FORM_CONTROLS = [
    {label: 'Type', type: 'text', field: 'type'},
    {label: 'Content', type: 'text', field: 'content'},
    {label: 'Status', type: 'text', field: 'status'}
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

class DeleteReminder extends React.Component {

    constructor(props) {
        super(props);
        const initialReminderId = props.match.params.id;
        const initialReminder = props.reminders.find(b => b.id == initialReminderId);
        this.state = {
            deleteReminder: initialReminder,
        };


        this.handleDelete = this.handleDelete.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);

    };

    handleDelete(event) {
        event.preventDefault();
        this.props.deleteReminder(this.state.deleteReminder, (res) => {
            if (res.data.success) {
                this.props.history.push('/admin-post-news');
            } else {
                alert('delete failed!')
            }
        });
    }

    handleControlChange(event) {
        const {id, value}=event.target;
        this.state.deleteReminder[id]=value;
        this.setState( {
            deleteReminder: this.state.deleteReminder
        })
    }

    renderControl(control) {
        return (
            <div className="form-group" key={control.field}>
                <label>
                    {control.label}
                    <input type={control.type}
                           id={control.field}
                           className="form-control"
                           value={this.state.deleteReminder[control.field]}
                           onChange={this.handleControlChange}
                           disabled={control.field==="type" || "status" || "content"}
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
                            <p>1</p>


                            <Typography component="h3" variant="h3">
                                Delete Event
                            </Typography>
                            <p></p>
                            <p></p>
                            <div className={useStyles.paper}>
                                <form onSubmit={this.handleDelete}>
                                    {
                                        DELETE_REMINDER_FORM_CONTROLS.map(control => this.renderControl(control))
                                    }
                                    <p>
                                        <button type="submit" className="btn btn-primary">Delete</button>
                                    </p>

                                </form>
                                <Button variant="contained" component={Link} to={"/admin-post-news"}>Cancel </Button>

                            </div>
                        </div>
                    </Box>


                </Container>
            </React.Fragment>
        )
    }


}

function mapStateToProps({reminders}) {
    return {
        reminders
    };
}

export default connect(mapStateToProps, {deleteReminder})(DeleteReminder);
