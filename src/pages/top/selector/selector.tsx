import * as React from 'react';
import './selector.scss'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    setSelectedType:(selected:0|1,event?:{[key:string]:any})=>void
    setSelectedRange:(selected:0|1|2,event?:{[key:string]:any})=>void
    isDark:boolean
}

export default class Selector extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    getSelectedclass(num:number,type:'selectedType'|'selectedRange'){
        if(num == this.props[type]){
            if(this.props.isDark) return 'selected '
            return 'selectedLight '
        }
        return ''
    }

    render(){
        return(
            <div id="selector">
                <p id="type">
                    Top {this.props.selectedType === 0 ? 'Tracks' : 'Artists'}
                </p>
                <div id="typeSelector">
                    <div 
                        role="button"
                        tabIndex={0}
                        className={
                            (this.getSelectedclass(0,'selectedType'))
                        }
                        onClick={()=>this.props.setSelectedType(0)}
                        onKeyDown={(e)=>this.props.setSelectedType(0,e)}
                    >
                        <span>Top Tracks</span>
                    </div>
                    <div 
                        role="button"
                        tabIndex={0}
                        className={
                            (this.getSelectedclass(1,'selectedType'))
                        }
                        onClick={()=>this.props.setSelectedType(1)}
                        onKeyDown={(e)=>this.props.setSelectedType(1,e)}
                    >
                        <span>Top Artists</span>
                    </div>
                </div>
                <div id="rangeSelector">
                    <div
                        role="button"
                        tabIndex={0}
                        className={
                            (this.getSelectedclass(0,'selectedRange'))
                        }
                        onClick={()=>this.props.setSelectedRange(0)}
                        onKeyDown={(e)=>this.props.setSelectedRange(0,e)}
                    >
                        <span>All Time</span>
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        className={
                            (this.getSelectedclass(1,'selectedRange'))
                        }
                        onClick={()=>this.props.setSelectedRange(1)}
                        onKeyDown={(e)=>this.props.setSelectedRange(1,e)}
                    >
                        <span>6 Months</span>
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        className={
                            (this.getSelectedclass(2,'selectedRange'))
                        }
                        onClick={()=>this.props.setSelectedRange(2)}
                        onKeyDown={(e)=>this.props.setSelectedRange(2,e)}
                    >
                        <span>1 Month</span>
                    </div>
                </div>
            </div>
        )
    }
}