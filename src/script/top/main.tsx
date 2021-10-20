import * as React from 'react';
import '../../style/top/main.css'

type selectedType = 0|1 //0 is tracks, 1 is artists
type selectedRange = 0|1|2 //0 is all time, 1 is 6 months, 2 is 1 month

interface states{
    pageNone:boolean,
    isMobile:boolean,
    transitionOn:boolean,
    selectedType:selectedType,
    selectedRange:selectedRange
}

export default class TopPage extends React.Component<{},states>{
    constructor(props:{}) {
        super(props)
        this.state = {
            pageNone: true,
            isMobile: false,
            transitionOn: false,
            selectedType: 0,
            selectedRange: 0
        }
        this.mobileListener = this.mobileListener.bind(this)
        this.setSelectedType = this.setSelectedType.bind(this)
        this.setSelectedRange = this.setSelectedRange.bind(this)
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

    setSelectedType(selected:selectedType){
        this.setState({
            selectedType:selected
        })
    }

    setSelectedRange(selected:selectedRange){
        this.setState({
            selectedRange:selected
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