import React, { Component } from "react";
//import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

//Hier muss nach dem hinzufügen wieder zur FitnessInfo Seite weitergeleitet werden
export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      course: {
        date: "",
        endDate:"",
        id: null,
        title: "",
        price: "",
        description: "",
        submitted: false,
      },
    };
  }

  componentDidMount() {}
  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }
  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  handleSubmit() {
    //fitness.preventDefault();
    fetch("http://localhost:9000/api/addCourse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // date: this.state.date,
        date: this.state.date,
        endDate: this.state.endDate,
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        submitted: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="form">
      <div className="heading">
        Füge einen Kurs hinzu:
      </div>
          <div className="form-group">
          <label htmlFor="date">StartDatum</label>
          <input
            type="date"
            className="form-control"
            id="startdatum"
            required
            //value={this.state.name}
            onChange={this.onChangeDate}
            name="date"
          />
        </div>

          <div className="form-group">
          <label htmlFor="endDate">EndDatum</label>
          <input
            type="date"
            className="form-control"
            id="enddatum"
            required
            //value={this.state.name}
            onChange={this.onChangeEndDate}
            name="endDate"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            //value={this.state.name}
            onChange={this.onChangeName}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preis</label>
          <input
            type="number"
            className="form-control"
            id="preis"
            required
            // value={this.state.price}
            onChange={this.onChangePrice}
            name="price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            // value={this.state.description}
            onChange={this.onChangeDescription}
            name="description"
          />
        </div>

        <Link to="/FitnessInfoAdmin">
          <button onClick={this.handleSubmit} className="button add add2">
            Submit
          </button>
        </Link>
      </div>
    );
  }
}
