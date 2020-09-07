import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Fitnessplan.css";

export default class FitnessplanAdmin extends Component {
calendarComponentRef = React.createRef();
constructor(props) {
super(props);
this.state = {
    courses: [],
    course: {
      title: "",
      date:"",
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
      .then((course) => {
        this.setState({ courses: course });
      });
  }

  render() {
    const{ courses } = this.state;
    console.log(courses)
    return (
      <div className="fitnessplan">
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
            eventClick={
              function(arg){
                alert(
                  'Alert Title',
                );
              }
            }
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

            
            
 
          />
        </div>
       </div>
    );
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
