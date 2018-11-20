import React, { Component } from 'react'
import Auth from '../services/Auth'
import api from '../services/api'
import PubSub from 'pubsub-js'

export default class PitchCreate extends Component {
  
  constructor(props) {
      super(props)
      this.state = {
        message: '',
        buttonDisabled: false,
        pitch: {
          subject: '',
          text: '',
        },
      }
  }

  subscribes = [
    PubSub.subscribe('USER', () => this.handleLogged())
  ]

  componentDidMount() {
    this.handleLogged()
  }

  handleLogged() {
    if(!Auth.isLogged()) this.props.history.push('/')
  }

	inputChangeHandler(key, event) {
		this.setState({ 
			pitch: { 
				...this.state.pitch,
				[key]: event.target.value,
			} 
		})
	}

	addHandler() {
		this.setState({ buttonDisabled: true })
		api
			.addPitch({
				...Auth.getUser(),
				...this.state.pitch,
			})
			.then(pitch => {
				this.setState({ message: 'Added successfully' })
				PubSub.publish('PITCHES')
			})
			.catch(error => console.log(error))
			.then(result => this.setState({ 
				buttonDisabled: false,
				pitch: {
					subject: '',
					text: '',
				}
			}))
  }
  
  render() {
    return (
      <div className="pitchCreate">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.state.message ? 
                <div className="alertMessage">
                  {this.state.message}
                </div>
              : <div></div>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-12">
              <h1>Create a Pitch</h1>
              <label>
                <span>Subject</span>
                <input value={this.state.pitch.subject} onChange={this.inputChangeHandler.bind(this, 'subject')} type="text"/>
              </label>
              <label>
                <span>Text</span>
                <textarea value={this.state.pitch.text} onChange={this.inputChangeHandler.bind(this, 'text')}></textarea>
              </label>
              <button onClick={this.addHandler.bind(this)}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
