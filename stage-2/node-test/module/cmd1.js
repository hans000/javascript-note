const bar = require('./cmd2.js')
console.log(1);
function foo(invoker) {
    console.log(invoker + ' invokes foo.js');
    bar('foo.js');
}
module.exports = foo;