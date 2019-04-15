import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from '../components/SignIn/SignIn';
import Form from '../components/Form/RegisterForm';
import NewPassword from '../components/NewPassword/NewPassword';
import Header from '../components/Header/Header';
import AddService from '../components/AddService/AddService';

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
            <Route path="/signin" exact component={SignIn}/>
            <Route path="/newPassword" exact component={NewPassword}/>
            <Route path="/form" exact  component={Form}/>
            <Route path="/addservice" exact component={AddService} />
            <Route path="/" exact  component={SignIn}/>
          </div>
        </div>

      </BrowserRouter>
    )
    
  }
}

export default App;
