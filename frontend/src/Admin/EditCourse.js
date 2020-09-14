import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCoursePrice = this.onChangeCoursePrice.bind(this);
    this.onChangeCourseDescription = this.onChangeCourseDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      courses: [],
      title: "",
      price: null,
      description: "",
      en: this.props.en,
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.name,
      price: this.props.location.state.price,
      description: this.props.location.state.description,
    });
    fetch("http://localhost:9000/api/fitness/" + this.props.match.params.id)
      .then((response) => response.json())
      .then((course) =>
        this.setState({
          courses: course,
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.en !== this.props.en) {
      this.setState({ en: this.props.en });
    }
  }

  onChangeCourseName(e) {
    this.setState({ title: e.target.value });
  }

  onChangeCoursePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeCourseDescription(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit() {
    fetch("http://localhost:9000/api/fitness/" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });

    console.log("Edited");
  }

  render() {
    if (!this.state.en) {
      return (
        <div className="form">
          <div className="heading">Kurs bearbeiten:</div>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={this.state.title}
              onChange={this.onChangeCourseName}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Preis</label>
            <input
              type="number"
              min="0"
              step="1"
              className="form-control"
              id="preis"
              defaultValue={this.state.price}
              onChange={this.onChangeCoursePrice}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beschreibung</label>
            <input
              type="text"
              className="form-control"
              id="description"
              defaultValue={this.state.description}
              onChange={this.onChangeCourseDescription}
              name="description"
            />
          </div>

          <Link to="/FitnessInfoAdmin">
            <Button
              className="button add add2"
              variant="danger"
              type="submit"
              onClick={() => this.onSubmit()}
            >
              Bearbeiten
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="heading">Edit a course:</div>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={this.state.title}
              onChange={this.onChangeCourseName}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min="0"
              step="1"
              className="form-control"
              id="preis"
              defaultValue={this.state.price}
              onChange={this.onChangeCoursePrice}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              defaultValue={this.state.description}
              onChange={this.onChangeCourseDescription}
              name="description"
            />
          </div>

          <Link to="/FitnessInfoAdmin">
            <Button
              className="button add add2"
              variant="danger"
              type="submit"
              onClick={() => this.onSubmit()}
            >
              Edit
            </Button>
          </Link>
        </div>
      );
    }
  }
}
