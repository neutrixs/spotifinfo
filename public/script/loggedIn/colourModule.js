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