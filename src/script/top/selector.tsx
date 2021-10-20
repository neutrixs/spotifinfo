import * as React from 'react';
import '../../style/top/selector.css'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    setSelectedType:Function
    setSelectedRange:Function
}

export default class Selector extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    render(){
        return(
            <p id="typeName">
                Top {this.props.selectedType === 0 ? 'Tracks' : 'Artists'}
            </p>
        )
    }
}