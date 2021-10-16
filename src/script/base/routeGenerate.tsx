import * as React from 'react';
import { Switch, Route } from 'react-router-dom'
import { NowPlaying } from '../loggedIn/nowPlaying'

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
                <NowPlaying />
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