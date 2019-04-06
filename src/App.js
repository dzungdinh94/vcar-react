import React, { Component } from 'react';
import MainScreen from './screen/'
import LoginScreen from './screen/login'
import { Config } from './Config'
import 'react-dates/initialize';

import {
  Router,
  Route,
  Redirect
} from 'react-router-dom';


class RedirectToHome extends Component {
  render() {
    let token = localStorage.getItem('token');
    return (
      <div>
        {this.props.location.pathname === "/" && <Redirect to={!!token ? '/home' : '/login'}></Redirect>}
      </div>
    )
  }
}

class App extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token');
    !token && Config.history.push('/login')
  }
  render() {
    return (
      <Router history={Config.history}>
        <div>
          <Route exact path="/" component={RedirectToHome} />
          <Route path="/home" component={MainScreen} />
          <Route path="/login" component={LoginScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
