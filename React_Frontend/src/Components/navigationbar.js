import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBInput, MDBBtn, MDBCol,MDBFormInline, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { BrowserRouter as Router,Link, Redirect } from 'react-router-dom';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: '',
      isOpen: false,
    };
  }

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

componentWillMount() {
  this.setState({useremail: this.props.useremail})
}

render() {
  return (
      <MDBNavbar color="blue" dark expand="md">
        <MDBNavbarBrand>
          <strong  style={{color:'White', fontFamily:'Helvetica', fontWeight: 'bold', fontSize:'25px'}}>
           Notes App
          </strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

          {/* ////////////////////This are the link on the left side of the NavBar/////////////////////////////// */}
          <MDBNavbarNav left>
            <MDBNavItem>
            <MDBNavLink to={{ pathname: "/home", state: { useremail: this.state.useremail } }} style={{fontSize:'17px', fontWeight:'bold'}}>
              Home
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={{ pathname: "/profile", state: { useremail:this.state.useremail } }} style={{fontSize:'17px', fontWeight:'bold'}}>
              Profile
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          
          {/* ////////////////////////////This are the icon in the right side of NavBar/////////////////////////////// */}
          <MDBNavbarNav right >
            <MDBNavItem>
                <MDBNavLink to={{ pathname: "/profile", state: { useremail:this.props.useremail} }}
                style={{marginTop: '0.5rem', marginRight:"1rem"}}>
                  <div>
                    <img height='35rem' style={{marginTop:'-6px'}}
                    src="https://pngimage.net/wp-content/uploads/2018/06/profile-logo-png.png"/>
                  </div>
                </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
                <MDBNavLink style={{fontWeight:"bold", marginTop: '0.5rem'}} to="/" >
                   Log Out
                </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavBar;