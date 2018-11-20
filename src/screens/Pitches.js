import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../services/Auth'
import PubSub from 'pubsub-js'
import api from '../services/api'

export default class Pitches extends Component {

  subscribes = [
    PubSub.subscribe('USER', () => this.handleLogged()),
    PubSub.subscribe('PITCHES', () => {
      api
        .getPitches(Auth.getUser())
        .then(pitches => this.setState({ pitches }))
    })
  ]

  constructor() {
    super()
    this.state = {
      message:'',
      pitches: []
    }
  }

  componentDidMount() {
    this.handleLogged()

    api
      .getPitches(Auth.getUser())
      .then(pitches => this.setState({ pitches }))
  }

  removeHandle(pitch_id) {

		api
			.destroyPitch({
				...Auth.getUser(),
				pitch_id
			})
			.then(res => {
				PubSub.publish('PITCHES')
				this.setState({ message: 'Pitch has deleted'})
				setTimeout(() => this.setState({message: ''}), 3000)
			})
			.catch(err => console.log(err))

  }

  handleLogged() {
    if(!Auth.isLogged()) this.props.history.push('/')
  }

  render() {
    return (
      <div className="pitches">
        <div className="container">
          <div className="row">
            <div className="col">
              {this.state.message}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to='/pitch/new'>
                <button>Create a new pitch</button>
              </Link>
            </div>
          </div>

          {this.state.pitches.map((pitch, index) => 

            <div className="row" key={index}>
              <div className="col">
                {pitch.subject}
                <br/>
                {pitch.text}
              </div>
              <div className="col-auto">
                <Link to={`/pitch/${pitch.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={this.removeHandle.bind(this, pitch.id)}>Remove</button>
              </div>
            </div>

          )}
        </div>
      </div>
    )
  }
}
