import React, { Component } from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import FitnessplanAdmin from "./Admin/FitnessplanAdmin";
import FitnessInfoAdmin from "./Admin/FitnessInfoAdmin";
import AddCourse from "./Admin/AddCourse";
import AddCourseDate from "./Admin/AddCourseDate";
import EditCourse from "./Admin/EditCourse";
import EditCourseDate from "./Admin/EditCourseDate";
import ProtectedRouteAdd from "./Admin/Protected_Routes/ProtectedRouteAdd";
import ProtectedRouteAddDate from "./Admin/Protected_Routes/ProtectedRouteAddDate";
import ProtectedRouteEdit from "./Admin/Protected_Routes/ProtectedRouteEdit";
import ProtectedRouteEditDate from "./Admin/Protected_Routes/ProtectedRouteEditDate";
import ProtectedRouteFitness from "./Admin/Protected_Routes/ProtectedRouteFitness";
import ProtectedRouteFitnessplan from "./Admin/Protected_Routes/ProtectedRouteFitnessplan";
import FitnessInfoUser from "./User/FitnessInfoUser";
import FitnessplanUser from "./User/FitnessplanUser";
import SignUp from "./SignUp";
import Login from "./Login";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      isLoggedIn: Boolean,
      en: false, //if true, rendering in english
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLanguageEN(e) {
    this.setState({
      en: true,
    });
    console.log(this.state.en);
  }

  handleLanguageDE(e) {
    this.setState({
      en: false,
    });
    console.log(this.state.en);
  }

  handleLogin() {
    //console.log(this.props.history);
    fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const token = response.token;
        this.setState({
          token: token,
        });
        localStorage.setItem("token", this.state.token);
        if (token != null)
          this.setState({
            isLoggedIn: true,
          });
        // history.push("/FitnessInfoAdmin");
        console.log("Eingeloggt");
      })

      .catch((err) => console.log(err));
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });
    console.log("Ausgeloggt");
  }
  //ToDO: /EditEssen muss eine protected Route sein  (so wie bei AddEssen) sonst, kann jeder (auch nicht eingeloggte User)
  //über die URL Essen ändern. Problem "props" werden nicht richtig übergeben
  render() {
    return (
      <Router>
        <div>
          <Header
            handleLanguageEN={this.handleLanguageEN.bind(this)}
            handleLanguageDE={this.handleLanguageDE.bind(this)}
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout.bind(this)}
          />
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                <Home en={this.state.en} />
              </Route>

              <ProtectedRouteFitnessplan
                path="/FitnessplanAdmin"
                en={this.state.en}
              >
                <FitnessplanAdmin />
              </ProtectedRouteFitnessplan>

              <Route path="/Fitnessplan">
                <FitnessplanUser en={this.state.en} />
              </Route>

              <ProtectedRouteAddDate path="/AddCourseDate" en={this.state.en}>
                <AddCourseDate />
              </ProtectedRouteAddDate>

              <ProtectedRouteEditDate
                path="/EditCourseDate/:id"
                en={this.state.en}
                render={(props) => <EditCourseDate {...props} />}
              />

              <ProtectedRouteFitness
                path="/FitnessInfoAdmin"
                en={this.state.en}
              >
                <FitnessInfoAdmin />
              </ProtectedRouteFitness>

              <Route path="/FitnessInfo">
                <FitnessInfoUser en={this.state.en} />
              </Route>
              <ProtectedRouteAdd path="/AddCourse">
                <AddCourse />
              </ProtectedRouteAdd>
              <ProtectedRouteEdit
                path="/EditCourse/:id"
                render={(props) => <EditCourse {...props} />}
              />
              <Route path="/SignUp">
                <SignUp en={this.state.en} />
              </Route>
              <Route path="/Login">
                <Login
                  handleLogin={this.handleLogin.bind(this)}
                  handleLogout={this.handleLogout.bind(this)}
                  onChangeUsername={this.onChangeUsername.bind(this)}
                  onChangePassword={this.onChangePassword.bind(this)}
                  isLoggedIn={this.state.isLoggedIn}
                  en={this.state.en}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
