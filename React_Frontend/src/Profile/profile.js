import React, { Component } from "react";
import axios from 'axios';
import './profile.css'
import NavBar from '../Components/navigationbar'
import CoverImg from '../Home/paper-notes.png';
import { MDBBtn,MDBCard,MDBCardBody,MDBCardImage,MDBCardTitle,MDBCol,MDBContainer, MDBFooter, MDBInput, MDBFormInline} from "mdbreact";
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import * as CONSTANTS from '../Constants';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            note:[],
            updatedContent:''
        }
    }

    axios = require('axios').default;

    componentDidMount= async _=>{
        await this.getUserName();
        this.getUserNotes();
    }
    

    getUserName = async _=>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await axios.get(`${url}:8080//user/findByEmail?email=${this.props.location.state.useremail}`)
        .then(res => res.data)
        .then(res => {this.setState({user: res})})
        .catch(err => console.error(err));
        console.log(this.state.user.userName)
    }

    getUserNotes = async _=>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        await axios.get(`${url}:8080/noteByUser?username=${this.state.user.userName}`)
        .then(res => res.data)
        .then(res => {this.setState({note: res})})
        .catch(err => console.error(err));
        console.log(this.state.note)
    };


    delete= e =>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        axios.get(`${url}:8080/delete?id=${e.target.id}`)
        .catch(err => console.error(err));
        window.location.reload(false);
    }

    updateContent= e =>{
        let url= CONSTANTS.ONPROD ? CONSTANTS.PRODURL: CONSTANTS.DEVURL;
        if(this.state.updatedContent !== ''){
            axios.get(`${url}:8080/updateContent?id=${e.target.id}&content=${this.state.updatedContent}`)
            .catch(err => console.error(err));
            console.log(e.target.id);
            this.getUserNotes();
            window.location.reload(false);
        }
        else{
            window.location.reload(false);
        }
        
        

        
    }

    render() {
        return (
            <div>
            <NavBar useremail= {this.props.location.state.useremail}></NavBar>
            <div>
            <MDBCard style={{ background: "rgba(255,255,255,0.9)"}}>
                <div class="media">
                    <img src="https://i.stack.imgur.com/34AD2.jpg" class="mr-3" alt="..."/>
                    <div class="media-body" >
                        <div class="list-group"style={{width:'78rem', marginTop:'1rem'}}>
                            <a class="list-group-item list-group-item-action active">
                                <center><h5 style={{fontWeight:'bold'}}>{this.state.user.firstName} {this.state.user.lastName}</h5></center>
                            </a>
                            <center>
                                <a class="list-group-item list-group-item-action disabled">Username : {this.state.user.userName}</a>
                                <a class="list-group-item list-group-item-action disabled">Email: {this.state.user.email}</a>
                                <a class="list-group-item list-group-item-action disabled">Phone Number: {this.state.user.phoneNumber}</a> 
                            </center>
                        </div>
                    </div>
                </div>
            </MDBCard>
            </div>
            <div>
                {console.log(this.props.location.state.useremail)}
                {this.state.note.map(this.renderContent)}
            </div>
          </div>
        );
      }

      renderContent = ({id, userName, topic, content,createdAt, title}) => {
        return (
          <div className="d-inline-block"style={{ float: "left", marginTop: "20px" }}>
            <MDBCol>
              <MDBContainer>
                <MDBCard style={{ background: "rgba(255,255,255,0.9)",width: "15rem", borderRadius:"10px"}}>
                  <MDBCardImage className="img-fluid" src={CoverImg} style={{height:"15rem"}}waves />
                    <MDBCardBody>
                      <MDBCardTitle><center>{title}</center></MDBCardTitle> 
                      <MDBFormInline>
                        <MDBBtn id={id} color="white" style={{borderRadius:"1rem",fontSize: "12px"}}
                                onClick={this.delete}>
                          🗑️ 
                        </MDBBtn>

                        <PopupState variant="popper" popupId="demo-popup-popper">
                            {popupState => (
                                <div>
                                    <right>
                                    <MDBBtn id={id} color="white" style={{borderRadius:"1rem", fontSize: "12px"}} {...bindToggle(popupState)}>
                                        ✒️
                                    </MDBBtn>
                                    </right>
                                    <Popper {...bindPopper(popupState)} transition>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper style={{height: '20.5rem', borderRadius:'20px'}}>
                                                    <div style={{width: "25rem"}}>
                                                        <MDBCardBody style={{width:'25rem', position:'fixed'}}>
                                                            <form>
                                                                <div className="grey-text">
                                                                    <MDBInput label="Content" outline onChange={i => this.setState({updatedContent: i.target.value})}
                                                                        style={{ height: "10rem", color: "black"}} valueDefault={content}
                                                                                type="textarea" icon="pencil-alt"/>
                                                                                {console.log(this.state.updatedContent)}
                                                                                {console.log(id)}
                                                                </div>
                                                                <div className="text-center py-4 mt-3">
                                                                    <MDBBtn id={id} color="blue" type="button" style={{borderRadius: "50px"}}
                                                                        onClick={this.updateContent}>
                                                                            Submit
                                                                    </MDBBtn>
                                                                </div>
                                                            </form>
                                                        </MDBCardBody>
                                                    </div>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </div>
                            )}
                        </PopupState>
                    </MDBFormInline>
                    </MDBCardBody>
                    <MDBFooter color="blue" style={{fontSize:"15px"}}>
                      <center>Topic: {topic}</center>
                    </MDBFooter>
                    <MDBFooter color="blue" style={{fontSize:"15px"}}>
                      <center>Created by: {userName}</center>
                    </MDBFooter>
                    <MDBFooter color="blue" style={{borderBottomLeftRadius:"10px",
                                borderBottomRightRadius:"10px", fontSize:"15px"}}>
                      <center> {createdAt}</center>
                    </MDBFooter>
                </MDBCard>
              </MDBContainer>
            </MDBCol>
          </div>
        );
      };
}
export default Profile;