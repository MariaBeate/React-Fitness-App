import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
        title: "",
      },
      en: this.props.en,
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
          return { value: course.title, display: course.title };
        });
        if (!this.state.en) {
          this.setState({
            courses: [{ title: "", display: "Wähle einen Kurs" }].concat(
              coursesFromApi
            ),
          });
        } else {
          this.setState({
            courses: [{ title: "", display: "Select a course" }].concat(
              coursesFromApi
            ),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
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

  render() {
    console.log(this.state.courses);
    if (!this.state.en) {
      return (
        <div className="form">
          <div className="heading">Kurs bearbeiten:</div>
          <div className="form-group">
            <label htmlFor="date">Datum</label>
            <input
              type="date"
              className="form-control"
              id="datum"
              defaultValue={this.props.location.state.date}
              onChange={this.onChangeCourseDate}
              name="date"
            />
          </div>
          <div>
            <select
              className="selectField"
              //value={this.state.selectedCourse}
              defaultValue={this.props.location.state.name}
              onChange={(e) =>
                this.setState({
                  selectedCourse: e.target.value,
                  validationError:
                    e.target.value === "" ? "Wähle einen Kurs aus" : "",
                })
              }
            >
              {this.state.courses.map((course, index) => (
                <option key={index} value={course.title}>
                  {course.display}
                </option>
              ))}
            </select>
            <div style={{ color: "red", marginTop: "5px" }}>
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
              Bearbeiten
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="heading">Edit Course:</div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="datum"
              defaultValue={this.props.location.state.date}
              onChange={this.onChangeCourseDate}
              name="date"
            />
          </div>
          <div>
            <select
              className="selectField"
              //value={this.state.selectedCourse}
              defaultValue={this.props.location.state.name}
              onChange={(e) =>
                this.setState({
                  selectedCourse: e.target.value,
                  validationError:
                    e.target.value === "" ? "Select a course" : "",
                })
              }
            >
              {this.state.courses.map((course, index) => (
                <option key={index} value={course.title}>
                  {course.display}
                </option>
              ))}
            </select>
            <div style={{ color: "red", marginTop: "5px" }}>
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
              Edit
            </Button>
          </Link>
        </div>
      );
    }
  }
}
