const windowOnResize = function(setNPSideText,mobileDesktopSizeHandler){
    window.onresize = function(){
        mobileDesktopSizeHandler()
        setNPSideText()
        setTimeout(setNPSideText,300)
    }
    setNPSideText()
}

export { windowOnResize }