function colourStart(indexMostSaturated,autoAdjustLightness){
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

    $('#theme').on('click',function(){
        setTimeout(setPalette,10)
    })
}

export { colourStart }