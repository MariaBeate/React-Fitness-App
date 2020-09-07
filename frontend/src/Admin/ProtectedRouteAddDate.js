import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddCourseDate from "./AddCourseDate";

class ProtectedRouteAddDate extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <AddCourseDate />
    ) : (
      <Redirect to={{ pathname: "/FitnessplanAdmin" }} />
    );
  }
}

export default ProtectedRouteAddDate;