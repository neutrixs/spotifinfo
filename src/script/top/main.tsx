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