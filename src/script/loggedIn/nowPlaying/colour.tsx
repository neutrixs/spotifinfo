import {NowPlaying} from './nowPlaying'
import {indexMostSaturated,autoAdjustLightness} from './colourModule'
const colorthief = new window.ColorThief()
const img = document.getElementById('albumArt')
function colour(this:NowPlaying){
    const palette:Array<number[]> = colorthief.getPalette(img,5)
    const indexNo = indexMostSaturated([...palette])
    const saturatedPalette = palette[indexNo]

    let finalPalette = [saturatedPalette,saturatedPalette]
    finalPalette[0] = autoAdjustLightness(finalPalette[0],0.35,0.45)
    finalPalette[1] = autoAdjustLightness(finalPalette[1],0.7,0.8)

    this.setState({
        palette:finalPalette
    })
}

export {colour}