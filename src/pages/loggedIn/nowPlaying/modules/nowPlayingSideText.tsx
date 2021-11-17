import {NowPlaying} from '../nowPlaying'

let listener = function(this:NowPlaying){
    const emSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))

    const imgHolderWidth = 21.5 * emSize

    // if it's a mobile version, calculate the 3em (now playing padding), else, calculate the 3em + left + right margin (which is 10em each)
    // why? because using clientWidth will return 0 if it's just being rendered
    const nowPlayingWidth = window.innerWidth - (this.props.classNowPlayingMobile ? 3 : 23 * emSize)

    const side = imgHolderWidth / nowPlayingWidth < 0.5

    this.setState({
        nowPlayingInfoHolderSide: side ? true : false
    })
}

export {listener}