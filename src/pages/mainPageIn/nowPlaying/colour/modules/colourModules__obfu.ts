type rgb = [number, number, number]

/**
 * https://stackoverflow.com/a/9493060
 * h, s, l values are [0,1]
 *
 * @returns array of rgb [0,255]
 */

function hslToRgb(h: number, s: number, l: number): rgb {
    var r, g, b

    if (s == 0) {
        r = g = b = l // achromatic
    } else {
        var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/**
 * r, g, b values are [0,1]
 */

function rgbToHsl(r: number, g: number, b: number) {
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    var h,
        s,
        l = (max + min) / 2

    if (max == min) {
        h = s = 0 // achromatic
    } else {
        var d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return { h, s, l }
}

type getPaletteReturnType = [number, number, number][]

/**
 * @param palettes array of array of rgb values [0,255]
 */

function getMostSaturated(palettes: getPaletteReturnType) {
    interface newEachPaletteType extends ReturnType<typeof rgbToHsl> {
        originalIndex: number
    }

    let palettesInHSL: newEachPaletteType[] = []

    for (let i = 0; i < palettes.length; i++) {
        const currentPaletteInHSL = rgbToHsl(palettes[i][0] / 255, palettes[i][1] / 255, palettes[i][2] / 255)

        palettesInHSL.push({ ...currentPaletteInHSL, originalIndex: i })
    }

    palettesInHSL.sort((a, b) => b.s - a.s)

    return palettesInHSL[0].originalIndex
}

/**
 * @param rgbVal array of rgb values [0,255]
 */

function getLightness(rgbVal: rgb) {
    const r = rgbVal[0] / 255
    const g = rgbVal[1] / 255
    const b = rgbVal[2] / 255

    /**
     * http://alienryderflex.com/hsp.html
     * https://web.archive.org/web/20220107173803/http://alienryderflex.com/hsp.html
     */

    const lightness = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2)

    return lightness
}

/**
 *
 * @param rgbVal array of rgb values [0,255]
 * @param targetLightness target lightness [0,1]
 * @param tolerance lightness difference tolerance [0,1]
 * @param maxSaturation [0,1]
 */

function autoAdjust(rgbVal: rgb, targetLightness: number, tolerance: number, maxSaturation: number): rgb {
    const lightness = getLightness(rgbVal)

    if (targetLightness - tolerance < lightness && lightness < targetLightness + tolerance) return rgbVal

    const shouldIncrease = lightness < targetLightness ? true : false

    let currentRGBValue: rgb = [...rgbVal]

    for (let i = 0; i < 100; i++) {
        let HSLVal = rgbToHsl(currentRGBValue[0] / 255, currentRGBValue[1] / 255, currentRGBValue[2] / 255)
        shouldIncrease ? (HSLVal.l += 0.01) : (HSLVal.l -= 0.01)

        currentRGBValue = hslToRgb(HSLVal.h, HSLVal.s, HSLVal.l)

        const newLightness = getLightness(currentRGBValue)

        if (targetLightness - tolerance < newLightness && newLightness < targetLightness + tolerance) break
    }

    const HSLVal = rgbToHsl(currentRGBValue[0] / 255, currentRGBValue[1] / 255, currentRGBValue[2] / 255)

    HSLVal.s > maxSaturation ? (HSLVal.s = maxSaturation) : null

    currentRGBValue = hslToRgb(HSLVal.h, HSLVal.s, HSLVal.l)

    return currentRGBValue
}

export { getMostSaturated, autoAdjust }
