
const Foo = (() => {
    let _name;

    return class {
        constructor(name) {
            _name = name
        }
        getA() {
            return _name
        }
    }
})()

const a = new Foo(12345)
const b = new Foo('waesrdt')
console.log(a._name);
console.log(a.name);
console.log(a.getA());
console.log(b._name);
console.log(b.name);
console.log(b.getA());


function fn(n) {
    if (n) {
        fn(n - 1)
        console.log(n);
    }
}

fn(10)