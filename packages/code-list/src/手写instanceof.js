
function instanceof$(inst, base) {
    let proto = inst.__proto__
    const baseProto = base.prototype
    while (proto) {
        if (baseProto === proto) {
            return true
        }
        proto = proto.__proto__
    }
    return false
}

const a = []
console.log(instanceof$(a, Array));
console.log(a instanceof Array);