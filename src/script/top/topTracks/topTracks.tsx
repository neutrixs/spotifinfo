import * as React from 'react';
import {spotifyTopTracks, artist} from '../types/spotifyTop'
import {getToken} from '../../base/functions'

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    Range:0|1|2
}

export default class TopTracks extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    
}