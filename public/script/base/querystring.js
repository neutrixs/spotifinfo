function encodeQueryString(obj) {
    let str = [];
    for (var p in obj){
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}

function decodeQueryString(str){
    let obj = {}
    str = str.split("&")

    for(p of str){
        p = p.split("=")

        p[0] = decodeURIComponent(p[0])
        p[1] = decodeURIComponent(p[1])

        obj[p[0]] = p[1]
    }
    return obj
}