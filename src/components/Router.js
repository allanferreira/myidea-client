import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../services/routes'

export default class Router extends Component {
    render() {
        return (
            <Switch>
                { routes.map((route, index) => 
                    { return route.exact 
                        ? <Route key={index} exact path={route.pathname} component={route.component}/>
                        : <Route key={index} path={route.pathname} component={route.component}/>
                    }
                ) }
            </Switch>
        )
    }
}
