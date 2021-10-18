import {NowPlaying} from './nowPlaying'

let listener = function(this:NowPlaying){
    const imgHolderWidth = 21.5 * parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
    const nowPlayingWidth = document.getElementById('nowPlaying').clientWidth
    const side = imgHolderWidth / nowPlayingWidth < 0.5

    this.setState({
        nowPlayingInfoHolderSide: side ? 'nowPlayingInfoHolderSide' : ''
    })
    console.log('ismounted is fucking ')
}

function startListener(this:NowPlaying){
    listener = listener.bind(this)
    window.addEventListener('resize',listener)
}

function stopListener(this:NowPlaying){
    window.removeEventListener('resize',listener)
}

export {startListener, stopListener, listener}