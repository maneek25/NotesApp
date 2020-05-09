import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home/home'
import Login from './LogIn/login'
import SignUp from './SignUp/signup'
import ViewNote from './viewNote/viewnote'
import Profile from './Profile/profile'
import AddNote from './AddNote/addnote'
class PageRouter extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path = "/" exact component = {Login}/>
                    <Route path = "/home" exact component = {Home}/>
                    <Route path = "/signup" exact component = {SignUp}/>
                    <Route path = "/viewnote" exact component = {ViewNote}/>
                    <Route path = "/profile" exact component = {Profile}/>
                    <Route path = "/addnote" exact component = {AddNote}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default PageRouter;