import * as React from 'react';
import '../../style/top/main.css'

interface states{
    pageNone:boolean,
    isMobile:boolean,
    transitionOn:boolean
}

export default class TopPage extends React.Component<{},states>{
    constructor(props:{}) {
        super(props)
        this.state = {
            pageNone: true,
            isMobile: false,
            transitionOn: false
        }
        this.mobileListener = this.mobileListener.bind(this)
    }

    componentDidMount(){
        this.mobileListenerStart()
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.mobileListener)
    }

    mobileListenerStart(){
        this.mobileListener()
        window.addEventListener('resize',this.mobileListener)

        this.setState({
            pageNone: false,
            transitionOn: true
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
                    (this.state.pageNone? 'none ' : '')+
                    (this.state.isMobile ? 'pageMobile ' : '')+
                    (this.state.transitionOn? 'transition300ms ' : '')
                }
            >

            </div>
        )
    }
}