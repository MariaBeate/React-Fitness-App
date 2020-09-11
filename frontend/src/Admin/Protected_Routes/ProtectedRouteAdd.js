import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddCourse from "../AddCourse";

class ProtectedRouteAdd extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <AddCourse />
    ) : (
      <Redirect to={{ pathname: "/FitnessInfo" }} />
    );
  }
}

export default ProtectedRouteAdd;
