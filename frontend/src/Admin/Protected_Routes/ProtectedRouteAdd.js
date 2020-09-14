import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddCourse from "../AddCourse";

class ProtectedRouteAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      en: this.props.en, //if true = english rendering
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
  }
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <AddCourse en={this.state.en} />
    ) : (
      <Redirect to={{ pathname: "/FitnessInfo" }} />
    );
  }
}

export default ProtectedRouteAdd;
