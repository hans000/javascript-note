## 1. 开发中的问题

### 关于提高用户体验

比如做下面类似这样的导航条

![1562480912249](D:\_study\web\assets\1562480912249.png)

看似没有问题，其实里面还是有问题的，就是用户体验不是太好，审查元素会发现，**写文章**区域比较小，而详情页会则是几乎铺满了li的区域，这里也是使用UI框架所需注意的，更正的方式很简单，标签嵌套关系调换一下就可以了。

![1562480902603](D:\_study\web\assets\1562480902603.png)

![1562480893981](D:\_study\web\assets\1562480893981.png)

![1562480880080](D:\_study\web\assets\1562480880080.png)

### 常用的组件抽离出来

- 比如login和regisger组件里的校验

```
const register = (data) => {
  let { username, password, repassword, code } = data

  if (!validate(username.rule, username.value)) {
    username.callback()
    return false
  }
  if (!validate(password.rule, password.value)) {
    password.callback()
    return false
  }
  if (!validate(repassword.rule, repassword.value)) {
    repassword.callback()
    return false
  }
  if (!validate(code.rule, code.value)) {
    code.callback()
    return false
  }
  return true
}

const login = (data) => {
  let { username, password } = data

  if (!validate(username.rule, username.value)) {
    username.callback()
    return false
  }
  if (!validate(password.rule, password.value)) {
    password.callback()
    return false
  }
  return true
}

const write = (data) => {
  let { title, category, description, text } = data
  
  return Object.values(data).some(e => {
    return !validate(e.rule, e.value)
  })

  if (!validate(title.rule, title.value)) {
    title.callback()
    return false
  }
  if (!validate(category.rule, category.value)) {
    category.callback()
    return false
  }
  if (!validate(description.rule, description.value)) {
    description.callback()
    return false
  }
  if (!validate(text.rule, text.value)) {
    text.callback()
    return false
  }
  return true
}

const validate = (rule, value) => {
  let reg = new RegExp(rule)
  return reg.test(value)
}

export default {
  register,
  login,
  write,
  validate,
}
```



## 2. 一些算法

### 数组操作

1. 给出数组[1, 2, 'a', '3']，把其实的数字进行累积

   ```
   [1, 2, 'a', '3'].reduce((s, e) => {
   	if (typeof e === 'number') {
   		s *= e
   	}
   	return s
   }, 1)
   
   // 2
   ```

   > 注意点

   reduce每次循环必须有return值，区别与filter

2. 给出数组[1, 2, 'a', '3']，筛选其数字并加1，返回新数组

   ```js
   [1, 2, 'a', '3'].filter(e => typeof e === 'number').map(e => ++e)
   
   // [2, 3]
   ```

   > 注意点

   return 必须为++e而非e++

3. 
   ```
   a = 1
   function func() {
   	a = 2
   	return () => {
   		a = 3
   		console.log(this.a)	// 3
   	}
   }
   console.log(this.a)	// 1
   func()
   console.log(this.a)	// 2
   func()()
   console.log(this.a)	// 4
   
   // 1
   // 2
   // 3
   // 3
   ```

4. 将[6,5,3,3,2,4,1]去重并排序

   ```
   [...new Set([6, 5, 3, 3, 2, 4, 1])].sort((a, b) => a - b)
   
   // [1, 2, 3, 4, 5, 6]
   ```

5. 将obj = {a:1,b:2,c:3}改下为[['a','b','c'],[1,2,3]]

   ```
   [Object.keys(obj), Object.values(obj)]
   
   // [['a', 'b', 'c'],[1, 2, 3]]
   ```

6. 将数组arr = [{x:1,y:1},{x:2,y:1},{x:3,y:3},{x:2,y:1}]中的相同元素去除，并返回新数组

   ``` 
   arr.reduce((s, e)=> {
   	if(!s.some(el => el.x === e.x && el.y === e.y)) {
   		s.push(e)
   	}
   	return s
   }, [])
   
   // [{x:1,y:1},{x:2,y:1},{x:3,y:3}]
   ```

7. 前端优化方案

   - 1
   - 2

8. 实现深拷贝

   ```
   
   ```

9. 介绍一下Set Map对象



## 一些问题

1. h5新增标签，为啥加强标签语义化

   常用的新增标签：header nav main section asider footer canvas video audio

- 对开发者友好，结构清晰，便于开发维护
- 对设备优化，利于SEO，利于设备解析（屏幕阅读器、盲人阅读器）

2. 为啥要清楚浮动，如何清除浮动

   高度塌陷

- 父元素设置高度
- overflow：hidden
- clear：both

3. 行内元素、块元素有那些，有什么不同

   行内：span input img button a（宽、高内容撑开）

   块：div p h1-h6 ul dl（宽度独占一行，高度内容撑开）

   现象

   - 行内元素默认水平排列
   - 块级元素可以包含行内元素和块级元素，行内元素不能包含块级元素
   - 行内元素设置width height无效，margin上下无效，padding上下无效。

4. 前端存储方式有那些

- cookie 请求头上带着数据，大小是4KB，document.cookie = '名字=值'
- sessionStorage 本地存储，关闭页面后即被清空
- localstorage 本地存储，key-value存储，永久存储，5MB
- application cache 离线缓存，离线浏览，提升页面载入速度

5. VUE双向绑定的原理

6. css不换行、超出省略号

   ```
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
   ```

7. 跨域问题



