import * as React from 'react';

interface props{
    selectedType:0|1
    selectedRange:0|1|2
    Range:0|1|2
}

export default class TopArtists extends React.Component<props>{
    constructor(props:props){
        super(props)
    }
}