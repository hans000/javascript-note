

function useState(value) {
    let _val = {value}
    function setState(val) {
        _val.value = val
    }
    return [_val, setState]
}

const [count, setCount] = useState(0)

console.log(count.value);
setCount(1)
console.log(count.value);