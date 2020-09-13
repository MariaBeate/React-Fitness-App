import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../assets/css/Fitnessplan.css";

export default class FitnessplanAdmin extends Component {
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = {
      courses: [],
      id: "",
      date: "",
      title: "",

      calendarWeekends: true,
      centered: false,
      allDay: true,
      calendarEvents: [
        // initial event data
        { name: "Event Now", start: new Date() },
      ],
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((events) => {
        this.setState({ courses: events });
      });
  }

  componentDidUpdate(prevState) {
    if (prevState.courses !== this.state.courses) {
      this.loadEvents();
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
    this.toggle();
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
    return (
      <div className="fitnessplan">
        <Modal isOpen={this.state.modal} className="modal" size="xl" centered={true}>
          <ModalHeader className="modal-header">
            <p>Kurs bearbeiten</p>
          </ModalHeader>
          <ModalBody className="modal-body">
            <div>
              <p> Kursname: {this.state.title} </p>
              <p> Datum: {this.state.date} </p>
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

        <div className="heading">
          Kursplan
          <div className="heading sub">
            Klicke auf ein Datum, um einen neuen Kurs hinzuzufügen
          </div>
          <div>
            <button onClick={this.toggleWeekends} className="button add">
              Ohne Wochenenden
            </button>
            &nbsp;
            {/* <button onClick={this.gotoPast}>go to a date in the past</button> */}
          </div>
          <div>
            <Link className="create-link" to={"/AddCourseDate"}>
              <Button className="button add">Add</Button>
            </Link>
          </div>
        </div>

        <div className="fitness-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,listWeek",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // editable={true}  //change length of event by dragging the event down. Change day of event by dragging
            // eventContent={this.renderEventContent}
            // eventDrop={this.handleEventDrop}
            // eventClick={this.handleEventClick}
            // select={this.handleDateSelect}
            //eventClick = {function(calendarEvents, jsEvent, view, resourceObj) {alert(courses.name)}}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            //events={this.state.calendarEvents}
            events={this.state.courses} //Funktioniert theoretisch.
            dateClick={this.handleDateClick}
            onDelete={this.handleDelete}
            eventClick={this.handleEventClick}
            displayEventTime= {false}
            height="parent"
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2020-01-01"); // call a method on the Calendar object
  };

  handleDateClick = (arg) => {
    if (
      window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
    ) {
      this.setState({
        // add new event data
        courses: this.state.courses.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          end: "2020-09-19",
          allDay: arg.allDay,
        }),
      });
    }
  };
}