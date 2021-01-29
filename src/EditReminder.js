import {makeStyles} from "@material-ui/core";
import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {EDIT_REMINDER, editReminder} from "./actions/reminder.action";
import {Link} from "react-router-dom";
import Switch from "react-switch";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



const EDIT_REMINDER_FORM_CONTROLS = [
    {label: 'Type', type: 'text', field: 'type'},
    {label: 'Content', type: 'text', field: 'content'},
    // {label: 'Status', type: 'text', field: 'status'}
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

class EditReminder extends React.Component {

    constructor(props) {
        super(props);
        const initialReminderId = props.match.params.id;
        const initialReminder = props.reminders.find(b => b.id == initialReminderId);

        this.state = {
            editReminder: initialReminder,
        };


        this.handleEdit = this.handleEdit.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);

    };

    handleEdit(event) {
        event.preventDefault();
        this.props.editReminder(this.state.editReminder, (res) => {
            if (res.data.success) {
                this.props.history.push('/admin-post-news');
            } else {
                alert('edit book failed!')
            }
        });
    }

    handleSwitchChange(checked) {
        this.state.editReminder["status"]=checked;
        this.setState({
            editReminder: this.state.editReminder
        });
    }


    handleControlChange(event) {
        const {id, value} = event.target;
        this.state.editReminder[id] = value;
        this.setState({
            editReminder: this.state.editReminder
        });
    }

    renderControl(control) {
        return (
            <div className="form-group" key={control.field}>
                <label>
                    {control.label}

                    <TextareaAutosize
                        rowsMax={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        id={control.field}
                        value={this.state.editReminder[control.field]}
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


                            <Typography component="h3" variant="h3">
                                Edit News
                            </Typography>
                            <p></p>
                            <p></p>
                            <div className={useStyles.paper}>
                                <form onSubmit={this.handleEdit}>
                                    {
                                        EDIT_REMINDER_FORM_CONTROLS.map(control => this.renderControl(control))
                                    }


                                    Post Off<Switch
                                        checked={this.state.editReminder['status'] == "true"? true : false}
                                        onChange={this.handleSwitchChange}

                                    />On
                                    <p>
                                        <button type="submit" className="btn btn-primary">Edit</button>
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

export default connect(mapStateToProps, {editReminder})(EditReminder);
