/**
 * https://stackoverflow.com/a/9493060
 * h, s, l values are [0,1]
 */

function hslToRgb(h: number, s: number, l: number) {
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

export { getMostSaturated }
