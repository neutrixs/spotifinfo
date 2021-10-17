import * as React from 'react';
import '../../style/base/navbar.css'
import { Route, Switch, BrowserRouter as Router, NavLink } from 'react-router-dom'
import {getProfile} from './functions'

interface navbarParam {
    isLoggedOut:boolean
}
interface dropDownState {
    dropDownOpened:boolean
    dropDownLocked:boolean
    profilePicURL:string
    classDropdownIconRotate:''|'rotate180deg'
    classDropdownNone:''|'none'
}

export class Navbar extends React.Component<navbarParam, dropDownState> {
    constructor(props:any) {
        super(props)
        this.state = {
            dropDownOpened:false,
            dropDownLocked:false,
            profilePicURL:'',
            classDropdownIconRotate:'',
            classDropdownNone:'none'
        }

        const this1 = this
        document.addEventListener('click',function(){
            if(this1.state.dropDownLocked){
                this1.setState({
                    dropDownLocked:false
                })
                return
            }
            if(this1.state.dropDownOpened){
                this1.dropdown(false,true)
            }
        })
    }

    dropdown(lock:boolean,dropdownInteract:boolean){
        if(lock){
            this.setState({
                dropDownLocked:true
            })
        }
        if(!dropdownInteract) return

        this.setState((state)=>({
            classDropdownIconRotate: this.state.dropDownOpened ? '' : 'rotate180deg',
            classDropdownNone: this.state.dropDownOpened ? 'none' : '',
            dropDownOpened: !state.dropDownOpened
        }))
    }

    topTracksRouter(){
        if(!this.props.isLoggedOut){
            return(
                <NavLink to="/top_tracks">
                        <span className="pages lineHeight1">Top Tracks/Artists</span>
                </NavLink>
            )
        }
        return null
    }

    dropdown_elements(){
        if(!this.props.isLoggedOut){
            return(
                <>
                    <div id="profile_holder" onClick={()=>this.dropdown(true,true)}>
                        <img id="profile" src={this.state.profilePicURL} />
                        <svg id="dropdown" className={this.state.classDropdownIconRotate} viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g><path fill="white" d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"></path></g></svg>
                    </div>

                    <div id="dropdown_options" className={"dropdown_options "+this.state.classDropdownNone} onClick={()=>this.dropdown(true,false)}>
                        <NavLink to="/account">
                            <span className="pointer">Account</span>
                        </NavLink>
                        <div className="divider1"></div>
                        <a id="logout" className="pointer">Logout</a>
                        <div className="divider1"></div>
                        <div id="theme" className="pointer">
                            <span>Dark mode</span>
                            <svg id="theme_check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" fill="white"/></svg>
                        </div>
                    </div>
                </>
            )
        }
        else{
            return null
        }
    }

    componentDidMount(){
        if(!this.props.isLoggedOut)this.profilePicURL()
    }

    profilePicURL(){
        getProfile().then(url=>{
            this.setState({
                profilePicURL:url
            })
        })
    }

    render(){
        return(
            <div id="navBar" className="nav">
                <NavLink to="/">
                    <span className="pages lineHeight1" style={{marginLeft:'1.5em'}}>Home</span>
                </NavLink>
                {this.topTracksRouter()}
                {this.dropdown_elements()}
            </div>
        )
    }
}