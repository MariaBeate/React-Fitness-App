import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import EditCourse from "../EditCourseDate";

class ProtectedRouteEditDate extends Component {
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
      <Route
        path="/EditCourseDate/:id"
        render={(props) => <EditCourse {...props} en={this.state.en} />}
      />
    ) : (
      <Redirect to={{ pathname: "/Fitnessplan" }} />
    );
  }
}

export default ProtectedRouteEditDate;
