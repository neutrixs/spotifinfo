import * as React from 'react';
import {spotifyTopTracks, artist} from '../types/spotifyTop'
import {getToken} from '../../base/functions'
import '../../../style/top/topTracks.css'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    Range:0|1|2
}

interface states{
    data:JSX.Element[]|null[]
}

export default class TopTracks extends React.Component<props,states>{
    constructor(props:props){
        super(props)

        this.state = {
            data:[null]
        }
    }

    render(){
        return(
            <div 
                id={"topTracks"+this.props.Range.toString()} 
                className={
                    "topTracks "+
                    (this.props.selectedType === 0 ? this.props.selectedRange == this.props.Range ? '' : 'none' : 'none ')
                }
            
            >
                
            </div>
        )
    }
}