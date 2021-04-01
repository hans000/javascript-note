
被React.memo包裹后displayName失效


``` jsx
// ✅ 函数
function Child() { } 
>>> displayName -> Child

✅ 函数覆盖
const Child = () => { }
Child.displayName = 'ChildChild'
>>> displayName -> ChildChild

// ✅ 字面量
const Child = () => { }
>>> displayName -> Child

// ✅ 字面量覆盖
const Child = () => { }
Child.displayName = 'ChildChild'
>>> displayName -> ChildChild

// ✅ 函数，memo包裹
function Child() { }
const MemoChild = React.memo(Child)
>>> displayName -> Child

// ✅ 字面量，memo包裹
const Child = () => { }
const MemoChild = React.memo(Child)
MemoChild.displayName = 'Child'
>>> displayName -> Child

// ❌ 字面量，memo包裹
const Child = memo(() => { })
>>> displayName -> Anonymous

// ❌ 字面量，memo内联包裹
const Child = memo(() => { })
Child.displayName = 'Child'
>>> displayName -> Anonymous

// ✅ 函数，memo内联包裹
const Child = memo(function Child() { })
>>> displayName -> Child
```
