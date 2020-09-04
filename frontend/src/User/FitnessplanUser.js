import React, { Component } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import "../Fitnessplan.css";

export default class FitnessplanAdmin extends Component {
//   calendarComponentRef = React.createRef();
//   state = {
//     courses: [],
//     calendarWeekends: true,
//     calendarEvents: [
//       // initial event data
//       { name: "Event Now", start: new Date() },
//     ],
//   };

//   componentDidMount() {
//     fetch("http://localhost:9000/api/fitness")
//       .then((response) => response.json())
//       .then((course) => {
//         this.setState({ courses: course });
//       });
//   }

//   render() {
//     const{ courses } = this.state;
//     console.log(courses)
//     return (
//       <div className="fitnessplan">
//       <div className="heading">
//       Kursplan
//       </div>
//         <div className="fitness-calendar">
//         <FullCalendar
//           defaultView="timeGridWeek"
//           header={{
//             left: "prev,next today",
//             center: "name",
//             right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
//           }}
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           editable={true}  //change length of event by dragging the event down. Change day of event by dragging
//           eventContent={this.renderEventContent}
//           eventDrop={this.handleEventDrop}
//           eventClick={this.handleEventClick}
//           select={this.handleDateSelect}
//           //eventClick = {function(calendarEvents, jsEvent, view, resourceObj) {alert(courses.name)}}
//           ref={this.calendarComponentRef}
//           weekends={this.state.calendarWeekends}
//           //events={this.state.calendarEvents}
//           events={courses}    //Funktioniert theoretisch. 
//           dateClick={this.handleDateClick}
          

//         />
//       </div>
//      </div>
//   );
// }

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

// toggleWeekends = () => {
//   this.setState({
//     // update a property
//     calendarWeekends: !this.state.calendarWeekends,
//   });
// };

// gotoPast = () => {
//   let calendarApi = this.calendarComponentRef.current.getApi();
//   calendarApi.gotoDate("2020-01-01"); // call a method on the Calendar object
// };

// /* handleDateClick = (arg) => {
//   if (
//     window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
//   ) {
//     this.setState({
//       // add new event data
//       calendarEvents: this.state.calendarEvents.concat({
//         // creates a new array
//         name: "New Event",
//         start: arg.date,
//         allDay: arg.allDay,
//       }),
//     });
//   }
// }; */
}