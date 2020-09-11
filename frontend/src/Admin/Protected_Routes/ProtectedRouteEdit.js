import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import EditCourse from "../EditCourse";

class ProtectedRouteEdit extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? (
      <Route
        path="/EditCourse/:id"
        render={(props) => <EditCourse {...props} />}
      />
    ) : (
      <Redirect to={{ pathname: "/FitnessInfo" }} />
    );
  }
}

export default ProtectedRouteEdit;
