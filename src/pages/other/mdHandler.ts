import * as React from 'react'

const changeAtEM = 66

function mdHandler(setIsMobile: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsMobile(mdHandlerBoolean())
}

function mdHandlerBoolean() {
    const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))

    return window.innerWidth / windowFontSize < changeAtEM
}

export { mdHandler, mdHandlerBoolean }
