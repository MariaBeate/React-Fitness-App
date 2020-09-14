import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FitnessplanAdmin from "../FitnessplanAdmin";

class ProtectedRouteFitnessplan extends Component {
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
    console.log(this.state.en);
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <FitnessplanAdmin en={this.state.en} />
    ) : (
      <Redirect to={{ pathname: "/Fitnessplan" }} />
    );
  }
}

export default ProtectedRouteFitnessplan;
