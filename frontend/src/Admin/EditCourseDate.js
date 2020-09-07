import React, { Component } from "react";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

//Hier muss nach dem hinzufügen wieder zur FitnessInfo Seite weitergeleitet werden
export default class EditCourseDate extends Component {
  constructor(props) {
    super(props);

    this.onChangeCourseDate = this.onChangeCourseDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      selectedCourse: "",
      validationError: "",
      courses: [],
      course: {
        date: "",
      },
      
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/courses/" + this.props.match.params.id)
      .then((response) => response.json())
      .then((course) =>
        this.setState({
          courses: course,
        })
      );
 
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

  onChangeCourseDate(e) {
    this.setState({ date: e.target.value });
  }


  onSubmit() {
    //e.preventDefault();
    fetch("http://localhost:9000/api/courses/" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: this.state.date,
        title: this.state.selectedCourse,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });

    console.log("Edited");
    console.log(this.state.selectedCourse);
  }

  //Hier müssen noch Name, Preis und Beschreibung des zu bearbeitenden fitnesss mitgegeben werden, evtl. über value
  render() {
    // console.log(this.state.hallo);
    console.log(this.state.courses);
    return (
      <div className="form">
      <div className="heading">
        Füge einen Kurs hinzu:
      </div>
        <div className="form-group">
        <label htmlFor="date">StartDatum</label>
        {this.state.courses.map((course) => (
          <input
            key={course.id}
            type="date"
            className="form-control"
            id="datum"
            defaultValue={course.date}
            onChange={this.onChangeCourseDate}
            name="date"
          />
        ))}
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


        <Link to="/FitnessPlanAdmin">
          <Button
            className="button add add2"
            variant="danger"
            type="submit"
            onClick={() => this.onSubmit()}
          >
            Update Kurs
          </Button>
        </Link>
      </div>
      
    );
  }
}
