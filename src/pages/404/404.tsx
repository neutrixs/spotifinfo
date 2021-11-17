import * as React from 'react';
import './404.scss'

export default class Page404 extends React.Component{
    constructor(props:{}){
        super(props)
    }

    render(){
        return(
            <div id="holder404">
                <div>
                    <p id="text">404</p>
                    <p id="notFound">NOT FOUND</p>
                    <p id="info">THE REQUESTED RESOURCE {'\u00a0'} {window.location.pathname.toUpperCase()} {'\u00a0'} COULD NOT BE FOUND</p>
                </div>
            </div>
        )
    }
}