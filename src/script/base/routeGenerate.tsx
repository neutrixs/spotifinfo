import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoggedInMain } from '../loggedIn/main'
import { LoggedOutMain } from '../loggedOut/main'

interface routeGenerateParam{
    isLoggedOut:boolean
}

export class RouteGenerate extends React.Component<routeGenerateParam>{
    constructor(props:routeGenerateParam){
        super(props)
    }

    homepage(){
        if(!this.props.isLoggedOut){
            return(
                <LoggedInMain />
            )
        }
        return(
            <LoggedOutMain />
        )
    }

    render(){
        return(
            <Switch>
                <Route exact path="/">
                    {this.homepage()}
                </Route>
                <Route exact path="/top_tracks">
                    {
                        this.props.isLoggedOut ? <Redirect to="/" /> : null
                    }
                </Route>
                <Route exact path="/account">
                    {
                        this.props.isLoggedOut ? <Redirect to="/" /> : null
                    }
                </Route>
            </Switch>
        )
    }
}