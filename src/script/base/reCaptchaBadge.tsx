import * as React from 'react';
import '../../style/base/reCaptchaBadge.css'

export class ReCaptchaBadge extends React.Component{
    constructor(props:any){
        super(props)
    }

    render(){
        return(
            <div id="recaptchaBrandingHolder">
                <span>This site is protected by reCAPTCHA and the Google </span>
                <a className={"recaptchaBrandingText"} href="https://policies.google.com/privacy" target="_blank">Privacy Policy </a>
                <span>and </span>
                <a className={"recaptchaBrandingText"} href="https://policies.google.com/terms" target="_blank">Terms of Service </a>
                <span>apply.</span>
            </div>
        )
    }
}