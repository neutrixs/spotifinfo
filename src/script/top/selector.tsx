import * as React from 'react';
import '../../style/top/selector.scss'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    setSelectedType:(selected:0|1,event?:{[key:string]:any})=>void
    setSelectedRange:(selected:0|1|2,event?:{[key:string]:any})=>void
}

export default class Selector extends React.Component<props>{
    constructor(props:props){
        super(props)
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
                            (this.props.selectedType === 0 ? 'selected ' : '')
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
                            (this.props.selectedType === 1 ? 'selected ' : '')
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
                            (this.props.selectedRange === 0 ? 'selected ' : '')
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
                            (this.props.selectedRange === 1 ? 'selected ' : '')
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
                            (this.props.selectedRange === 2 ? 'selected ' : '')
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