import * as React from 'react';

interface states{
    pageNone:boolean
}

export default class TopPage extends React.Component<{},states>{
    constructor(props:{}) {
        super(props)
        this.state = {
            pageNone: true
        }
    }

    render(){
        return(
            <div 
                id="page"
                className={
                    (this.state.pageNone? 'none ' : '')
                }
            >

            </div>
        )
    }
}