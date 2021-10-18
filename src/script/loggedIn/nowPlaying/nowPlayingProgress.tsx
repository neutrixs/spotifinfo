import {NowPlaying} from './nowPlaying'
import {NowPlayingState} from '../types/nowPlayingTypes'
function nowPlayingProgress(this:NowPlaying){
    if(!this.state.nowPlayingProgress.isPlaying) return

    this.setState((state:NowPlayingState)=>({
        nowPlayingProgress:{
            currentMs: state.nowPlayingProgress.currentMs+100,
            totalMs: state.nowPlayingProgress.totalMs,
            isPlaying: state.nowPlayingProgress.isPlaying
        }
    }))

    if(this.state.nowPlayingProgress.currentMs > this.state.nowPlayingProgress.totalMs) return

    const current = this.state.nowPlayingProgress.currentMs
    const total = this.state.nowPlayingProgress.totalMs

    let currentMinute = Math.floor(current/60000).toString()
    let currentSecond:string|number = (Math.floor(current/1000) % 60)
    currentSecond = (currentSecond < 10 ? '0' : '')+currentSecond.toString()

    let totalMinute = Math.floor(total/60000).toString()
    let totalSecond:string|number = (Math.floor(total/1000) % 60)
    totalSecond = (totalSecond < 10 ? '0' : '')+totalSecond.toString()

    let stringRes = currentMinute+':'+currentSecond+' / '+totalMinute+':'+totalSecond

    this.setState({
        nowPlayingProgressStr:stringRes
    })
}

export {nowPlayingProgress}