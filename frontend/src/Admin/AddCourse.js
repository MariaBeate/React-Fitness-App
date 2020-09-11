import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course: {
        id: null,
        title: "",
        price: "",
        description: "",
        submitted: false,
      },
    };
  }

  componentDidMount() {}
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
    fetch("http://localhost:9000/api/addCourse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        <div className="heading">Füge einen Kurs hinzu:</div>
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
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
            onChange={this.onChangePrice}
            name="price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Beschreibung</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
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
