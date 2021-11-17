import * as React from 'react';
import './main.scss'
import {ReCaptchaBadge} from '../base/reCaptchaBadge'
import getAccountInfo from './getAccountInfo'

interface states{
    pageNone:boolean
    isMobile:boolean
    transition:boolean
    profilePicURL:string
    isDefaultProfile:boolean
    username:string
    email:string
    id:string
    followers:number|null
    plan:'premium'|'open'|null
}

interface props{
    isDark:boolean
}

export default class AccountPage extends React.Component<props,states>{
    constructor(props:props){
        super(props)
        this.state = {
            pageNone:true,
            isMobile:false,
            transition:false,
            profilePicURL:'',
            isDefaultProfile:false,
            username:'',
            email:'',
            id:'',
            followers:null,
            plan:null
        }
        this.mobileListener = this.mobileListener.bind(this)
    }

    componentDidMount(){
        this.mobileListenerStart()
        getAccountInfo.bind(this)()
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.mobileListener)
    }

    mobileListenerStart(){
        this.mobileListener()
        window.addEventListener('resize',this.mobileListener)

        this.setState({
            pageNone:false,
            transition:true
        })
    }

    mobileListener(){
        const changeAt = 66
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        this.setState({
            isMobile:isMobile
        })
    }

    render(){
        return(
            <div 
                id="page"
                className={
                    (this.state.pageNone ? 'none ' : '')+
                    (this.state.isMobile ? 'pageMobile ' : '')+
                    (this.state.transition ? 'transition300ms ' : '')
                }
            >
                <div id="accountInfoHolder">
                    <p id="title">Your Account</p>
                    <img id="profile" src={this.state.profilePicURL} className={this.state.isDefaultProfile ? 'defaultProfile' : ''} />
                    <div id="infoHolder">
                        <p id="username">{this.state.username}</p>
                        <p className="infoSmall">
                            <span>Email: </span>
                            <span className="copy">{this.state.email}</span>
                        </p>
                        <p className="infoSmall">
                            <span>ID: </span>
                            <span className="copy">{this.state.id}</span>
                        </p>
                        <p className="infoSmall">
                            <span>Followers: </span>
                            <span>{this.state.followers?.toString()}</span>
                        </p>
                        <p className="infoSmall">
                            <span>Plan: </span>
                            <span>{this.state.plan == 'premium' ? 'premium' : 'free'}</span>
                        </p>
                    </div>
                </div>
                <ReCaptchaBadge isDark={this.props.isDark} />
            </div>
        )
    }
}