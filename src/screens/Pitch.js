import React, { Component } from 'react'
import Auth from '../services/Auth'
import api from '../services/api'
import watson from '../services/watson'
import PubSub from 'pubsub-js'

export default class Pitch extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messageReview: false,
      buttonDisabled: false,
      pitch: {
        subject: '',
        text: '',
      },
      review: {
				document_tone: {
					tones: []
				},
				sentences_tone: []
			}
    }
}

  subscribes = [
    PubSub.subscribe('USER', () => this.handleLogged())
  ]

  componentDidMount() {
    this.handleLogged()

    api
    .getPitch({
      ...Auth.getUser(), 
      pitch_id: this.props.match.params.id,
    })
    .then(pitch => this.setState({ pitch }))
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
  
  analyzer() {
		this.setState({message: false})
		watson
			.analyser({
				text: this.state.pitch.text,
			})
			.then(res => {

				this.setState({ review: res.data })

				if(this.state.review.document_tone.tones.length === 0)
					this.setState({messageReview: true})
			})
			.catch(err => console.log(err))
  }

  editHandler() {
		this.setState({ buttonDisabled: true })
		api
			.updatePitch({
				...Auth.getUser(),
				...this.state.pitch
			})
			.then(res => {
				PubSub.publish('PITCHES')
				this.setState({ message: 'Edited successfully' })
			})
			.catch(error => console.log(error))
			.then(result => this.setState({ 
				buttonDisabled: false
			}))
  }

  render() {
    return (
      <div className="pitch">
        <div className="container">
          <div className="row">
            <div className="col">
              {this.state.message}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>
                <span>Subject</span>
                <input value={this.state.pitch.subject} onChange={this.inputChangeHandler.bind(this, 'subject')} type="text"/>
              </label>
              <label>
                <span>Text</span>
                <textarea value={this.state.pitch.text} onChange={this.inputChangeHandler.bind(this, 'text')}></textarea>
              </label>
              <button onClick={this.editHandler.bind(this)}>Edit</button>
              
            </div>
          </div>
          <div className="row">
            <div className="col">
              { this.state.review.document_tone.tones.length === 0 
                ?
                  <div>		
                    <button onClick={this.analyzer.bind(this)}>Tone Analyze</button>
                    { this.state.messageReview ? 
                      <div>Write a large text in English</div>
                    : <div></div> }
                  </div>
                :
                  <div>
                    { this.state.review.sentences_tone.length === 0 
                      ? 
                      <div>
                        { this.state.pitch.text }
                        <div>
                          { this.state.review.document_tone.tones.map((tone, index) => 
                            <div key={index}>{tone.tone_name}</div>
                          )}
                        </div>
                      </div> 
                      : 
                      <div>
                        { this.state.review.sentences_tone.map((sentence, index) => 
                          <div key={index}>
                            <div>Sentence {index+1}:</div>
                            <div>
                              <div>{sentence.text}</div>
                              { sentence.tones.length > 0
                                ? 
                                <div>
                                  { sentence.tones.map((tone, index) => 
                                    <div key={index}>{tone.tone_name}</div>
                                  )}
                                </div>
                                : 
                                <div>Undefined tone</div>
                              }
                            </div>
                          </div>
                        )}
                      </div> 
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
