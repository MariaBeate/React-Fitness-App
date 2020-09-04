import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FitnessplanAdmin from "./FitnessplanAdmin";

class ProtectedRouteFitnessplan extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <FitnessplanAdmin />
    ) : (
      <Redirect to={{ pathname: "/Fitnessplan" }} />
    );
  }
}

export default ProtectedRouteFitnessplan;