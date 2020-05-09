import React, { Component } from "react";
import "./login.css";
import Logo from "./paper-notes.png";
import { Link, Redirect } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
} from "mdbreact";
import Axios from "axios";
import * as CONSTANTS from "../Constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      user: {
        email: "",
        password: "",
      },
    };
  }
  axios = require("axios").default;

  credentialsRender() {
    if (this.state.auth.login === false) {
      return (
        <div>
          <h5 style={{ color: "red" }}>⚠ Incorrect email or password!</h5>
        </div>
      );
    }
  }

  render() {
    const { user } = this.state;
    if (this.state.auth.login === true) {
      //route to dashboard
      return (
        <Redirect
          to={{
            pathname: "/home",
            state: { useremail: this.state.user.email },
          }}
        />
      );
    }
    return (
      <div className="bg">
        <MDBRow>
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
            <MDBCard style={{ marginTop: "25%" }}>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>
                      <img src={Logo} alt="" width="10%" height="50%"></img>
                      Note App
                    </strong>
                  </h3>
                </div>

                <MDBInput
                  label="Email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onChange={(i) =>
                    this.setState({ user: { ...user, email: i.target.value } })
                  }
                />
                <MDBInput
                  label="Password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  onChange={(i) =>
                    this.setState({
                      user: { ...user, password: i.target.value },
                    })
                  }
                />

                <div className="text-center pt-3 mb-3">
                  <MDBBtn
                    type="button"
                    color="deep-orange"
                    style={{ borderRadius: "50px" }}
                    onClick={this.login}
                  >
                    Log in
                  </MDBBtn>
                  {this.credentialsRender()}
                </div>
              </MDBCardBody>

              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <div
                  className="grey-text d-flex justify-content-end"
                  style={{ fontSize: "0.8rem" }}
                >
                  Not a member?
                  <Link to="/signup" className="blue-text ml-1">
                    {" "}
                    Sign Up{" "}
                  </Link>
                </div>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }

  login = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    const { user } = this.state;
    await Axios.get(
      `${url}:8080/login?email=${user.email}&password=${user.password}`
    )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ auth: res });
      });
    console.log(this.state.auth.login);
  };
}
export default Login;
