
function getOrigin(url: string) {
    return url.replace(/([^/])\/[^/].*/, '$1')
}

console.log(getOrigin('https://foo.com/?#%'))
console.log(getOrigin('https://172.18.0.2/foo/bar'))

// https://foo.com
// https://172.18.0.2


function isWholeUrl(url: string) {
    return /^http(s?):\/\//.test(url)
}

function isAbsoluteUrl(url: string) {
    return /^\//.test(url)
}
