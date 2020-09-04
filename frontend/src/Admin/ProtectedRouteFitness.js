import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FitnessInfoAdmin from "./FitnessInfoAdmin";

class ProtectedRouteFitness extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <FitnessInfoAdmin />
    ) : (
      <Redirect to={{ pathname: "/FitnessInfo" }} />
    );
  }
}

export default ProtectedRouteFitness;