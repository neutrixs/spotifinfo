/**
 * https://stackoverflow.com/a/27232658
 */

export default function support_format_webp() {
    var elem = document.createElement('canvas')

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
    } else {
        // very old browser like IE 8, canvas not supported
        return false
    }
}
