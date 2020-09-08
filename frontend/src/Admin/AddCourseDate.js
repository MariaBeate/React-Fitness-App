import React, { Component } from "react";
//import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

//Hier muss nach dem hinzufügen wieder zur FitnessInfo Seite weitergeleitet werden
export default class AddCourseDate extends Component {
  constructor(props) {
    super(props);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      courses: [],
      selectedCourse: "",
      validationError: "",
      course: {
        date: "",
        title: "",
        submitted: false,
      },
    };
  }
  componentDidMount() {
    fetch("http://localhost:9000/api/fitness/")
      .then((response) => response.json())
      .then((data) => {
        let coursesFromApi = data.map((course) => {
          return {value: course.title, display: course.title}
        });
        this.setState({
          courses: [{title: '', display: 'Wähle einen Kurs'}].concat(coursesFromApi)
        });
      }).catch(error => {
        console.log(error);
      });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }
  
  handleSubmit() {
    fetch("http://localhost:9000/api/addCourseDate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: this.state.date,
        title: this.state.selectedCourse,
        submitted: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="form">
      <div className="heading">
        Füge einen Kurs hinzu:
      </div>
          <div className="form-group">
          <label htmlFor="date">StartDatum</label>
          <input
            type="date"
            className="form-control"
            id="startdatum"
            required
            //value={this.state.name}
            onChange={this.onChangeDate}
            name="date"
          />
        </div>
        <div>
        <select className ='selectField'
        value={this.state.selectedCourse}
        onChange={e => this.setState({selectedCourse: e.target.value, validationError: e.target.value === "" ? "Wähle einen Kurs aus" : ""})}
        >
        {this.state.courses.map((course, index) => 
        <option 
        key={index} value={course.title}>
          {course.display}
        </option>)}
        </select>
      <div style={{color: 'red', marginTop: '5px'}}>
      {this.state.validationError}
     </div>
     </div>

        <Link to="/FitnessplanAdmin">
          <button onClick={this.handleSubmit} className="button add add2">
            Submit
          </button>
        </Link>
      </div>
    );
  }
}
