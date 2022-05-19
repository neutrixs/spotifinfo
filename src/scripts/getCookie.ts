export default function getCookie() {
    /**
     * https://stackoverflow.com/a/50452780/14063158
     */

    return document.cookie.split('; ').reduce((prev: { [key: string]: string }, current) => {
        const [name, ...value] = current.split('=')
        prev[name] = value.join('=')
        return prev
    }, {})
}
