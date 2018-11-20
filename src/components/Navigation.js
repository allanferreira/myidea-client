import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../services/Auth'

export default class Navigation extends Component {

    logoutHangler() {
        Auth.logout()
    }

    loginHangler() {
        Auth.login()
    }

    render() {
        return (
            <nav className="navigation">
                { Auth.isLogged()
                    ? 
                        <ul>
                            <li>
                                <Link to='/pitches'>Pitches</Link>
                            </li>
                            <li>
                                <span onClick={this.logoutHangler.bind(this)}>Logout</span>
                            </li>
                        </ul>
                    :
                        <ul>
                            <li>
                                <Link to='/'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </ul>
                }
            </nav>
        )
    }
}
