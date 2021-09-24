const hexToRGB = function(hex){
    hex = hex.replace('#','')

    hex = parseInt(hex,16)

    let red = Math.floor(hex / 256**2)
    let green = Math.floor(hex % 256**2 / 256)
    let blue = hex % 256**2 % 256

    return [red, green, blue]
}

const RGBToHSV = function(arr) {
    r = parseInt(arr[0])
    g = parseInt(arr[1])
    b = parseInt(arr[2])
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}

function RGBToHSL(rgb){
    let r = rgb[0]
    let g = rgb[1]
    let b = rgb[2]
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function HSLToRGB(hsl){
    let h = hsl[0]
    let s = hsl[1]
    let l = hsl[2]
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const indexMostSaturated = function(list){
    
    for( i=0; i < list.length; i++ ){
        list[i] = { ...RGBToHSV( list[i] ) }
        list[i]['indexNo'] = i
    }

    list.sort( (a,b) => { return b.s-a.s } )

    return list[0].indexNo
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

const checkLightness = function(rgb){

    const r = 1/255*rgb[0]
    const g = 1/255*rgb[1]
    const b = 1/255*rgb[2]

    return Math.sqrt( 0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2 )
}

const changeHSLLightness = function(rgb,valuePercent){
    hsl = RGBToHSL(rgb)

    hsl[2] += valuePercent/100

    rgb = HSLToRGB(hsl)
    
    return rgb
}

const changeLightness = function(toIncrease,rgb,rangeLower,rangeUpper){
    for(i=0;i<100;i++){ //maximum is 100 because i will increase/decrease hsl lightness each by 1%
        rgb = changeHSLLightness(rgb,toIncrease?1:-1)

        let lightness = checkLightness(rgb)
        if(lightness > rangeLower && lightness < rangeUpper) break
    }

    return rgb
}

const autoAdjustLightness = function(rgb,rangeLower,rangeUpper){
    const currentLightness = checkLightness(rgb)

    if(currentLightness < rangeLower){
        rgb = changeLightness(true,rgb,rangeLower,rangeUpper)
    }
    else if(currentLightness > rangeUpper){
        rgb = changeLightness(false,rgb,rangeLower,rangeUpper)
    }

    for( i=0; i<3; i++ ){
        rgb[i] = Math.round(rgb[i])
    }

    return rgb
}