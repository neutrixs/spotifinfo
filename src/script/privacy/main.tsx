import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import * as privacyPolicyText from './privacy.md'
import '../../style/privacy/privacy.scss'

interface states{
    textData:string
}

export default class Privacy extends React.Component<{},states> {
    constructor(props:{}){
        super(props)

        this.state = {
            textData:'# Privacy Policy'
        }
    }

    async componentDidMount(){
        let data = await fetch(privacyPolicyText)
        let text = await data.text()

        this.setState({
            textData:text
        })
    }

    render(){
        return(
            <div id="privacyHolder">
                <ReactMarkdown>
                    {this.state.textData}
                </ReactMarkdown>
            </div>
        )
    }
}