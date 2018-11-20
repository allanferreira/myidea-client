import React, { Component } from 'react'
import api from '../services/api'
import Auth from '../services/Auth'
import PubSub from 'pubsub-js'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      buttonDisabled: false,
      email: 'allan.less@outlook.com',
      password: 'secret',
    }
  }

  subscribes = [
    PubSub.subscribe('USER', () => this.handleLogged())
  ]

  componentDidMount() {
    this.handleLogged()
  }

  handleLogged() {
    if(Auth.isLogged()) this.props.history.push('pitches')
  }

  loginHandler() {

    this.setState({ buttonDisabled: true })

    api
      .login({
        email: this.state.email,
        password: this.state.password,
      })
      .then(user => Auth.login(user.data))
      .catch(error => this.setState({ message: 'Email or password is incorrect' }))
      .then(result => this.setState({ buttonDisabled: false }))

  }

  inputChangeHandler(key, event) {

    this.setState({ 
      [key]: event.target.value, 
      message: '' 
    })

  }

  render() {
    return (
      <div className="login">
        <div className="container">
            <div className="row">
              <div className="col">
                {this.state.message}
              </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>
                      <span>Email</span>
                      <input value={this.state.email} onChange={this.inputChangeHandler.bind(this, 'email')} type="text"/>
                    </label>
                    <label>
                      <span>Password</span>
                      <input value={this.state.password} onChange={this.inputChangeHandler.bind(this, 'password')} type="password"/>
                    </label>
                    <button onClick={this.loginHandler.bind(this)}>Login</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
