import React from 'react';
import styles from './styles.css';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {addPayLease, editPayLease, loadPaylease} from "./actions/payLease.action";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";



class PayLease extends React.Component {
    componentDidMount() {
        this.props.loadPaylease();
        console.log(this.props.payLease)
    }
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
            newPayment: {
                payment : JSON.parse(localStorage.getItem("user")).rental,
                balance: JSON.parse(localStorage.getItem("user")).rental,
                paydate: moment().toDate(),
                username: JSON.parse(localStorage.getItem("user")).username
            },
            open: false

        }
            this.mySubmit = this.mySubmit.bind(this);

    }

    // handleClickOpen = () => {
    //     console.log(this.state);
    //     this.state.open=true;
    //     this.setState({
    //         open: this.state.open
    //     })
    // };

    handleClickClose = () => {
        this.state.open=false;
        this.setState({
            open: this.state.open
        })
    };

    mySubmit = (event) => {
        event.preventDefault();
        this.state.newPayment["payment"]=this.state.newPayment["balance"];
        this.state.newPayment["balance"] = 0;
        this.setState({newPayment: this.state.newPayment})
        this.props.editPayLease(this.state.newPayment, (res) => {
            if (res.data.success == "true") {
                this.state.open=true;
                this.setState({
                    open: this.state.open
                })
            } else {
                alert('Payment failed')
            }
        });
    }


    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    // handleBalance = () => {
    //     this.state.newPayment["balance"]=this.props.payLease;
    //     this.setState({newPayment: this.props.newPayment})
    // }
    render() {
        const { name, number, expiry, cvc, focused, issuer, formData, newPayment} = this.state;
        {console.log(this.props.payLease[0])}
        // {this.state.newPayment["balance"]=this.props.payLease}
        // {this.setState({newPayment: this.props.newPayment})}


        {console.log(newPayment)}
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
                            <Typography component="h3" variant="h4">Lease Payment</Typography>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container
                              justify="center">
            <div key="Payment">
                {/*{this.handleBalance}*/}
                <div className="App-payment">
                    {/*<h1>This month balance: {this.state.newPayment["balance"]} </h1>*/}
                    <h1>This month balance: {this.state.newPayment["balance"]} </h1>
                    <h2>Cycle Due Date: 2019-12-17</h2>

                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <form>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    placeholder="Valid Thru"

                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button className="btn btn-primary btn-block"
                                    onClick = {this.mySubmit}
                            >PAY</button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClickClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Thanks for your payment! Please review the payment history.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClickClose} color="primary"
                                    >
                                        Ok
                                    </Button>

                                </DialogActions>
                            </Dialog>
                        </div>
                    </form>
                    <hr style={{ margin: '60px 0 30px' }} />
                    <hr style={{ margin: '30px 0' }} />

                </div>

            </div>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

function mapStateToProps(appState) {
    console.log(appState)
    return {
        payLease: appState.payLease
    };
}

export default connect(mapStateToProps, {editPayLease ,loadPaylease})(PayLease);


