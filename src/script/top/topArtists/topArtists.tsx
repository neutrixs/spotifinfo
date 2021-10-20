import * as React from 'react';
import '../../../style/top/topArtists.css'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    Range:0|1|2
}

export default class TopArtists extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    render(){
        return(
            <div
                id={"topArtist"+this.props.Range.toString()}
                className={
                    "topArtists "+
                    (this.props.selectedType === 1 ? this.props.selectedRange === this.props.Range ? '' : 'none' : 'none ')
                }
            >

            </div>
        )
    }
}