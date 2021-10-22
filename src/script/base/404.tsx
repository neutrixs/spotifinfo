import * as React from 'react';
import '../../style/base/404.css'

export default class Page404 extends React.Component{
    constructor(props:{}){
        super(props)
    }

    render(){
        return(
            <div id="holderAll">
                <div id="holder404">
                    <p id="text404">404</p>
                    <p id="notFound">NOT FOUND</p>
                    <p id="info404">THE REQUESTED RESOURCE {'\u00a0'} {window.location.pathname.toUpperCase()} {'\u00a0'} COULD NOT BE FOUND</p>
                </div>
            </div>
        )
    }
}