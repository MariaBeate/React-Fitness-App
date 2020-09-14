import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../assets/css/Fitnessplan.css";

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
          <div className="heading">
            Kursplan
          <div>
              <button onClick={this.toggleWeekends} className="button add mrg">
                Ohne Wochenenden
            </button>
            &nbsp;
          </div>
            <div className="searchFilter">
              <form>
                <input type="text"
                  onChange={this.searchHandler}
                  value={search}
                  placeholder="Kurs suchen"
                />
              </form>
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
              eventRender={this.customEventRender}
            />

            <tbody>
              {courses.filter(searchingFor(search)).map((event) => (
                <tr key={event.id}>
                  <td>{event.title} </td>
                  <td>{event.date} </td>
                </tr>
              ))}
            </tbody>
          </div>

        </div>
      );
    } else {
      return (
        <div className="fitnessplan">
          <div className="heading">
            Course Table
          <div>
              <button onClick={this.toggleWeekends} className="button add mrg">
                Without Weekends
            </button>
            &nbsp;
          </div>
            <div className="searchFilter">
              <form>
                <input type="text"
                  onChange={this.searchHandler}
                  value={search}
                  placeholder="Search Course"
                />
              </form>
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
              eventRender={this.customEventRender}
            />

            <tbody>
              {courses.filter(searchingFor(search)).map((event) => (
                <tr key={event.id}>
                  <td>{event.title} </td>
                  <td>{event.date} </td>
                </tr>
              ))}
            </tbody>
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

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };
}
