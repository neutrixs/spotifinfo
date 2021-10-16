const changeAt = 44.5
const bodyFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size')

const mobile = function(){
    document.getElementById('page').classList.add('pageMobile')
    document.getElementById('nowPlaying').classList.add('nowPlayingHolderMobile')
}
const desktop = function(){
    document.getElementById('page').classList.remove('pageMobile')
    document.getElementById('nowPlaying').classList.remove('nowPlayingHolderMobile')
}

const handler = function(){
    let width = window.innerWidth;
        
    let emWidth = width / parseFloat(bodyFontSize)
    if(emWidth < changeAt){
        mobile()
    }
    else{
        desktop()
    }
}

const mobileDesktopStart = function(){
    if(window.innerWidth / parseFloat(bodyFontSize) < changeAt) mobile();
    document.getElementById('page').classList.add('transition300ms')
    window.addEventListener('resize',handler)
}
const mobileDesktopStop = function(){
    window.removeEventListener('resize',handler)
}

export { mobileDesktopStart, mobileDesktopStop }