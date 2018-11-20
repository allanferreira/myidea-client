import React, { Component } from 'react'
import Auth from '../services/Auth'
import api from '../services/api'
import PubSub from 'pubsub-js'

export default class Register extends Component {


  constructor(props) {
    super(props)
    this.state = {
      message: '',
      buttonDisabled: false,
      name: '',
      email: '',
      password: '',
      messageSuccess: '',
      messageError: ''
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

  inputChangeHandler(key, event) {

    this.setState({ 
      [key]: event.target.value, 
      message: '' 
    })

  }

  registerHandler() {

    this.setState({ buttonDisabled: true })

    api
      .register({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then(user => this.setState({ messageSuccess: 'Registered user' }))
      .catch(error => this.setState({ messageError: 'Email already used' }))
      .then(result => this.setState({ 
        buttonDisabled: false,
        name: '',
        email: '',
        password: '',
      }))
  }

  render() {
    return (
      <div className="register">
          <div className="container">
            <div className="row">
                <div className="col-12">
                  { this.state.message || this.state.messageSuccess || this.state.messageError 
                    ? 
                      <div className="alertMessage">
                        {this.state.message}
                        {this.state.messageSuccess}
                        {this.state.messageError}
                      </div>
                    : <div></div>
                  }
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-5">
                    <h1>Register</h1>
                    <label>
                      <span>Name</span>
                      <input value={this.state.name} onChange={this.inputChangeHandler.bind(this, 'name')} type="text"/>
                    </label>
                    <label>
                      <span>Email</span>
                      <input value={this.state.email} onChange={this.inputChangeHandler.bind(this, 'email')} type="text"/>
                    </label>
                    <label>
                      <span>Password</span>
                      <input value={this.state.password} onChange={this.inputChangeHandler.bind(this, 'password')} type="password"/>
                    </label>
                    <button onClick={this.registerHandler.bind(this)}>Register</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
