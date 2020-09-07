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
import ProtectedRouteAdd from "./Admin/ProtectedRouteAdd";
import ProtectedRouteAddDate from "./Admin/ProtectedRouteAddDate";
import ProtectedRouteEdit from "./Admin/ProtectedRouteEdit";
import ProtectedRouteFitness from "./Admin/ProtectedRouteFitness";
import ProtectedRouteFitnessplan from "./Admin/ProtectedRouteFitnessplan";
import FitnessInfoUser from "./User/FitnessInfoUser";
import FitnessplanUser from "./User/FitnessplanUser"
import SignUp from "./SignUp";
import LoginTest from "./LoginTest";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      isLoggedIn: Boolean,
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
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout.bind(this)}
          />
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <ProtectedRouteFitnessplan path="/FitnessplanAdmin">
                <FitnessplanAdmin />
              </ProtectedRouteFitnessplan>
              <Route exact path="/Fitnessplan">
                <FitnessplanUser />
              </Route>
              <ProtectedRouteFitness path="/FitnessInfoAdmin">
                <FitnessInfoAdmin />
              </ProtectedRouteFitness>
              <Route exact path="/FitnessInfo">
                <FitnessInfoUser />
              </Route>
              <ProtectedRouteAdd path="/AddCourse">
                <AddCourse />
              </ProtectedRouteAdd>
              <ProtectedRouteAddDate path="/AddCourseDate">
                <AddCourseDate />
              </ProtectedRouteAddDate>
              <Route path="/SignUp">
                <SignUp />
              </Route>
              <Route path="/LoginTest">
                <LoginTest
                  handleLogin={this.handleLogin.bind(this)}
                  handleLogout={this.handleLogout.bind(this)}
                  onChangeUsername={this.onChangeUsername.bind(this)}
                  onChangePassword={this.onChangePassword.bind(this)}
                  isLoggedIn={this.state.isLoggedIn}
                />
              </Route>
              <ProtectedRouteEdit
                path="/EditCourse/:id"
                render={(props) => <EditCourse {...props} />}
              />
              <ProtectedRouteEdit />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
//export default withRouter(App);
