const albumArtTotalWidth = 21.5

function sideTextDetectBoolean(isMobile: boolean): boolean {
    const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
    const windowWidth = window.innerWidth

    const nowPlayingWidth = windowWidth - (isMobile ? 3 : 23) * windowFontSize

    return (albumArtTotalWidth * windowFontSize) / nowPlayingWidth < 0.5
}

function sideTextDetect(isMobile: boolean, setSideText: React.Dispatch<React.SetStateAction<boolean>>) {
    return setSideText(sideTextDetectBoolean(isMobile))
}

export { sideTextDetectBoolean, sideTextDetect }
