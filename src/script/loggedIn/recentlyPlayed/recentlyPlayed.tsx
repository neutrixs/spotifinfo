import * as React from 'react';
import {getToken} from '../../base/functions'

interface props{
    setGetRecentlyPlayedFunction:Function
}

interface states{
    data:Array<any>
    classNone:''|'none'
}

export class RecentlyPlayed extends React.Component<props,states> {
    constructor(props:any){
        super(props)

        this.state = {
            data:[],
            classNone:'none'
        }

        this.props.setGetRecentlyPlayedFunction(this.getRecentlyPlayed)
    }

    componentDidMount(){
        this.getRecentlyPlayed()
    }

    structureData(data:{[key:string]:any}){
        let constructedData = []
    }

    async getRecentlyPlayed(){
        console.log('im here')
        const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=50'
        const res = await fetch(url,{
            method:'GET',
            headers:{
                'Authorization': window.localStorage['token']
            }
        })

        if(res.status == 401 || res.status == 400){
            await getToken()
            await this.getRecentlyPlayed()
            return
        }

        const data = await res.json()
    }

    render(){
        return(
            <div id="recentlyPlayed" className={this.state.classNone}>
                <p id="titleRecentlyPlayed">Recently Played:</p>
                <div id="recentlyPlayedListHolder"></div>
            </div>
        )
    }
}