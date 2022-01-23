declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.webp'
declare module '*.otf'
declare module '*.md'
declare module 'colorthief' {
    type Color = [number, number, number]
    export default class ColorThief {
        getColor: (img: HTMLImageElement | null) => Color
        getPalette: (img: HTMLImageElement | null) => Color[]
    }
}
