import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import * as privacyPolicyText from './privacy.md'
import './privacy.scss'

interface states{
    textData:string
}

interface props{
    isDark:boolean
}

export default class Privacy extends React.Component<props,states> {
    constructor(props:props){
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
            <div 
                id="privacyHolder" 
                className={
                    (!this.props.isDark ? 'light ' : '')
                }
            >
                <ReactMarkdown>
                    {this.state.textData}
                </ReactMarkdown>
            </div>
        )
    }
}