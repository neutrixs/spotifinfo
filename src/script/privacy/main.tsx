import * as React from 'react'
import ReactMarkdown from 'react-markdown'

export default class Privacy extends React.Component {
    constructor(props:{}){
        super(props)
    }

    render(){
        return(
            <div id="privacyHolder">
                <ReactMarkdown>
                    # Privacy Policy
                </ReactMarkdown>
            </div>
        )
    }
}