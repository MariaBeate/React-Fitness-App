import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import  Modal  from 'react-bootstrap/Modal';
//import ModalHeader from 'react-bootstrap/ModalHeader';
//import ModalBody from 'react-bootstrap/ModalBody';
//import ModalFooter from 'react-bootstrap/ModalFooter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../Fitnessplan.css";

export default class FitnessplanAdmin extends Component {
calendarComponentRef = React.createRef();
constructor(props) {
super(props);
this._deleteCourse = this._deleteCourse.bind(this);

this.state = {
    courses: [],
    event: {
      id: "",
      title: "",
      date:"",

      response: {},
    },
    calendarWeekends: true,
    allDay: true,
    calendarEvents: [
      // initial event data
      { name: "Event Now", start: new Date() },
    ],
  };
}

  componentDidMount() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((event) => {
        this.setState({ courses: event });
      });
  }

  _deleteCourse(id) {
    const { courses } = this.state;
    fetch("http://localhost:9000/api/courses/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.setState({
          courses: courses.filter((event) => event.id !== id),
        });
        return;
      })
      .catch((error) => {
        throw error;
      });
    //    fitness.preventDefault();

    console.log("Deleted");
  }


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  
  handleEventClick = ({ event, el }) => {
    this.toggle();
    this.setState({ event });
  };
  

  render() {
    return (
      <div className="fitnessplan">
        <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="modal"
            >
              <ModalHeader toggle={this.toggle}>
                
                <p> Kursname: {this.state.event.title} </p>
              </ModalHeader>
              <ModalBody>
                <div>
                 <p> Datum: {this.state.event.date} </p>
                 <p> ID: {this.state.event.id} </p>
                </div>
              </ModalBody>
              <ModalFooter>
              <Link className="edit-link" to={"/EditCourseDate/" + this.state.event.id}>
                    <Button className="button edit">Edit</Button>
              </Link>
              <Button className="button delete" variant="danger" onClick={() => this._deleteCourse(this.state.event.id)}>
                    Delete
                  </Button>
                <Button color="secondary" onClick={this.toggle}>
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
        <button onClick={this.toggleWeekends} className="button add" >Ohne Wochenenden</button>&nbsp;
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
            events={this.state.courses}    //Funktioniert theoretisch. 
            dateClick={this.handleDateClick}
            onDelete={this.handleDelete}
            eventClick = {this.handleEventClick}
            height='parent'
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
 /*  handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
    };*/
} 

 // handleEventClick = (info) => {
  //   alert('Event: ' + info.event.name);
  // }

  // handleDateClick = (selectInfo) => {
  //   let name = prompt('Please enter a new name for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   //calendarApi.unselect() // clear date selection

  //   if (name) {
  //     calendarApi.addEvent({
  //       id:"",
  //       name,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     })
  //   }
  // }

  // renderEventContent(eventInfo) {
  //   return (
  //     <>
  //       <b>{"hey"}</b>
  //       <i>{"hu"}</i>
  //     </>
  //   )
  // }