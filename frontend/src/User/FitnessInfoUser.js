import React, { Component } from "react";
import moment from 'moment';

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
              <th>StartDatum</th>
              <th>EndDatum</th>
              <th>Name</th>
              <th>Preis</th>
              <th>Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course) => (
              <tr key={course.id}>
                <td>{moment(course.date).format("Do MMM YYYY")} </td>
                <td>{moment(course.endDate).format("Do MMM YYYY")} </td>
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