
function getByteLength(str) {
    return Object.keys(str).reduce((s, i) => {
        const c = str.charCodeAt(i)
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
            s += 1;  
        } else {  
            s += 2;  
        }  
        return s
    }, 0)
}

console.log(getByteLength('1234'));
console.log(getByteLength('acuc'));
console.log(getByteLength('外外'));
console.log(getByteLength('外12'));
console.log(getByteLength('~~12'));