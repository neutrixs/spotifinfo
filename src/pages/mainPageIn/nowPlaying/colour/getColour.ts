import colorThief from 'colorthief'
import { paletteType } from '../nowPlaying'
import { getMostSaturated } from './modules/colourModules__obfu'

export default function getColour(setPalette: React.Dispatch<React.SetStateAction<paletteType>>, element: HTMLImageElement) {
    const newColorThief = new colorThief()

    const palettes = newColorThief.getPalette(element, 5)

    const index = getMostSaturated(palettes)

    const selectedPalette = palettes[index]

    console.log(selectedPalette)
}
