import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import EditCourseDate from "./EditCourseDate";

class ProtectedRouteEditDate extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? (
      <Route
        path="/EditCourseDate/:id"
        render={(props) => <EditCourseDate {...props} />}
      />
    ) : (
      <Redirect to={{ pathname: "/FitnessInfo" }} />
    );
  }
}

export default ProtectedRouteEditDate;