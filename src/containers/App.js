import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/RegisterForm';
import NewPassword from '../components/NewPassword/NewPassword';
import Header from '../components/Header/Header';
import AddService from '../components/AddService/AddService';
import Service from '../components/Services/Services';

class App extends Component {
  state = {
    isSignIn: false
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Switch>
              <Route path="/login" exact component={SignIn}/>
              <Route path="/newPassword" exact component={NewPassword}/>
              <Route path="/register" exact  component={Register}/>
              <Route path="/addtask" exact component={AddService} />
              <Route path="/"  component={Service}/>
            </Switch>
          </div>
        </div>

      </BrowserRouter>
    )
    
  }
}

export default App;
