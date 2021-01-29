
import React, {Component} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import UserMaintenance from "./UserMaintenance";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MiniDrawer from "./MiniDrawer";
import CenterTabs from "./CenterTabs";


export default class UserMainPage extends Component{
    render () {
        return (
            <React.Fragment>
                <MiniDrawer/>
                <CenterTabs/>

            </React.Fragment>

        )
    }
}


// function mapStateToProps(state){
//
//     console.log(state);
//     return{
//         users: state.loggedIn
//     }
// }

// export default connect(mapStateToProps)(UserMainPage);
