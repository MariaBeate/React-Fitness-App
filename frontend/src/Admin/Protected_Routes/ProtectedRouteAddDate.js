import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddCourseDate from "../AddCourseDate";

class ProtectedRouteAddDate extends Component {
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
      <AddCourseDate en={this.state.en} />
    ) : (
      <Redirect to={{ pathname: "/FitnessplanAdmin" }} />
    );
  }
}

export default ProtectedRouteAddDate;
