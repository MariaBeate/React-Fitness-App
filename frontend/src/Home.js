import React, { Component } from "react";

class Home extends Component {
  state = {
    courses: [],
    selectedCourse: "",
    validationError: "",
  };

  componentDidMount() {
    fetch("http://localhost:9000/api/fitness/")
      .then((response) => response.json())
      .then((data) => {
        let coursesFromApi = data.map((course) => {
          return {value: course.title, display: course.title}
        });
        this.setState({
          courses: [{title: '', display: 'Wähle einen Kurs'}].concat(coursesFromApi)
        });
      }).catch(error => {
        console.log(error);
      });
  }

  

  render() {
    return (
      <div>
        <select
        value={this.state.selectedCourse}
        onChange={e => this.setState({selectedCourse: e.target.value, validationError: e.target.value === "" ? "Wähle einen Kurs aus" : ""})}
        >
        {this.state.courses.map((course, index) => 
        <option 
        key={index} value={course.title}>
          {course.display}
        </option>)}
        </select>
      <div style={{color: 'red', marginTop: '5px'}}>
      {this.state.validationError}
     </div>
     </div>
    ); 
  }
}

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div className="form">
//         <div className="heading">
//         Willkommen bei FitMo
//         <div className="heading sub">
//         Finde jetzt deinen Fitnesskurs
//         </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Home;
