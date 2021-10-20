import * as React from 'react';
import '../../style/base/navbar.css'
import '../../style/loggedOut/loginNavbar.css'
import { NavLink } from 'react-router-dom'
import {getProfile, logOut} from './functions'
import loginButton from '../loggedOut/loginButton'
import * as defaultProfilePic from '../../img/user.png'
import * as dropdownIcon from '../../svg/dropdown.svg'

interface navbarParam {
    isLoggedOut:boolean
}
interface dropDownState {
    dropDownOpened:boolean
    dropDownLocked:boolean
    profilePicURL:string
    classDropdownIconRotate:boolean //classDropdownIconRotate:''|'rotate180deg'
    classDropdownNone:boolean
}

export class Navbar extends React.Component<navbarParam, dropDownState> {
    constructor(props:navbarParam) {
        super(props)
        this.state = {
            dropDownOpened:false,
            dropDownLocked:false,
            profilePicURL:'',
            classDropdownIconRotate:false,
            classDropdownNone:true
        }
        this.documentClick = this.documentClick.bind(this)
    }

    componentDidMount(){
        if(!this.props.isLoggedOut)this.profilePicURL()
        document.addEventListener('click',this.documentClick)
    }

    componentWillUnmount(){
        document.removeEventListener('click',this.documentClick)
    }

    login():string{
        return '/login?force='+(window.localStorage['force'] === 'true').toString()
    }

    profilePicURL(){
        getProfile().then(url=>{
            this.setState({
                profilePicURL:url??defaultProfilePic
            })
        })
    }

    documentClick(){
        if(this.state.dropDownLocked){
            this.setState({
                dropDownLocked:false
            })
            return
        }
        if(this.state.dropDownOpened){
            this.dropdown(false,true)
        }
    }

    dropdown(lock:boolean,dropdownInteract:boolean){
        if(lock){
            this.setState({
                dropDownLocked:true
            })
        }
        if(!dropdownInteract) return

        this.setState((state)=>({
            classDropdownIconRotate: this.state.dropDownOpened ? false : true,
            classDropdownNone: this.state.dropDownOpened ? true : false,
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
                        <img src={dropdownIcon} id="dropdown" className={(this.state.classDropdownIconRotate ? 'rotate180deg ' : '')} />
                    </div>

                    <div 
                        id="dropdown_options" 
                        className={
                            "dropdown_options "+
                            (this.state.classDropdownNone ? 'none ': '')
                        } 
                        onClick={()=>this.dropdown(true,false)}
                    >
                        <NavLink to="/account">
                            <span className="pointer">Account</span>
                        </NavLink>
                        <div className="divider1"></div>
                        <a id="logout" className="pointer" onClick={()=>logOut(true)}>Logout</a>
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
            return loginButton.bind(this)()
        }
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