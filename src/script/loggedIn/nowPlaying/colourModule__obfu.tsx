const RGBToHSV = function(arr:number[]) {
    const r = arr[0]
    const g = arr[1]
    const b = arr[2]
    let rabs, gabs, babs, rr, gg, bb, h, s, v:number, diff:number, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = (c:number):number => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = (num:number):number => Math.round(num * 100) / 100;
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
interface list2key {
    h:number
    s:number
    v:number
    indexNo?:number
}
type list2 = Array<list2key>

const indexMostSaturated = function(list:Array<number[]>){
    let list2:list2 = []
    
    for( let i=0; i < list.length; i++ ){
        list2[i] = { ...RGBToHSV( list[i] ) }
        list2[i]['indexNo'] = i
    }

    list2.sort( (a,b) => { return b.s-a.s } )

    return list2[0].indexNo
}

/**
 * new implementation testing below (plus refactor of old one)
 */

type rgbArray = [number,number,number]

interface HSL{
    h:number
    s:number
    l:number
}

const steps = [32,16,8,4,2,1,0]

/**
 * 
 * @param rgb value between 0-255 [r,g,b]
 * @param targetLightness value between 0-1 (could be float)
 * @param tolerance percentage of tolerance (0-1)
 */

function autoAdjust(rgb:rgbArray,targetLightness:number,tolerance:number):rgbArray{
    let currentStepsIndex:number = 0
    let currentLightness:number = checkLightness(rgb)
    const toIncrease = currentLightness < targetLightness

    if(currentLightness > targetLightness - tolerance && currentLightness < targetLightness + tolerance){
        return rgb
    }

    for( let i = 0; i < 100; i++){ // no while loop because it may crash
        if(currentLightness > targetLightness - tolerance && currentLightness < targetLightness + tolerance){
            break
        }

        const rgbNow:rgbArray = changeHSLLight([...rgb],toIncrease?steps[currentStepsIndex]:-steps[currentStepsIndex])
        const lightnessNow = checkLightness(rgbNow)
        const toIncreaseNow = lightnessNow < targetLightness

        if(toIncreaseNow !== toIncrease){
            currentStepsIndex++
            if(steps[currentStepsIndex] == 0) break // there is no point of continuing it if it's zero
            continue
        }

        rgb = rgbNow
        currentLightness = lightnessNow
    }

    return rgb
}

/**
 * @param rgb value between 0-255 [r,g,b]
 * @param value in PERCENTAGE (0-100)
 */

function changeHSLLight(rgb:rgbArray,value:number):rgbArray{
    let hsl = RGBTHSL(rgb)
    hsl.l += value * 0.01 // i heard somewhere that multiplying is better than dividing

    return HSLTRGB(hsl)
}

function RGBTHSL(rgb:rgbArray):HSL{ //https://stackoverflow.com/a/9493060/14063158
    const r = rgb[0]/255
    const g = rgb[1]/255
    const b = rgb[2]/255

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

    return {
        h,s,l
    }
}

function HSLTRGB(hsl:HSL):rgbArray{ //https://stackoverflow.com/a/9493060/14063158
    var r:number, g:number, b:number

    const h = hsl.h
    const s = hsl.s
    const l = hsl.l

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p:number, q:number, t:number){
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

function checkLightness(rgb:rgbArray):number{
    const r = 1/255*rgb[0]
    const g = 1/255*rgb[1]
    const b = 1/255*rgb[2]

    return Math.sqrt( 0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2 )
}

export {
    indexMostSaturated,
    autoAdjust,
}