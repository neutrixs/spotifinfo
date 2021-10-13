const themeChange = function(force){

    const isLight = window.localStorage['dark'] === 'false'
    let modeJquery = isLight ? 'removeClass' : 'addClass'
    let modeVanilla = isLight ? 'remove' : 'add'

    if(force){
        modeJquery = 'addClass'
        modeVanilla = 'add'
    }

    $('body')[0].classList[modeVanilla]('bodyLight')
    $('#nav')[modeJquery]('navLight')

    let a = $('a')
    for(let i=0;i<a.length;i++){
        a[i].classList[modeVanilla]('aLight')
    }

    if(!force) window.localStorage['dark'] = true;
}

const themeStart = function(){
    if(window.localStorage['dark'] == 'false'){
        themeChange(true)
    }

    $('#theme').off().on('click',function(){
        themeChange(false)
    })
}

export { themeStart }