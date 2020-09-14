import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class FitnessInfoAdmin extends Component {
  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = {
      courses: [],
      en: this.props.en,

      //response: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/fitness")
      .then((response) => response.json())
      .then((courses) => {
        this.setState({ courses: courses });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
  }

  deleteCourse(id) {
    const { courses } = this.state;
    fetch("http://localhost:9000/api/fitness/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.setState({
          courses: courses.filter((course) => course.id !== id),
        });
        return;
      })
      .catch((error) => {
        throw error;
      });

    console.log("Deleted");
  }

  render() {
    if (!this.state.en) {
      return (
        <div>
          <div className="heading">
            Kurse
            <div className="heading sub">
              Um einen neuen Kurs hinzuzufügen, klicke hier:
            </div>
            <div>
              <Link className="create-link" to={"/AddCourse"}>
                <Button className="button add">Kurs hinzufügen</Button>
              </Link>
            </div>
          </div>
          <table id="info">
            <thead>
              <tr>
                <th>Name</th>
                <th>Preis</th>
                <th>Beschreibung</th>
                <th colSpan="2">Bearbeiten</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title} </td>
                  <td>{course.price} € </td>
                  <td> {course.description}</td>
                  <td>
                    <div className="last-column">
                      <Button
                        className="button delete"
                        variant="danger"
                        onClick={() => this.deleteCourse(course.id)}
                      >
                        Löschen
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="last-column">
                      <Link
                        className="edit-link"
                        to={{
                          pathname: "/EditCourse/" + course.id,
                          state: {
                            name: course.title,
                            price: course.price,
                            description: course.description,
                          },
                        }}
                      >
                        <Button className="button edit">Bearbeiten</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <div className="heading">
            Courses
            <div className="heading sub">Click here to add a new course:</div>
            <div>
              <Link className="create-link" to={"/AddCourse"}>
                <Button className="button add">Add Course</Button>
              </Link>
            </div>
          </div>
          <table id="info">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th colSpan="2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title} </td>
                  <td>{course.price} € </td>
                  <td> {course.description}</td>
                  <td>
                    <div className="last-column">
                      <Button
                        className="button delete"
                        variant="danger"
                        onClick={() => this.deleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="last-column">
                      <Link
                        className="edit-link"
                        to={{
                          pathname: "/EditCourse/" + course.id,
                          state: {
                            name: course.title,
                            price: course.price,
                            description: course.description,
                          },
                        }}
                      >
                        <Button className="button edit">Edit</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
