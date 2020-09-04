import React, { Component } from "react";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

//Hier muss nach dem hinzufügen wieder zur FitnessInfo Seite weitergeleitet werden
export default class EditCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCourseDate = this.onChangeCourseDate.bind(this);
    this.onChangeCourseEndDate = this.onChangeCourseEndDate.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCoursePrice = this.onChangeCoursePrice.bind(this);
    this.onChangeCourseDescription = this.onChangeCourseDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      courses: [],
      course: {
        date: "",
        endDate:"",
        title: "",
        price: null,
        description: "",
      },
      
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/fitness/" + this.props.match.params.id)
      .then((response) => response.json())
      .then((course) =>
        this.setState({
          courses: course,
        })
      );
  }

  onChangeCourseDate(e) {
    this.setState({ Date: e.target.value });
  }

  onChangeCourseEndDate(e) {
    this.setState({ endDate: e.target.value });
  }
  onChangeCourseName(e) {
    this.setState({ title: e.target.value });
  }

  onChangeCoursePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeCourseDescription(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit() {
    //e.preventDefault();
    fetch("http://localhost:9000/api/fitness/" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date: this.state.Date,
        endDate: this.state.endDate,
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });

    console.log("Edited");
  }

  //Hier müssen noch Name, Preis und Beschreibung des zu bearbeitenden fitnesss mitgegeben werden, evtl. über value
  render() {
    // console.log(this.state.hallo);
    //console.log(this.state.courses);
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
            id="startdatum"
            defaultValue={course.date}
            onChange={this.onChangeCourseDate}
            name="Date"
          />
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">EndDatum</label>
        {this.state.courses.map((course) => (
          <input
            key={course.id}
            type="date"
            className="form-control"
            id="enddatum"
            defaultValue={course.endDate}
            onChange={this.onChangeCourseEndDate}
            name="endDdate"
          />
        ))}
      </div>

        <div className="form-group">
          <label htmlFor="title">Name</label>
          {this.state.courses.map((course) => (
            <input
              key={course.id}
              type="text"
              className="form-control"
              id="title"
              defaultValue={course.title}
              onChange={this.onChangeCourseName}
              name="title"
            />
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="price">Preis</label>
          {this.state.courses.map((course) => (
            <input
              key={course.id}
              type="number"
              min="0"
              step="1"
              className="form-control"
              id="preis"
              defaultValue={course.price}
              onChange={this.onChangeCoursePrice}
              name="price"
            />
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          {this.state.courses.map((course) => (
            <input
              key={course.id}
              type="text"
              className="form-control"
              id="description"
              defaultValue={course.description}
              onChange={this.onChangeCourseDescription}
              name="description"
            />
          ))}
        </div>

        <Link to="/FitnessInfoAdmin">
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
