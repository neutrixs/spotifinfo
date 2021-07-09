const mobile = function(){
    $('#holder').addClass('margin0')
    $('#nowPlaying').addClass('nowPlayingMobile')
}
const desktop = function(){
    $('#holder').removeClass('margin0')
    $('#nowPlaying').removeClass('nowPlayingMobile')
}

let changeAt = 44.5
if($(window).width() / parseFloat($("body").css("font-size")) < changeAt) mobile();
$('#holder').removeClass('none').addClass('ts300ms')

window.onresize = function(){
    width = this.innerWidth;
    
    emWidth = $(window).width() / parseFloat($("body").css("font-size"))
    if(emWidth < changeAt){
        mobile()
    }
    else{
        desktop()
    }
}