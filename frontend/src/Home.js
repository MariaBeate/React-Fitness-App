import React, { Component } from "react";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.en)
    if (!this.props.en) {
      return (
        <div className="form">
          <div className="heading">
            Willkommen bei FitMo
        <div className="heading sub">
              Finde jetzt deinen Fitnesskurs
        </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="heading">
            Welcome to FitMo
        <div className="heading sub">
              Find your Fitness Course
        </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
