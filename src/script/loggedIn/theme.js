const themeChange = function(force){

    const isLight = window.localStorage['dark'] === 'false'
    let modeJquery = isLight ? 'removeClass' : 'addClass'
    let modeVanilla = isLight ? 'remove' : 'add'
    let replaceWith = isLight ? ['black','white'] : ['white','black']

    if(force){
        modeJquery = 'addClass'
        modeVanilla = 'add'
        replaceWith = ['white','black']
    }

    $('body')[0].classList[modeVanilla]('bodyLight')
    $('#nav')[modeJquery]('navLight')
    $('#dropdown_options')[modeJquery]('dropdown_optionsLight')
    $('#dropdown').html($('#dropdown').html().replace(replaceWith[0],replaceWith[1]))
    $('#theme_check')[modeJquery]('none')

    let a = $('a')
    for(let i=0;i<a.length;i++){
        a[i].classList[modeVanilla]('aLight')
    }

    let badge = $('#recaptchaBrandingHolder a')
    for(let i=0;i<badge.length;i++){
        badge[i].classList[modeVanilla]('rcBLight')
    }

    if(!force) window.localStorage['dark'] = isLight;
}

const themeStart = function(){
    if(window.localStorage['dark'] === 'false'){
        themeChange(true)
    }

    $('#theme').on('click',function(){
        themeChange(false)
    })
}

export {themeStart}