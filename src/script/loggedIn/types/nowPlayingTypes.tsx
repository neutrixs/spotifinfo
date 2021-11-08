

interface progress{
    currentMs: number|null,
    totalMs: number|null,
    isPlaying: boolean
}
interface NowPlayingState {
    isPlaying:boolean,
    albumArtSrc:string,
    albumArtLinkSrc:string,
    nowPlayingTitle:string,
    nowPlayingTitleLink:string,
    Artists:Array<JSX.Element>,
    nowPlayingInterval: NodeJS.Timer,
    nowPlayingProgressInterval: NodeJS.Timer,
    nowPlayingProgress: progress,
    nowPlayingProgressStr: string,
    nowPlayingInfoHolderSide: boolean,
    classNone:boolean,
    palette:Array<number[]>|undefined
}

interface props{
    classNowPlayingMobile:boolean,
    getRecentlyPlayed:Function
    isDark:boolean
}

export { props, NowPlayingState }