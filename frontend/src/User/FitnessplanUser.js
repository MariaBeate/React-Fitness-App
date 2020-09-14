import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../assets/css/Fitnessplan.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

function searchingFor(search) {
  return function (x) {
    return x.title.toLowerCase().includes(search.toLowerCase()) || !search;
  }
}

export default class FitnessplanUser extends Component {
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      search: "",
      event: {
        id: "",
        date: "",
        title: "",
        showModal1: false,
        response: {},
      },
      calendarWeekends: true,
      allDay: true,
      en: false,
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event) {
    this.setState({ search: event.target.value })
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((event) => {
        this.setState({ courses: event });
      });
  }

  render() {
    const { search, courses } = this.state;
    console.log(this.props.en)
    if (!this.props.en) {
      return (
        <div className="fitnessplan">
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
                    </tr>
                  </thead>
                  <tbody>
                    {courses.filter(searchingFor(search)).map((course) => (
                      <tr key={course.id}>
                        <td>{course.title} </td>
                        <td>{moment(course.date).format("Do MMM YYYY")} </td>
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
          </div>
          <div>
              <button
                className="button add"
                onClick={() => this.setState({ showModal1: true })}
              >
                Kurs suchen
              </button>
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
              eventRender={this.customEventRender}
            />
          </div>

        </div>
      );
    } else {
      return (
        <div className="fitnessplan">
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
                    </tr>
                  </thead>
                  <tbody>
                    {courses.filter(searchingFor(search)).map((course) => (
                      <tr key={course.id}>
                        <td>{course.title} </td>
                        <td>{moment(course.date).format("Do MMM YYYY")} </td>
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
          </div>
          <div>
              <button
                className="button add"
                onClick={() => this.setState({ showModal1: true })}
              >
                Search for a course
              </button>
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
              eventRender={this.customEventRender}
            />
          </div>

        </div>
      );
    }
  }

  customEventRender = info => {
    // return info.el
    info.el.event = "custom-event-container fc-day-grid-event fc-h-event fc-event fc-start fc-end"
    // edit the child's class
    //info.el.children[0].className = "custom-event-container fc-content"
    return info.el
  };

}
