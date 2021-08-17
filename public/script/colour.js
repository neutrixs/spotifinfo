(function(){
    let palette = ''
    const colour = new ColorThief()
    let img = document.getElementById('mainPicture')
    img.crossOrigin = 'Anonymous'
    img.addEventListener('load',function(){
        let currentColour = (colour.getColor(img)).join(',')
        palette = [currentColour,currentColour]
    
        checkDarkPalette(palette[0])
        checkLightPalette(palette[1])
    
        applyPalette((window.localStorage['dark']=='false'?palette[1]:palette[0]).split(','))
    })
    
    const setPalette = function(){
        $('#nowPlaying').css('background-color',`rgb(${window.localStorage['dark']=='false'?palette[1]:palette[0]})`)
    }
    
    const checkDarkPalette = function(paletteDark){
        paletteDark = paletteDark.split(',')
        let paletteDark2 = [...paletteDark]
    
        if(paletteDark.sort((a,b)=>{return a-b})[2] > 128){
            let divideBy = paletteDark[2] / 128
    
            for(i=0;i<paletteDark2.length;i++){
                paletteDark2[i]= Math.floor(paletteDark2[i]/divideBy)
            }
    
            palette[0] = paletteDark2.join(',')
        }
        else if(paletteDark.sort((a,b)=>{return a-b})[2] < 32){
            let divideBy = 32 / paletteDark[2]
    
            for(i=0;i<paletteDark2.length;i++){
                paletteDark2[i] = Math.floor(paletteDark2[i]*divideBy)
            }
    
            palette[0] = paletteDark2.join(',')
        }
    }
    
    const checkLightPalette = function(paletteLight){
        paletteLight = paletteLight.split(',')
        let paletteLight2 = [...paletteLight]
    
        if(paletteLight.sort((a,b)=>{return a-b})[2] < 255){
            let divideBy = 255 / paletteLight[2]
    
            for(i=0;i<paletteLight2.length;i++){
                paletteLight2[i]= Math.floor(paletteLight2[i]*divideBy)
            }
    
            palette[1] = paletteLight2.join(',')
        }
    }

    const hexToRGB = function(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    
        if (alpha) {
            return [r,g,b,alpha];
        } else {
            return [r,g,b]
        }
    }
    
    const applyPalette = function(palette){
        let nowPlayingHeight = $('#nowPlaying').outerHeight()
        let currentScroll = window.scrollY
        let alpha
        console.log(currentScroll)
        console.log(nowPlayingHeight)

        if(currentScroll >= nowPlayingHeight){
            alpha = 0
        }
        else{
            alpha = 1 - currentScroll / nowPlayingHeight
        }

        let rgbaBackground = `rgba(${palette[0]},${palette[1]},${palette[2]},${alpha})`

        $('#bodyOverlayBackground').css('background-color',rgbaBackground)
        $('#navOverlayBackground').css('background-color',rgbaBackground)
        $('#dropdown_options3').css('background-color',rgbaBackground)
    }

    document.addEventListener('scroll',function(e){
        console.log('hello?')
        if(palette) applyPalette((window.localStorage['dark']=='false'?palette[1]:palette[0]).split(','))
    })

    $('#theme').on('click',function(){
        setTimeout(function(){
            if(palette) applyPalette((window.localStorage['dark']=='false'?palette[1]:palette[0]).split(','))
        },10)
    })
})()