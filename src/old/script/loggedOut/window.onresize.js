const windowOnResize = function(mobileDesktopSizeHandler){
    window.onresize = function(){
        mobileDesktopSizeHandler()
    }
}

export { windowOnResize }