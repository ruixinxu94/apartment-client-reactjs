import React from "react";
import {Header} from "./Header";

export class App extends React.Component {
  render() {
      const mystyle = {width:'1300px', margin:' auto'};
    return (

        <React.Fragment>
          {/*<Header />*/}



          {this.props.children}


        </React.Fragment>
    );
  }
}
