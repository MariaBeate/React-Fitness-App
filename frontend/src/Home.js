import React, { Component } from "react";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
  }
}

export default Home;
