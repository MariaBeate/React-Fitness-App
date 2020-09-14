import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../assets/css/Fitnessplan.css";
import moment from "moment";

function searchingFor(search) {
  return function (x) {
    return x.title.toLowerCase().includes(search.toLowerCase()) || !search;
  };
}

export default class FitnessplanAdmin extends Component {
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = {
      courses: [],
      show: null,
      search: "",
      id: "",
      date: "",
      title: "",
      showModal1: false,
      en: this.props.en,

      calendarWeekends: true,
      centered: false,
      allDay: true,
      calendarEvents: [
        // initial event data
        { name: "Event Now", start: new Date() },
      ],
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((event) => {
        this.setState({ courses: event });
      });
    this.setState({ en: this.props.en });
  }

  loadEvents() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((events) => {
        this.setState({ courses: events });
      });
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.courses !== this.state.courses) {
      this.loadEvents();
    }
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
  }

  deleteCourse(id) {
    fetch("http://localhost:9000/api/courses/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.setState({
          courses: this.state.courses.filter((event) => event.id !== id),
        });
        return;
      })
      .catch((error) => {
        throw error;
      });
    //this.loadEvents();
    console.log("Deleted");
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleEventClick = ({ event }) => {
    this.toggle();
    const date = event.start.toISOString().substr(0, 10);
    this.setState({ date: date, title: event.title, id: event.id });
  };

  render() {
    const { search, courses } = this.state;
    if (!this.state.en) {
      return (
        <div className="fitnessplan">
          <Modal
            isOpen={this.state.modal}
            className="modal"
            size="xl"
            centered={true}
          >
            <ModalHeader className="modal-header">
              <p>Kurs bearbeiten</p>
            </ModalHeader>
            <ModalBody className="modal-body">
              <div>
                <p> Kursname: {this.state.title} </p>
                <p> Datum: {moment(this.state.date).format("Do MMM YYYY")} </p>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <Link
                className="edit-link"
                to={{
                  pathname: "/EditCourseDate/" + this.state.id,
                  state: {
                    //date: this.state.event.date,
                    // name: this.state.event.title,
                  },
                }}
              >
                <Button className="button edit mrg">Bearbeiten</Button>
              </Link>
              <Button
                className="button delete mrg"
                variant="danger"
                onClick={() => this.deleteCourse(this.state.id)}
              >
                Löschen
              </Button>
              <Button className="button cancel mrg" onClick={this.toggle}>
                Schließen
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.showModal1}
            className="mondal"
            size="l"
            centered={true}
          >
            <ModalHeader className="modal-header">
              <p>Kurs suchen</p>
              <div className="searchFilter">
                <form>
                  <input
                    type="text"
                    className="search"
                    onChange={this.searchHandler}
                    value={search}
                    placeholder="suche..."
                  />
                </form>
              </div>
            </ModalHeader>
            <ModalBody className="modal-body">
              <div className="pane">
                <table id="info">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Datum</th>
                      <th colSpan="2">Bearbeiten</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.filter(searchingFor(search)).map((course) => (
                      <tr key={course.id}>
                        <td>{course.title} </td>
                        <td>{moment(course.date).format("Do MMM YYYY")} </td>
                        <td>
                        <Button
                        className="button delete"
                        variant="danger"
                        onClick={() => this.deleteCourse(course.id)}
                      >
                        Löschen
                      </Button>
                    </td>
                    <td>
                    <Link
                className="edit-link"
                to={{
                  pathname: "/EditCourseDate/" + this.state.id,
                  state: {
                    //date: this.state.event.date,
                    // name: this.state.event.title,
                  },
                }}
              >
                <Button className="button edit">Bearbeiten</Button>
              </Link>
                    </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <button
                className="button add mrg"
                onClick={() => this.setState({ showModal1: false })}
              >
                Schließen
              </button>
            </ModalFooter>
          </Modal>

          <div className="heading">
            Kursplan
            <div className="heading sub">
              Klicke zum Bearbeiten auf einen Kurs
            </div>
            <div>
              <Link className="create-link" to={"/AddCourseDate"}>
                <Button className="button add">Kurs hinzufügen</Button>
              </Link>
            </div>
            <div>
              <button
                className="button add"
                onClick={() => this.setState({ showModal1: true })}
              >
                nach Kurs suchen
              </button>
            </div>
          </div>

          <div className="fitness-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek",
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.courses}
              dateClick={this.handleDateClick}
              onDelete={this.handleDelete}
              eventClick={this.handleEventClick}
              displayEventTime={false}
              height="parent"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="fitnessplan">
          <Modal
            isOpen={this.state.modal}
            className="modal"
            size="xl"
            centered={true}
          >
            <ModalHeader className="modal-header">
              <p>Edit course</p>
            </ModalHeader>
            <ModalBody className="modal-body">
              <div>
                <p> Course name: {this.state.title} </p>
                <p> Date: {moment(this.state.date).format("Do MMM YYYY")} </p>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <Link
                className="edit-link"
                to={{
                  pathname: "/EditCourseDate/" + this.state.id,
                  state: {
                    //date: this.state.event.date,
                    // name: this.state.event.title,
                  },
                }}
              >
                <Button className="button edit mrg">Edit</Button>
              </Link>
              <Button
                className="button delete mrg"
                variant="danger"
                onClick={() => this.deleteCourse(this.state.id)}
              >
                Delete
              </Button>
              <Button className="button cancel mrg" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.showModal1}
            className="mondal"
            size="l"
            centered={true}
          >
            <ModalHeader className="modal-header">
              <p>Search for a course</p>
              <div className="searchFilter">
                <form>
                  <input
                    type="text"
                    className="search"
                    onChange={this.searchHandler}
                    value={search}
                    placeholder="search..."
                  />
                </form>
              </div>
            </ModalHeader>
            <ModalBody className="modal-body">
              <div className="pane">
                <table id="info">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th colSpan="2">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.filter(searchingFor(search)).map((course) => (
                      <tr key={course.id}>
                        <td>{course.title} </td>
                        <td>{moment(course.date).format("Do MMM YYYY")} </td>
                        <td>
                        <Button
                        className="button delete"
                        variant="danger"
                        onClick={() => this.deleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                    <Link
                className="edit-link"
                to={{
                  pathname: "/EditCourseDate/" + this.state.id,
                  state: {
                    //date: this.state.event.date,
                    // name: this.state.event.title,
                  },
                }}
              >
                <Button className="button edit">Edit</Button>
              </Link>
                    </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <button
                className="button add mrg"
                onClick={() => this.setState({ showModal1: false })}
              >
                Close
              </button>
            </ModalFooter>
          </Modal>

          <div className="heading">
            Course schedule
            <div className="heading sub">
              Click on a course for editing
            </div>
            <div>
              <Link className="create-link" to={"/AddCourseDate"}>
                <Button className="button add">Add a course</Button>
              </Link>
            </div>
            <div>
              <button
                className="button add"
                onClick={() => this.setState({ showModal1: true })}
              >
                Search for a course
              </button>
            </div>
          </div>

          <div className="fitness-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek",
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.courses}
              onDelete={this.handleDelete}
              eventClick={this.handleEventClick}
              displayEventTime={false}
              height="parent"
            />
          </div>
        </div>
      );
    }
  }
}
