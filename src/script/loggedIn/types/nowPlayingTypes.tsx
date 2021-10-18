

type classNone = '' | 'none'
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
    nowPlayingInfoHolderSide: 'nowPlayingInfoHolderSide'|'',
    classNone:classNone,
    palette:Array<number[]>|undefined
}

interface props{
    classNowPlayingMobile:''|'nowPlayingHolderMobile',
    getRecentlyPlayed:Function
}

export { props, NowPlayingState }