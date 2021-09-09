(function(){
    let palette = ''
    const colour = new ColorThief()
    let img = document.getElementById('mainPicture')
    img.crossOrigin = 'Anonymous'
    img.addEventListener('load',function(){
        let currentPalette = (colour.getPalette(img,5)[2]).join(',')
        palette = [currentPalette,currentPalette]
    
        checkDarkPalette(palette[0])
        checkLightPalette(palette[1])

        palette[0] = halfOpacity(palette[0],true)
        palette[1] = halfOpacity(palette[1],false)
    
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

    const halfOpacity = function(arr,dark){
        let baseBackground
        let style = getComputedStyle(document.body)
        let res = []

        arr = arr.split(',')

        if(dark){
            baseBackground = style.getPropertyValue('--background-dark')
        }
        else{
            baseBackground = style.getPropertyValue('--background-light')
        }

        baseBackground = hexToRGB(baseBackground)

        for(i=0;i<3;i++){
            arr[i] = parseInt(arr[i])
            res[i] = Math.floor( ( arr[i] + baseBackground[i] ) / 2 )
        }

        return res.join(',')
    }

    const hexToRGB = function(hex){
        hex = hex.replace('#','')

        hex = parseInt(hex,16)

        let red = Math.floor(hex / 256**2)
        let green = Math.floor(hex % 256**2 / 256)
        let blue = hex % 256**2 % 256

        return [red, green, blue]
    }

    $('#theme').on('click',function(){
        setTimeout(setPalette,10)
    })
})()