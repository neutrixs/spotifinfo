import * as React from 'react';
import { Switch, Route } from 'react-router-dom'
import { LoggedInMain } from '../loggedIn/main'

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
            <h1>test logged out</h1>
        )
    }

    render(){
        return(
            <Switch>
                <Route exact path="/">
                    {this.homepage()}
                </Route>
            </Switch>
        )
    }
}