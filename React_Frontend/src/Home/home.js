import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import CoverImg from "./paper-notes.png";
import "./home.css";
import NavBar from "../Components/navigationbar";
import { Button } from "react-bootstrap";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBCardHeader,
  MDBCarousel,
} from "mdbreact";
import * as CONSTANTS from "../Constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      showSubscribed: false,
      showCreatedByYou: false,
      showAllNotes: false,
      viewNote: false,
      subscribeNote: false,
      unsubscribeNote: false,
      addNote: false,
      id: "",
      title: "",
      topic: "",
      content: [],
      subscribed: [],
      subscribedNotes: [],
      createdByYou: [],
    };
  }
  axios = require("axios").default;

  componentDidMount = async (_) => {
    await this.getNotes();
    await this.getSubscribed();
    await this.getSubscribedNotes();
    await this.getUserName();
    await this.getUserNotes();
  };

  getUserName = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(
        `${url}:8080//user/findByEmail?email=${this.props.location.state.useremail}`
      )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ user: res });
      })
      .catch((err) => console.error(err));
    console.log(this.state.user.userName);
  };

  getUserNotes = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(
        `${url}:8080/noteByUser?username=${this.state.user.userName}`
      )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ createdByYou: res });
      })
      .catch((err) => console.error(err));
    console.log(this.state.createdByYou);
  };

  getSubscribed = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(
        `${url}:8080/getSubscriptions?email=${this.props.location.state.useremail}`
      )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ subscribed: res });
      })
      .catch((err) => console.error(err));
    console.log(this.state.subscribed);
  };

  getSubscribedNotes = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    for (let i = 0; i < this.state.subscribed.length; i++) {
      axios
        .get(
          `${url}:8080/noteByTopic?topic=${this.state.subscribed[i]}`
        )
        .then((res) => res.data)
        .then((res) =>
          res.forEach((e) => {
            this.state.subscribedNotes.push(e);
          })
        )
        .catch((err) => console.error(err));
      console.log(this.state.subscribedNotes);
    }
  };

  getNotes = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(`${url}:8080/notes`)
      .then((res) => res.data)
      .then((res) => {
        this.setState({ content: res });
      })
      .catch((err) => console.error(err));
    console.log(this.state.content);
  };

  setSubscribeNote = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(
        `${url}:8080/subscribe?email=${this.state.user.email}&topic=${this.state.topic}`
      )
      .catch((err) => console.error(err));
    this.setState({ subscribeNote: false });
    window.location.reload(false);
  };

  setUnsubscribeNote = async (_) => {
    let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
    await axios
      .get(
        `${url}:8080/unSubscribe?email=${this.state.user.email}&topic=${this.state.topic}`
      )
      .catch((err) => console.error(err));
    this.setState({ unsubscribeNote: false });
    window.location.reload(false);
  };

  setSubscribe = (e) => {
    this.setState({ topic: e.target.id });
    this.setState({ subscribeNote: true });
  };

  setUnsubscribe = (e) => {
    this.setState({ topic: e.target.id });
    this.setState({ unsubscribeNote: true });
  };

  viewNote = (e) => {
    console.log(e.target.id);
    this.setState({ id: e.target.id });
    this.setState({ viewNote: true });
  };

  addNote = (e) => {
    console.log(e.target.id);
    this.setState({ addNote: true });
  };

  renderSubscribedContent = (e) => {
    console.log(this.state.subscribedNotes);
    this.setState({ showSubscribed: true });
    this.setState({ showCreatedByYou: false });
    this.setState({ showAllNotes: false });
  };

  renderCreatedByYou = (e) => {
    console.log(this.state.createdByYou);
    this.setState({ showCreatedByYou: true });
    this.setState({ showSubscribed: false });
    this.setState({ showAllNotes: false });
  };

  renderAllNotes = (e) => {
    console.log(this.state.content);
    this.setState({ showCreatedByYou: false });
    this.setState({ showSubscribed: false });
    this.setState({ showAllNotes: true });
  };

  cardButtons(id, topic) {
    if (this.state.showSubscribed === true) {
      return (
        <div>
          <MDBBtn
            id={topic}
            class="btn btn-light"
            style={{ fontSize: "12px" }}
            onClick={this.setUnsubscribe}
          >
            Unsubscribe
          </MDBBtn>
          <MDBBtn
            id={id}
            color="info"
            style={{ fontSize: "10px" }}
            onClick={this.viewNote}
          >
            View
          </MDBBtn>
        </div>
      );
    } else {
      let subscribedlistid = []
      console.log(this.state.subscribedNotes)
      this.state.subscribedNotes.map((p)=> subscribedlistid.push(p.id))

      if(subscribedlistid.includes(id)){
        return (
          <div>
            <MDBBtn
              id={topic}
              class="btn btn-light"
              style={{ fontSize: "12px" }}
              onClick={this.setUnsubscribe}
            >
              Unsubscribe
            </MDBBtn>
            <MDBBtn
              id={id}
              color="info"
              style={{ fontSize: "10px" }}
              onClick={this.viewNote}
            >
              View
            </MDBBtn>
          </div>
        );
      }
      else{
        return (
          <div>
            <MDBBtn
              id={topic}
              color="danger"
              style={{ fontSize: "12px" }}
              onClick={this.setSubscribe}
            >
              Subscribe
            </MDBBtn>
            <MDBBtn
              id={id}
              color="info"
              style={{ fontSize: "10px" }}
              onClick={this.viewNote}
            >
              View
            </MDBBtn>
          </div>
        );
      }
    }
  }

  renderToolbar = () => {
    return (
      <div>
        <NavBar useremail={this.props.location.state.useremail}></NavBar>
        <div>
          <center>
            <Button
              id={this.props.location.state.useremail}
              variant="danger"
              style={{
                fontSize: "2.5rem",
                borderRadius: "50%",
                fontWeight: "bold",
              }}
              onClick={this.addNote}
            >
              +
            </Button>
          </center>
          <div class="row">
            <div class="col-md-12">
              <ul class="stepper stepper-horizontal">
                <li class="completed">
                  <Button
                    variant="white"
                    onClick={this.renderSubscribedContent}
                  >
                    <a>
                      <span class="circle">1</span>
                      <span class="label">Subscribed</span>
                    </a>
                  </Button>
                </li>

                <li class="active">
                  <Button variant="white" onClick={this.renderAllNotes}>
                    <a>
                      {" "}
                      <span class="circle">2</span>{" "}
                      <span class="label">All Notes</span>
                    </a>
                  </Button>
                </li>

                <li class="active">
                  <Button variant="white" onClick={this.renderCreatedByYou}>
                    <a>
                      {" "}
                      <span class="circle">3</span>{" "}
                      <span class="label">Created By You</span>
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderContent = ({ id, userName, topic, createdAt, title }) => {
    return (
      <div
        className="d-inline-block"
        style={{ float: "left", marginTop: "20px" }}
      >
        <MDBCol>
          <MDBContainer>
            <MDBCard
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              }}
            >
              <MDBCardImage
                id={id}
                className="img-fluid"
                src={CoverImg}
                style={{ height: "18rem" }}
                waves
              />
              <MDBCardBody>
                <MDBCardTitle>
                  <center>{title}</center>
                </MDBCardTitle>
                <center>{this.cardButtons(id, topic)}</center>
              </MDBCardBody>
              <MDBFooter color="blue" style={{ fontSize: "15px" }}>
                <center>Topic: {topic}</center>
              </MDBFooter>
              <MDBFooter color="blue" style={{ fontSize: "15px" }}>
                <center>Created by: {userName}</center>
              </MDBFooter>
              <MDBFooter
                color="blue"
                style={{
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  fontSize: "15px",
                }}
              >
                <center> {createdAt}</center>
              </MDBFooter>
            </MDBCard>
          </MDBContainer>
        </MDBCol>
      </div>
    );
  };

  render() {
    if (this.state.viewNote === true) {
      return (
        <Redirect
          to={{
            pathname: "/viewnote",
            state: {
              useremail: this.props.location.state.useremail,
              id: this.state.id,
            },
          }}
        />
      );
    } else if (this.state.addNote === true) {
      return (
        <Redirect
          to={{
            pathname: "/addnote",
            state: { useremail: this.props.location.state.useremail },
          }}
        />
      );
    } else if (this.state.subscribeNote === true) {
      {
        console.log(this.state.topic);
      }
      {
        this.setSubscribeNote();
      }
    } else if (this.state.unsubscribeNote === true) {
      {
        console.log(this.state.topic);
      }
      {
        this.setUnsubscribeNote();
      }
    }
    if (this.state.showSubscribed === true) {
      return (
        <div>
          {this.renderToolbar()}
          {this.state.subscribedNotes.map((p) => this.renderContent(p))}
        </div>
      );
    } else if (this.state.showCreatedByYou === true) {
      return (
        <div>
          {this.renderToolbar()}
          {this.state.createdByYou.map(this.renderContent)}
        </div>
      );
    } else if (this.state.showAllNotes === true) {
      return (
        <div>
          {this.renderToolbar()}

          {this.state.content.map(this.renderContent)}
        </div>
      );
    } else {
      return (
        <div>
          {this.renderToolbar()}
          {console.log(this.props.location.state.useremail)}
          {this.state.content.map(this.renderContent)}
        </div>
      );
    }
  }
}

export default Home;
