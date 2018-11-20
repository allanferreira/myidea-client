import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'
import api from '../services/api'
import Auth from '../services/Auth'

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
                <div className="col-lg col-12">
                  <h1 className="title">
                    Review your pitch with our <strong>Tone Analyzer</strong>
                  </h1>
                </div>
                <div className="col-lg-5 col-12">
                    <label>
                      <span>Email</span>
                      <input value={this.state.email} onChange={this.inputChangeHandler.bind(this, 'email')} type="text"/>
                    </label>
                    <label>
                      <span>Password</span>
                      <input value={this.state.password} onChange={this.inputChangeHandler.bind(this, 'password')} type="password"/>
                    </label>
                    <div className="row">
                      <div className="col">
                        <button onClick={this.loginHandler.bind(this)}>Login</button>
                      </div>
                      <div className="col text-right">
                        <Link to="/register">register your account</Link>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
