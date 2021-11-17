import * as React from 'react';
import './main.scss'
import Selector from './selector/selector'
import TopTracks from './topTracks/topTracks'
import TopArtists from './topArtists/topArtists'
import {ReCaptchaBadge} from '../base/reCaptchaBadge'

type selectedType = 0|1 //0 is tracks, 1 is artists
type selectedRange = 0|1|2 //0 is all time, 1 is 6 months, 2 is 1 month

interface states{
    pageNone:boolean,
    isMobile:boolean,
    transitionOn:boolean,
    selectedType:selectedType,
    selectedRange:selectedRange
}

interface props {
    isDark:boolean
}

export default class TopPage extends React.Component<props,states>{
    constructor(props:props) {
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

        const type:any = parseInt(window.localStorage['type'])
        if(0 <= type && type <= 1) this.setSelectedType(type)

        const range:any = parseInt(window.localStorage['range'])
        if(0 <= range && range <= 2) this.setSelectedRange(range)
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

    setSelectedType(selected:selectedType,event?:{[key:string]:any}){
        if(event?.key && event?.key != 'Enter') return

        this.setState({
            selectedType:selected
        })
        window.localStorage['type'] = selected.toString()
    }

    setSelectedRange(selected:selectedRange,event?:{[key:string]:any}){
        if(event?.key && event?.key != 'Enter') return

        this.setState({
            selectedRange:selected
        })
        window.localStorage['range'] = selected.toString()
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
                <div 
                    id="topHolder"
                    style={{
                        padding: '1.5em'
                    }}
                >
                    <Selector 
                        selectedType={this.state.selectedType}
                        selectedRange={this.state.selectedRange}
                        setSelectedType={this.setSelectedType}
                        setSelectedRange={this.setSelectedRange}
                        isDark={this.props.isDark}
                    />

                    <TopTracks selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={0} />
                    <TopTracks selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={1} />
                    <TopTracks selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={2} />

                    <TopArtists selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={0} />
                    <TopArtists selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={1} />
                    <TopArtists selectedType={this.state.selectedType} selectedRange={this.state.selectedRange} Range={2} />
                    
                </div>
                <ReCaptchaBadge isDark={this.props.isDark} />
            </div>
        )
    }
}