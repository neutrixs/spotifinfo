import * as React from 'react';
import '../../style/base/reCaptchaBadge.scss'

interface props {
    isDark:boolean
}

export class ReCaptchaBadge extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    render(){
        return(
            <div id="recaptchaBrandingHolder">
                <span>This site is protected by reCAPTCHA and the Google </span>
                <a 
                    className={
                        'branding '+
                        (!this.props.isDark ? 'brandingLight ' : '')
                    } 
                    href="https://policies.google.com/privacy" 
                    target="_blank"
                >Privacy Policy </a>
                <span>and </span>
                <a 
                    className={
                        'branding '+
                        (!this.props.isDark ? 'brandingLight ' : '')
                    } 
                    href="https://policies.google.com/terms" 
                    target="_blank"
                >Terms of Service </a>
                <span>apply.</span>
            </div>
        )
    }
}