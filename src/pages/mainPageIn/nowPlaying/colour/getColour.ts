import { paletteType } from '../nowPlaying'
import { getMostSaturated, autoAdjust } from './modules/colourModules'

export default async function getColour(
    setPalette: React.Dispatch<React.SetStateAction<paletteType>>,
    element: HTMLImageElement
) {
    const { default: colorThief } = await import('@neutrixs/colorthief')
    const newColorThief = new colorThief()

    await element.decode()

    const palettes = newColorThief.getPalette(element, 5)

    const index = getMostSaturated(palettes)

    const selectedPalette = palettes[index]

    const darkPalette = autoAdjust(selectedPalette, 0.4, 0.02, 0.8)
    const lightPalette = autoAdjust(selectedPalette, 0.7, 0.02, 0.8)

    setPalette([darkPalette, lightPalette])
}
