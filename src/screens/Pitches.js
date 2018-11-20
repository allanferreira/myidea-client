import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'
import Auth from '../services/Auth'
import api from '../services/api'
import './Pitches.css'

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
            <div className="col-12">
              {this.state.message ? 
                <div className="alertMessage">
                  {this.state.message}
                </div>
              : <div></div>}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <h1>Pitches</h1>
            </div>
            <div className="col-12 col-lg-6 text-lg-right text-left">
              <Link to='/pitch/new'>
                <button>Create</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table>
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.pitches.map((pitch, index) => 

                    <tr key={index}>
                      <td>
                        {pitch.subject}
                      </td>
                      <td className="text-right actions">
                        <Link to={`/pitch/${pitch.id}`}>
                          <button>Edit</button>
                        </Link>
                        <button onClick={this.removeHandle.bind(this, pitch.id)}>Remove</button>
                      </td>
                    </tr>

                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
