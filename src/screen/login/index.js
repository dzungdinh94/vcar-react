import React, { Component } from 'react';
import './index.css'
import { Col, FormControl, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap'
import { PostNoToken } from '../../Request'
import { Config } from '../../Config'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      warning: '',
    }

  };
  handleChange = (k) => (e) => {
    this.state[k] = e.target.value
    this.setState({})
  }
  _onLogin = () => {
    let { email, password } = this.state
    if (!email) return this.setState({ warning: 'Nhập tên đăng nhập' });
    if (!password) return this.setState({ warning: 'Nhập mật khẩu' });
    PostNoToken('/login', { email, password }, (err, data) => {
      if (err) return this.setState({ warning: err })
      !!data.token && localStorage.setItem('token', data.token);
      !!data.avatar && localStorage.setItem('avatar', data.avatar);
      !!data.fullname && localStorage.setItem('fullname', data.fullname);
      !!data.id && localStorage.setItem('id', data.id);
      Config.history.push('/home')
    })

  }
  render() {
    let { email, password, warning } = this.state
    return (
      <div className="login" >
        <Col style={{ background: '#f5f6fa', padding: '30px 20px' }} xs={8} xsOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}  >
          <FormGroup
            controlId="formBasicText"
          // validationState={this.getValidationState()}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange('email')}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          // validationState={this.getValidationState()}
          >
            <ControlLabel>Mật khẩu</ControlLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={this.handleChange('password')}
            />
            <FormControl.Feedback />
          </FormGroup>
          {!!warning && <Alert bsStyle="danger">{warning}</Alert>}
          <div style={{ textAlign: 'center' }}>
            <Button onClick={this._onLogin} bsStyle="primary">Đăng nhập</Button>
          </div>
        </Col>

      </div>
    );
  }
}
export default Login;
