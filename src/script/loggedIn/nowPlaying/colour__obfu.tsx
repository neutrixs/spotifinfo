import {NowPlaying} from './nowPlaying'
import {indexMostSaturated,autoAdjust} from './colourModule__obfu'
const colorthief = new window.ColorThief()

type rgbArray = [number,number,number]

function colour(this:NowPlaying){
    const img = document.getElementById('albumArt')
    const palette:rgbArray[] = colorthief.getPalette(img,5)
    const indexNo = indexMostSaturated([...palette])
    const saturatedPalette = palette[indexNo]

    let finalPalette = [saturatedPalette,saturatedPalette]
    finalPalette[0] = autoAdjust(finalPalette[0],0.4,0.02)
    finalPalette[1] = autoAdjust(finalPalette[1],0.75,0.02)

    this.setState({
        palette:finalPalette
    })
}

export {colour}