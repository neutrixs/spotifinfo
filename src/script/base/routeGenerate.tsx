import * as React from 'react';
import {lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
const LoggedInMain = lazy(()=>import('../loggedIn/main'))
const LoggedOutMain  = lazy(()=>import('../loggedOut/main'))
const TopPage = lazy(()=>import('../top/main'))
const AccountPage = lazy(()=>import('../account/main'))
const Page404 = lazy(()=>import('./404'))

interface routeGenerateParam{
    isLoggedOut:boolean
}

export class RouteGenerate extends React.Component<routeGenerateParam>{
    constructor(props:routeGenerateParam){
        super(props)
    }

    pageLoading():JSX.Element{
        const divStyle:React.CSSProperties = {
            textAlign:'center',
            minWidth:'24.5em'
        }
        const pStyle:React.CSSProperties = {
            fontSize:'2em'
        }

        return(
            <div style={divStyle}>
                <p style={pStyle}>Loading page...</p>
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

    top_tracks():JSX.Element{
        if(!this.props.isLoggedOut){
            return(
                <Suspense fallback={this.pageLoading()}>
                    <TopPage/>
                </Suspense>
            )
        }
        else{
            return(
                <Redirect to="/" />
            )
        }
    }

    account():JSX.Element{
        if(!this.props.isLoggedOut){
            return (
                <Suspense fallback={this.pageLoading()}>
                    <AccountPage />
                </Suspense>
            )
        }
        else{
            return(
                <Redirect to="/" />
            )
        }
    }

    page404(){
        return(
            <Suspense fallback={null}>
                <Page404 />
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
                    {this.top_tracks()}
                </Route>
                <Route exact path="/account">
                    {this.account()}
                </Route>
                <Route>
                    {this.page404()}
                </Route>
            </Switch>
        )
    }
}