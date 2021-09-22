(function(){
    let palette = ''
    const colour = new ColorThief()
    let img = document.getElementById('mainPicture')
    img.crossOrigin = 'Anonymous'
    img.addEventListener('load',function(){
        let currentPalette = colour.getPalette(img,5)
        let indexNo = indexMostSaturated([...currentPalette])
        currentPalette = currentPalette[indexNo]
        palette = [currentPalette,currentPalette]
        
        palette[0] = autoAdjustLightness(palette[0],0.35,0.45).join(',')
        palette[1] = autoAdjustLightness(palette[1],0.7,0.8).join(',')
    
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
    
        paletteLight.sort((a,b)=>{return a-b})
        let divideBy = 225 / paletteLight[2]

        for(i=0;i<paletteLight2.length;i++){
            paletteLight2[i]= Math.floor(paletteLight2[i]*divideBy)
        }

        palette[1] = paletteLight2.join(',')
    }

    $('#theme').on('click',function(){
        setTimeout(setPalette,10)
    })
})()