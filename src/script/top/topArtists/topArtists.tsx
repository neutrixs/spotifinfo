import * as React from 'react';
import '../../../style/top/topArtists.scss'
import getTopArtists from './getTopArtists'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    Range:0|1|2
}

interface states{
    data:JSX.Element[]|null[]
}

export default class TopArtists extends React.Component<props,states>{
    constructor(props:props){
        super(props)
        this.state = {
            data:[null]
        }
    }

    componentDidMount(){
        getTopArtists.bind(this)()
    }

    render(){
        return(
            <div
                className={
                    "topArtists "+
                    (this.props.selectedType === 1 ? this.props.selectedRange === this.props.Range ? '' : 'none ' : 'none ')
                }
            >
                {this.state.data}
            </div>
        )
    }
}