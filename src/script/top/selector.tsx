import * as React from 'react';
import '../../style/top/selector.css'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    setSelectedType:(selected:0|1)=>void
    setSelectedRange:(selected:0|1|2)=>void
}

export default class Selector extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    render(){
        return(
            <div>
                <p id="typeName">
                    Top {this.props.selectedType === 0 ? 'Tracks' : 'Artists'}
                </p>
                <div id="typeSelector">
                    <div 
                        className={
                            'typeSelectorEach '+
                            (this.props.selectedType === 0 ? 'selected ' : '')
                        }
                        onClick={()=>this.props.setSelectedType(0)}
                    >
                        <span>Top Tracks</span>
                    </div>
                    <div 
                        className={
                            'typeSelectorEach '+
                            (this.props.selectedType === 1 ? 'selected ' : '')
                        }
                        onClick={()=>this.props.setSelectedType(1)}
                    >
                        <span>Top Artists</span>
                    </div>
                </div>
                <div id="rangeSelector">
                    <div
                        className={
                            'rangeSelectorEach '+
                            (this.props.selectedRange === 0 ? 'selected ' : '')
                        }
                        onClick={()=>this.props.setSelectedRange(0)}
                    >
                        <span>All Time</span>
                    </div>
                    <div
                        className={
                            'rangeSelectorEach '+
                            (this.props.selectedRange === 1 ? 'selected ' : '')
                        }
                        onClick={()=>this.props.setSelectedRange(1)}
                    >
                        <span>6 Months</span>
                    </div>
                    <div
                        className={
                            'rangeSelectorEach '+
                            (this.props.selectedRange === 2 ? 'selected ' : '')
                        }
                        onClick={()=>this.props.setSelectedRange(2)}
                    >
                        <span>1 Month</span>
                    </div>
                </div>
            </div>
        )
    }
}