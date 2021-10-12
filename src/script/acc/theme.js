const themeChange = function(){
    if(window.localStorage['dark'] == 'false'){
        $('body')[0].classList.remove('bodyLight')
        $('#nav').removeClass('navLight')
        $('#dropdown_options').removeClass('dropdown_optionsLight')
        $('#dropdown').html($('#dropdown').html().replace('black','white'))
        $('#theme_check').removeClass('none')

        let a = $('a')
        for(let i=0;i<a.length;i++){
            a[i].classList.remove('aLight')
        }

        let badge = $('#recaptchaBrandingHolder a')
        for(let i=0;i<badge.length;i++){
            badge[i].classList.remove('rcBLight')
        }

        window.localStorage['dark'] = true
    }
    else{
        $('body')[0].classList.add('bodyLight')
        $('#nav').addClass('navLight')
        $('#dropdown_options').addClass('dropdown_optionsLight')
        $('#dropdown').html($('#dropdown').html().replace('white','black'))
        $('#theme_check').addClass('none')

        let a = $('a')
        for(let i=0;i<a.length;i++){
            a[i].classList.add('aLight')
        }

        let badge = $('#recaptchaBrandingHolder a')
        for(let i=0;i<badge.length;i++){
            badge[i].classList.add('rcBLight')
        }

        window.localStorage['dark'] = false
    }
}

const themeForce = function(){
    $('body')[0].classList.add('bodyLight')
    $('#nav').addClass('navLight')
    $('#dropdown_options').addClass('dropdown_optionsLight')
    $('#dropdown').html($('#dropdown').html().replace('white','black'))
    $('#theme_check').addClass('none')

    let a = $('a')
    for(let i=0;i<a.length;i++){
        a[i].classList.add('aLight')
    }

    let badge = $('#recaptchaBrandingHolder a')
    for(let i=0;i<badge.length;i++){
        badge[i].classList.add('rcBLight')
    }
}

const themeStart = function(){
    if(window.localStorage['dark'] == 'false'){
        themeForce()
    }

    $('#theme').off().on('click',themeChange)
}

export { themeStart }