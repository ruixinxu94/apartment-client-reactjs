import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./actions/auth.action";
import {reduxForm} from "redux-form";
import {Redirect, withRouter} from "react-router";


export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout (){
        // this.props.logoutUser((res) => {
            // if (res.data && res.data.success) {
            //     this.props.history.push('/login');
            // }

            localStorage.removeItem('user');
        this.props.history.push("/login");

    }
        render() {
        return (
            <header>
                <nav className="navbar navbar-light">
                    <ul>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={this.handleLogout}>Click to Logout</button>
                        </li>
                        
                    </ul>
                </nav>

            </header>
        )
    }
}

export default withRouter(Header);
