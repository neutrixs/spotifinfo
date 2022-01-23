import colorThief from 'colorthief'
import { paletteType } from '../nowPlaying'

export default function getColour(setPalette: React.Dispatch<React.SetStateAction<paletteType>>, element: HTMLImageElement) {
    const newColorThief = new colorThief()

    console.log(newColorThief)
}
