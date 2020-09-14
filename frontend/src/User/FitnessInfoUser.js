import React, { Component } from "react";

function searchingFor(search) {
  return function (x) {
    return x.title.toLowerCase().includes(search.toLowerCase()) || x.description.toLowerCase().includes(search.toLowerCase()) || !search;
  }
}

export default class FitnessInfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      search: "",
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event) {
    this.setState({ search: event.target.value })
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/fitness")
      .then((response) => response.json())
      .then((course) => {
        this.setState({ courses: course });
      });
  }

  render() {
    //this.state.en = this.props.en
    const { search, courses } = this.state;
    console.log(this.props.en)
    if (!this.props.en) {
      if (!this.props.route) {
        return (
          <div>
            <div className="heading">
              Kursplan
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
            <table id="info">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Preis</th>
                  <th>Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                {courses.filter(searchingFor(search)).map((course) => (
                  <tr key={course.id}>
                    <td>{course.title} </td>
                    <td>{course.price}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      else {
        return (
          <div>
            <div className="heading">
              Kursplan
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

            <table id="info">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Preis</th>
                  <th>Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                {courses.filter(searchingFor(search)).map((course) => (
                  <tr key={course.id}>
                    <td>{course.title} </td>
                    <td>{course.price}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    else {
      if (!this.props.route) {
        return (
          <div>
            <div className="heading">
              Course Table
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
            <table id="info">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {courses.filter(searchingFor(search)).map((course) => (
                  <tr key={course.id}>
                    <td>{course.title} </td>
                    <td>{course.price}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      else {
        return (
          <div>
            <div className="heading">
              Course Table
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

            <table id="info">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {courses.filter(searchingFor(search)).map((course) => (
                  <tr key={course.id}>
                    <td>{course.title} </td>
                    <td>{course.price}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
  }
}