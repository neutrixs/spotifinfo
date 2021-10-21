import * as React from 'react';
import '../../style/account/main.css'

interface states{
    pageNone:boolean
    isMobile:boolean
    transition:boolean
}

export default class AccountPage extends React.Component<{},states>{
    constructor(props:{}){
        super(props)
        this.state = {
            pageNone:true,
            isMobile:false,
            transition:false
        }
    }

    render(){
        return(
            <div 
                id="page"
                className={
                    (this.state.pageNone ? 'none ' : '')+
                    (this.state.isMobile ? 'pageMobile ' : '')+
                    (this.state.transition ? 'transition300ms ' : '')
                }
            >

            </div>
        )
    }
}