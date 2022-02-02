import colorThief from '@neutrixs/colorthief'
import { paletteType } from '../nowPlaying'
import { getMostSaturated, autoAdjust } from './modules/colourModules__obfu'

export default async function getColour(
    setPalette: React.Dispatch<React.SetStateAction<paletteType>>,
    element: HTMLImageElement
) {
    const newColorThief = new colorThief()

    const palettes = newColorThief.getPalette(element, 5)

    const index = getMostSaturated(palettes)

    const selectedPalette = palettes[index]

    const darkPalette = autoAdjust(selectedPalette, 0.4, 0.02)
    const lightPalette = autoAdjust(selectedPalette, 0.7, 0.02)

    setPalette([darkPalette, lightPalette])
}
