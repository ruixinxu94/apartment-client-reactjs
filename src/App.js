import React from "react";
import {Header} from "./Header";

export class App extends React.Component {
  render() {
    return (

        <React.Fragment>
          {/*<Header />*/}
          {this.props.children}
        </React.Fragment>
    );
  }
}
