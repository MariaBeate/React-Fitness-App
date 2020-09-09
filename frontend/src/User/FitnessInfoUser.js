import React, { Component } from "react";

export default class FitnessInfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/fitness")
      .then((response) => response.json())
      .then((course) => {
        this.setState({ courses: course });
      });
  }

  render() {
    return (
      <div>
      <div className="heading">
        Kursplan
      </div>
        <table id="info">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preis</th>
              <th>Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title} </td>
                <td>{course.price}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}