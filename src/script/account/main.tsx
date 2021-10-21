import * as React from 'react';
import '../../style/account/main.css'
import {ReCaptchaBadge} from '../base/reCaptchaBadge'

interface states{
    pageNone:boolean
    isMobile:boolean
    transition:boolean
}

export default class AccountPage extends React.Component<{},states>{
    constructor(props:{}){
        super(props)
        this.state = {
            pageNone:true,
            isMobile:false,
            transition:false
        }
        this.mobileListener = this.mobileListener.bind(this)
    }

    componentDidMount(){
        this.mobileListenerStart()
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

                <ReCaptchaBadge />
            </div>
        )
    }
}