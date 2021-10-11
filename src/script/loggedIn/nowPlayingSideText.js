const setNPSideText = function(){
    const picHolderWidth = 21.5 * parseFloat($("body").css("font-size"))
    const holderWidth = $('#holder').width()

    if(picHolderWidth / holderWidth < 0.5){
        $('#mainInfoHolder').addClass('mainInfoHolderSide')
        return
    }
    $('#mainInfoHolder').removeClass('mainInfoHolderSide')
}

export { setNPSideText }