paletteDark = ''
paletteLight = ''
const colour = new ColorThief()
let img = document.getElementById('mainPicture')
img.crossOrigin = 'Anonymous'
img.addEventListener('load',function(){
    paletteDark = colour.getColor(img)
    paletteLight = colour.getColor(img)

    checkDarkPalette(paletteDark)
    checkLightPalette(paletteLight)

    setPalette()
})

const setPalette = function(){
    $('#nowPlaying').css('background-color',`rgb(${window.localStorage['dark']=='false'?paletteLight:paletteDark})`)
}

const darkestPalette = function(palette){
    for(i=0;i<palette.length;i++){
        palette[i].sort(function(a,b){return a-b})
    }
    if(palette[0][palette[0].length-1] < palette[1][palette[1].length-1]){
        return [0,1]
    }
    else {
        return [1,0]
    }
}

const checkDarkPalette = function(paletteDarkk){
    let paletteDark2 = paletteDarkk

    if(paletteDarkk.sort((a,b)=>{return a-b})[2] > 128){
        let divideBy = paletteDarkk[2] / 128

        for(i=0;i<paletteDark2.length;i++){
            paletteDark2[i]= Math.floor(paletteDark2[i]/divideBy)
        }

        paletteDark = paletteDark2.join(',')
    }
}

const checkLightPalette = function(paletteLightt){
    let paletteLight2 = paletteLightt

    if(paletteLightt.sort((a,b)=>{return a-b})[0] < 128){
        let divideBy = 255 / paletteLightt[2]

        for(i=0;i<paletteLight2.length;i++){
            paletteLight2[i]= Math.floor(paletteLight2[i]*divideBy)
        }

        paletteLight = paletteLight2.join(',')
    }
}
