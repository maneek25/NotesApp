import React, { Component } from "react";
import axios from 'axios';
import "./viewnote.css"
import NavBar from '../Components/navigationbar'
import { MDBContainer, MDBRow, MDBCol, MDBCardTitle,MDBJumbotron, Link} from "mdbreact";
import * as CONSTANTS from "../Constants";

class viewNote extends Component {
    constructor(props) {
      super(props);
      this.state = {
          content:[],
      }
    }
    axios = require('axios').default;

    componentDidMount(){
        this.getNote();
    }
    getNote = async _=>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await axios.get(`${url}:8080/noteByID?id=${this.props.location.state.id}`)
        .then(res => res.data)
        .then(res => {this.setState({content: res})})
        .catch(err => console.error(err));
      }

    render() {
        return (
            <div className='bg'>
                <NavBar useremail= {this.props.location.state.useremail}></NavBar>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBJumbotron style={{ padding: 0 }}>
                                <MDBCol className="text-white text-center py-5 px-4 my-5" 
                                        style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)` }}>
                                    
                                    <MDBCol className="py-5">
                                    
                                        <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                                            {this.state.content.title}
                                        </MDBCardTitle>
                                        <p className="mx-5 mb-5">
                                            {this.state.content.content} 
                                        </p>
                                        <bottom>
                                            <p>Topic: {this.state.content.topic}</p>
                                            <p>Created by: {this.state.content.userName}</p>
                                            <p>{this.state.content.createdAt}</p>
                                        </bottom>
                                        <Link to={{ pathname: "/home", state: { useremail: this.props.location.state.useremail} }}>
                                            <left><img height='42rem' style={{marginTop: '-4px'}}src="https://image.flaticon.com/icons/svg/0/340.svg"/></left>
                                        </Link>
                                        
                                    </MDBCol>
                                </MDBCol>
                                
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}
export default viewNote;