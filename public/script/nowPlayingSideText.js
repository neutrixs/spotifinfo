const setNPSideText = function(){
    const picHolderWidth = $('#mainPictureHold').innerWidth()
    const nowPlayingWidth = $('#nowPlaying').width()

    if(picHolderWidth / nowPlayingWidth < 0.5){
        $('#mainInfoHolder').addClass('mainInfoHolderSide')
        return
    }
    $('#mainInfoHolder').removeClass('mainInfoHolderSide')
}