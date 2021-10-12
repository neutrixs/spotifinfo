const themeChange = function(){
    if(window.localStorage['dark'] == 'false'){
        window.$('body')[0].classList.remove('bodyLight')
        window.$('#nav').removeClass('navLight')
        window.$('#dropdown_options').removeClass('dropdown_optionsLight')
        window.$('#dropdown').html(window.$('#dropdown').html().replace('black','white'))
        window.$('#theme_check').removeClass('none')

        let a = window.$('a')
        for(let i=0;i<a.length;i++){
            a[i].classList.remove('aLight')
        }

        let selected = window.$('.selectedLight')
        for(let i=0;i<selected.length;i++){
            selected[i].classList.replace('selectedLight','selected')
        }

        let badge = window.$('#recaptchaBrandingHolder a')
        for(let i=0;i<badge.length;i++){
            badge[i].classList.remove('rcBLight')
        }

        window.localStorage['dark'] = true
    }
    else{
        window.$('body')[0].classList.add('bodyLight')
        window.$('#nav').addClass('navLight')
        window.$('#dropdown_options').addClass('dropdown_optionsLight')
        window.$('#dropdown').html(window.$('#dropdown').html().replace('white','black'))
        window.$('#theme_check').addClass('none')

        let a = window.$('a')
        for(let i=0;i<a.length;i++){
            a[i].classList.add('aLight')
        }

        let selected = window.$('.selected')
        for(let i=0;i<selected.length;i++){
            selected[i].classList.replace('selected','selectedLight')
        }

        let badge = window.$('#recaptchaBrandingHolder a')
        for(let i=0;i<badge.length;i++){
            badge[i].classList.add('rcBLight')
        }

        window.localStorage['dark'] = false
    }
}

const themeForce = function(){
    window.$('body')[0].classList.add('bodyLight')
    window.$('#nav').addClass('navLight')
    window.$('#dropdown_options').addClass('dropdown_optionsLight')
    window.$('#dropdown').html(window.$('#dropdown').html().replace('white','black'))
    window.$('#theme_check').addClass('none')

    let a = window.$('a')
    for(let i=0;i<a.length;i++){
        a[i].classList.add('aLight')
    }

    let selected = window.$('.selected')
    for(let i=0;i<selected.length;i++){
        selected[i].classList.replace('selected','selectedLight')
    }

    let badge = window.$('#recaptchaBrandingHolder a')
    for(let i=0;i<badge.length;i++){
        badge[i].classList.add('rcBLight')
    }
}

const themeStart = function(){
    if(window.localStorage['dark'] == 'false'){
        themeForce()
    }

    window.$('#theme').off().on('click',themeChange)
}

export { themeStart }