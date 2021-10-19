import * as React from 'react';
import {lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
const LoggedInMain = lazy(()=>import('../loggedIn/main'))
const LoggedOutMain  = lazy(()=>import('../loggedOut/main'))

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
                <Suspense fallback={null}>
                    <LoggedInMain />
                </Suspense>
            )
        }
        return(
            <Suspense fallback={null}>
                <LoggedOutMain />
            </Suspense>
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