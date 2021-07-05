const themeChange = function(){
    if(window.localStorage['dark'] == 'false'){
        $('body')[0].classList.remove('bodyLight')
        $('#nav').removeClass('navLight')
        $('#dropdown_options').removeClass('dropdown_optionsLight')
        $('#dropdown').html($('#dropdown').html().replace('black','white'))
        $('#theme_check').removeClass('none')

        let a = $('a')
        for(i=0;i<a.length;i++){
            a[i].classList.remove('aLight')
        }

        let selected = $('.selectedLight')
        for(i=0;i<selected.length;i++){
            selected[i].classList.replace('selectedLight','selected')
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
        for(i=0;i<a.length;i++){
            a[i].classList.add('aLight')
        }

        let selected = $('.selected')
        for(i=0;i<selected.length;i++){
            selected[i].classList.replace('selected','selectedLight')
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
    for(i=0;i<a.length;i++){
        a[i].classList.add('aLight')
    }

    let selected = $('.selected')
    for(i=0;i<selected.length;i++){
        selected[i].classList.replace('selected','selectedLight')
    }
}

if(window.localStorage['dark'] == 'false'){
    themeForce()
}

$('#theme').off().on('click',themeChange)