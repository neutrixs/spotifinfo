function nowPlayingProgress(this1:any){
    if(!this1.state.nowPlayingProgress.isPlaying) return

    this1.setState((state:any)=>({
        nowPlayingProgress:{
            currentMs: state.nowPlayingProgress.currentMs+100,
            totalMs: state.nowPlayingProgress.totalMs,
            isPlaying: state.nowPlayingProgress.isPlaying
        }
    }))

    const current = this1.state.nowPlayingProgress.currentMs
    const total = this1.state.nowPlayingProgress.totalMs

    let currentMinute = Math.floor(current/60000).toString()
    let currentSecond:string|number = (Math.floor(current/1000) % 60)
    currentSecond = (currentSecond < 10 ? '0' : '')+currentSecond.toString()

    let totalMinute = Math.floor(total/60000).toString()
    let totalSecond:string|number = (Math.floor(total/1000) % 60)
    totalSecond = (totalSecond < 10 ? '0' : '')+totalSecond.toString()

    let stringRes = currentMinute+':'+currentSecond+' / '+totalMinute+':'+totalSecond

    this1.setState({
        nowPlayingProgressStr:stringRes
    })
}

export {nowPlayingProgress}