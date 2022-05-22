import { useState, useEffect } from 'react'
import useDimension from './useDimension'

/**
 * @param maxWidth max width in EM to be considered mobile
 */
export default function useIsMobile(maxWidth: number) {
    const { width: windowWidthInPX } = useDimension()
    const [isMobile, setIsMobile] = useState(convertPXToEM(windowWidthInPX) < maxWidth)

    useEffect(() => {
        setIsMobile(convertPXToEM(windowWidthInPX) < maxWidth)
    }, [windowWidthInPX])

    return isMobile
}

function convertPXToEM(PX: number) {
    // using document font size because it's for the whole window
    const documentFontSizeInPX = parseFloat(getComputedStyle(document.body).fontSize)

    return PX / documentFontSizeInPX
}
