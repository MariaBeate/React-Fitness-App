import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import EditCourse from "../EditCourseDate";

class ProtectedRouteEditDate extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? (
      <Route
        path="/EditCourseDate/:id"
        render={(props) => <EditCourse {...props} />}
      />
    ) : (
      <Redirect to={{ pathname: "/Fitnessplan" }} />
    );
  }
}

export default ProtectedRouteEditDate;
