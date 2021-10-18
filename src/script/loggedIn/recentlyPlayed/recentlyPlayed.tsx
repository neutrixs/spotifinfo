import * as React from 'react';
import {getToken} from '../../base/functions'
import '../../../style/loggedIn/recentlyPlayed.css'
import { spotifyRecentlyPlayedType, artists } from '../types/spotifyRecentlyPlayed'

interface props{
    setGetRecentlyPlayedFunction:Function
}

interface states{
    data:Array<JSX.Element>
    classNone:''|'none'
}

export class RecentlyPlayed extends React.Component<props,states> {
    constructor(props:any){
        super(props)

        this.state = {
            data:[],
            classNone:'none'
        }

        this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this)
        this.props.setGetRecentlyPlayedFunction(this.getRecentlyPlayed)
    }

    componentDidMount(){
        this.getRecentlyPlayed()
    }

    structureData(data:spotifyRecentlyPlayedType){
        let constructedData:Array<JSX.Element> = []
        for(let i = 0; i < data.items?.length; i++){
            let thisTrack = data.items[i].track
            let key = thisTrack.id+i.toString()

            constructedData.push(
                <div id={"recentlyPlayed"+i} className={"recentlyPlayedEach"} key={key}>
                    <a id={"recentlyPlayed"+i+"ArtHolder"} className={"recentlyPlayedArtHolder"} href={thisTrack.album.external_urls.spotify} key={key+'_1'}>
                        <img className={"recentlyPlayedArt"} src={thisTrack.album.images[1].url} key={key+'_2'} />
                    </a>
                    <a id={"recentlyPlayed"+i+"InfoHolder"} className={"recentlyPlayedInfoHolder"} href={thisTrack.external_urls.spotify} key={key+'_3'}>
                        <p className={"recentlyPlayedSongName"} key={key+'_4'}>
                            {thisTrack.name}
                        </p>
                        <p className={"recentlyPlayedArtistsName"} key={key+'_5'}>
                            {
                                thisTrack.artists.map((artist:artists)=>{
                                    return artist.name
                                }).join(', ')
                            }
                        </p>
                    </a>
                </div>
            )
        }

        this.setState({
            data:constructedData,
            classNone:''
        })
    }

    async getRecentlyPlayed(){
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

        const data:spotifyRecentlyPlayedType = await res.json()
        this.structureData(data)
    }

    render(){
        return(
            <div id="recentlyPlayed" className={this.state.classNone}>
                <p id="titleRecentlyPlayed">Recently Played:</p>
                <div id="recentlyPlayedListHolder">
                    {this.state.data}
                </div>
            </div>
        )
    }
}