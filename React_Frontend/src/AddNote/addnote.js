import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {MDBRow,MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter } from "mdbreact";
import NavBar from '../Components/navigationbar'
import axios from "axios";
import * as CONSTANTS from "../Constants";

class AddNote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user:'',
        noteCreated: false,
        note: {
          title: "",
          topic: "",
          content: "",
        }
        }
      };

      axios = require('axios').default;

      componentDidMount= async _=>{
        await this.getUserName();
    }
    

    getUserName = async _=>{
      let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await axios.get(`${url}:8080//user/findByEmail?email=${this.props.location.state.useremail}`)
        .then(res => res.data)
        .then(res => {this.setState({user: res})})
        .catch(err => console.error(err));
        console.log(this.state.user.userName)
    }

      add= async _=>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await axios.get(`${url}:8080/add?username=${this.state.user.userName}&topic=${this.state.note.topic}&content=${this.state.note.content}&title=${this.state.note.title}`)
        .then(res =>res.data)
        console.log(this.state.note.topic);
        console.log(this.state.note.content);
        console.log(this.state.note.title);
        this.setState({noteCreated: true})
      }


      render() {
        const {note} = this.state;
        if(this.state.noteCreated === true){
          return (
            <Redirect to={{pathname: "/home", state: { useremail: this.state.user.email }}}/>
          );
        }
        return (
          <div style={{backgroundColor:'lightgrey', minHeight:'100vh'}}>
            <NavBar useremail= {this.props.location.state.useremail}></NavBar>
            <MDBRow>
              <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
                <MDBCard style={{marginTop:'10%'}}>

                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>
                          <img src='' alt="" width="10%" height="50%"></img>
                          Create a Note
                        </strong>
                      </h3>
                    </div>

                    <MDBInput label="Title" group type="text" validate error="wrong" success="right"
                      onChange={i => this.setState({ note: { ...note, title: i.target.value } }) } />
                    <MDBInput label="Topic" group type="text" validate error="wrong" success="right"
                      onChange={i => this.setState({ note: { ...note, topic: i.target.value } }) } />
                    <MDBInput type="textarea" label="Content" rows="5"
                       onChange={i => this.setState({ note: { ...note, content: i.target.value } }) } />

              
                                
                    <div className="text-center pt-3 mb-3">
                      <MDBBtn type="button" color="deep-orange" style={{borderRadius:"50px"}} onClick={this.add}>
                        Create Note
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        );
      }
}
export default AddNote