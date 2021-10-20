import * as React from 'react';
import '../../style/base/reCaptchaBadge.css'

interface props{
    noPaddingLeftAndRight?:boolean
    paddingTop?:boolean
}

export class ReCaptchaBadge extends React.Component<props>{
    constructor(props:any){
        super(props)
    }

    style(){
        let allStyle:React.CSSProperties = {}

        if(this.props.noPaddingLeftAndRight){
            allStyle = {
                ...allStyle,
                paddingLeft:'0',
                paddingRight:'0'
            }
        }

        if(this.props.paddingTop){
            allStyle = {
                ...allStyle,
                paddingTop:'1.5em'
            }
        }

        return allStyle
    }

    render(){
        return(
            <div id="recaptchaBrandingHolder" style={this.style()}>
                <span>This site is protected by reCAPTCHA and the Google </span>
                <a className={"recaptchaBrandingText"} href="https://policies.google.com/privacy" target="_blank">Privacy Policy </a>
                <span>and </span>
                <a className={"recaptchaBrandingText"} href="https://policies.google.com/terms" target="_blank">Terms of Service </a>
                <span>apply.</span>
            </div>
        )
    }
}