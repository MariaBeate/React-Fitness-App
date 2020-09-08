import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../Fitnessplan.css";

export default class FitnessplanUser extends Component {
calendarComponentRef = React.createRef();
constructor(props) {
super(props);

this.state = {
    courses: [],
    event: {
      id: "",
      date: "",
      title: "",

      response: {},
    },
    calendarWeekends: true,
    allDay: true,
  };
}

  componentDidMount() {
    fetch("http://localhost:9000/api/courses")
      .then((response) => response.json())
      .then((event) => {
        this.setState({ courses: event });
      });
  }
  
  render() {
    return (
      <div className="fitnessplan">            
        <div className="heading">
        Kursplan
        <div>
        <button onClick={this.toggleWeekends} className="button add mrg" >Ohne Wochenenden</button>&nbsp;
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
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.courses} 
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
} 
