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

    pageLoading():JSX.Element{
        return(
            <div
                style={{
                    textAlign:'center',
                    minWidth: '24.5em'
                }}
            >
                <p
                    style={{
                        fontSize:'2em'
                    }}
                >Loading page...</p>
            </div>
        )
    }

    homepage():JSX.Element{
        if(!this.props.isLoggedOut){
            return(
                <Suspense fallback={this.pageLoading()}>
                    <LoggedInMain />
                </Suspense>
            )
        }
        return(
            <Suspense fallback={this.pageLoading()}>
                <LoggedOutMain />
            </Suspense>
        )
    }

    top_tracks():null|JSX.Element{
        if(!this.props.isLoggedOut){
            return null
        }
        else{
            return(
                <Redirect to="/" />
            )
        }
    }

    account():null|JSX.Element{
        if(!this.props.isLoggedOut){
            return null
        }
        else{
            return(
                <Redirect to="/" />
            )
        }
    }

    render(){
        return(
            <Switch>
                <Route exact path="/">
                    {this.homepage()}
                </Route>
                <Route exact path="/top_tracks">
                    {this.top_tracks()}
                </Route>
                <Route exact path="/account">
                    {this.account()}
                </Route>
            </Switch>
        )
    }
}