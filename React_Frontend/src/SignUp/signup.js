import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import './signup.css';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import Logo from './paper-notes.png';
import Axios from "axios";
import * as CONSTANTS from "../Constants";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          auth: false,
          user: {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            phonenumber:""
            }
        };
    }

    credentialsRender(){
        if(this.state.auth.signup === false){
            return (
                <div>
                    <h5 style={{color:"red"}}>⚠ username or email already in use!</h5>
                </div>
            );
        }
        
    }

    render() {
        const { user } = this.state;
        if (this.state.auth.signup === true) {
          console.log("Successfully Signed Up");
          return <Redirect push to="/" />;
        }
        return (
            <div className="bg">
                <MDBRow>
                    <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
                        <MDBCard style={{ marginTop: "0rem" }}>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>
                                        <img src={Logo} alt=" " width="10%" height="10%"/>
                                            Note App
                                        </strong>
                                        <h5 className="dark-grey-text mb-3">
                                            <strong>Sign Up</strong>
                                        </h5>
                                    </h3>
                                </div>
                                <MDBInput label="First Name" group type="text" validate error="wrong" success="right"
                                        onChange={i => this.setState({ user: { ...user, firstname: i.target.value } }) } />
                                <MDBInput label="Last Name" group type="text" validate error="wrong" success="right"
                                        onChange={i => this.setState({ user: { ...user, lastname: i.target.value } }) } />
                                <MDBInput label="username" group type="text" validate error="wrong" success="right"
                                        onChange={i => this.setState({ user: { ...user, username: i.target.value } }) } />
                                <MDBInput label="Email" group type="email" validate error="wrong" success="right"
                                        onChange={i => this.setState({ user: { ...user, email: i.target.value } }) } />
                                <MDBInput label="Password" group type="password" validate containerClass="mb-0"
                                        onChange={i => this.setState({ user: { ...user, password: i.target.value } }) } />
                                <MDBInput label="Phone Number (xxx-xxx-xxxx)" group type="text" validate error="wrong" success="right"
                                        onChange={i => this.setState({ user: { ...user, phonenumber: i.target.value } }) } />
                                <div className="text-center pt-3 mb-3">
                                    <MDBBtn type="button" color="deep-orange" style={{borderRadius:"50px"}}onClick={this.signUp} >
                                            Sign Up
                                    </MDBBtn>
                                    {this.credentialsRender()}
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }

    signUp = async _ => {
        const { user } = this.state;
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await Axios.get(`${url}:8080/signup?email=${this.state.user.email}&firstname=${this.state.user.firstname}&lastname=${this.state.user.lastname}&userName=${this.state.user.username}&password=${this.state.user.password}&phoneNumber=${this.state.user.phonenumber}`)
        .then(res =>res.data)
        .then(res => {this.setState({auth: res})})
        console.log(this.state.auth.signup);
        console.log(this.state.user);
      }
}
export default SignUp;