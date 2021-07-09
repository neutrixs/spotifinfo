paletteDark = ''
paletteLight = ''
const colour = new ColorThief()
let img = document.getElementById('mainPicture')
img.crossOrigin = 'Anonymous'
img.addEventListener('load',function(){
    paletteDark = (colour.getColor(img)).join(',')
    paletteLight = paletteDark

    checkDarkPalette(paletteDark)
    checkLightPalette(paletteLight)

    setPalette()
})

const setPalette = function(){
    $('#nowPlaying').css('background-color',`rgb(${window.localStorage['dark']=='false'?paletteLight:paletteDark})`)
}

const checkDarkPalette = function(paletteDarkk){
    paletteDarkk = paletteDarkk.split(',')
    let paletteDark2 = [...paletteDarkk]

    if(paletteDarkk.sort((a,b)=>{return a-b})[2] > 128){
        let divideBy = paletteDarkk[2] / 128

        for(i=0;i<paletteDark2.length;i++){
            paletteDark2[i]= Math.floor(paletteDark2[i]/divideBy)
        }

        paletteDark = paletteDark2.join(',')
    }
    else if(paletteDarkk.sort((a,b)=>{return a-b})[2] < 32){
        let divideBy = 32 / paletteDarkk[2]

        for(i=0;i<paletteDark2.length;i++){
            paletteDark2[i] = Math.floor(paletteDark2[i]*divideBy)
        }

        paletteDark = paletteDark2.join(',')
    }
}

const checkLightPalette = function(paletteLightt){
    paletteLightt = paletteLightt.split(',')
    let paletteLight2 = [...paletteLightt]

    if(paletteLightt.sort((a,b)=>{return a-b})[2] < 255){
        let divideBy = 255 / paletteLightt[2]

        for(i=0;i<paletteLight2.length;i++){
            paletteLight2[i]= Math.floor(paletteLight2[i]*divideBy)
        }

        paletteLight = paletteLight2.join(',')
    }
}
