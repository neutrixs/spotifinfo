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
    
        setPalette()
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

    $('#theme').on('click',function(){
        setTimeout(setPalette,10)
    })
})()