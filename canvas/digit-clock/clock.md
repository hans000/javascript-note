## 引言

本人第一次发帖，有什么不妥之处还望大家包涵（有什么想法或者意见都可以在评论区留言），好了废话不多说，看下我要介绍的东西。



## 案例介绍

炫酷的数字时钟，使用canvas绘制，这个案例来源于B站一个视频，但是实现思路完全是自己摸索的，效果如下图

![Honeycam 2019-06-12 09-57-49](C:\Users\hans\Pictures\Honeycam 2019-06-12 09-57-49.gif)

## 知识点

案例涉及的东西不是特别多，我大致罗列下：

+ canvas的基本使用，绘制圆
+ 动画中的requestAnimationFrame与定时器
+ 按位运算与数组构建模型
+ 如何模拟物理效果（加速度，阻力，碰撞检测）
+ js面向对象OOP

要掌握的东西不多，但是其中的思路还是尤为重要的。

## 案例中的对象

此案例的对象有以下：

+ Ball 仅指页面中的小球，该对象包含了ball的所有运动和状态参数，如：位置、速度、颜色等
+ Tile 每一个数字块就是一个Tile实例，呈现一个数字0-9
+ Chunk 一个Chunk实例包涵两个Tile对象，呈现两位数字，
+ Sence 负责整个页面的，比如页面的刷新，页面显示的调试信息等

![1560305692977](C:\Users\hans\AppData\Roaming\Typora\typora-user-images\1560305692977.png)



## 实现思路

案例其实就是普通的时钟逻辑 + 七段数显 + 小球的物理特性

感兴趣的可以自己做做，后期我会分段详细的介绍

## 参考

> [用Canvas绘制炫丽的倒计时效果](<https://www.bilibili.com/video/av39726563>)



## 计划

+ Ball对象及如何模拟物理效果 2019-6-12
+ Tile对象及如何构建数字块
+ Chunk，Scene及对象及整体的实现



# canvas数字时钟之Ball对象及如何模拟物理效果

## 前言

在[Canvas案例-炫酷的数字时钟](https://juejin.im/post/5d006433e51d45775c73dcc1)中，展示了案例的最终效果，并简单介绍了案例用到的知识点和案例中的对象，现在先介绍Ball对象，代码有什么问题欢迎大家指出。

效果如下
![Honeycam 2019-06-12 15-15-41](C:\Users\hans\Pictures\Honeycam 2019-06-12 15-15-41.gif)

## Ball的属性

跟个前面的效果，下面是我列举的关键属性

+ posX, posY, vx, vy, gravity, bounce, canMove 对象位置、运动参数
+ alive, birth, life 对象生命参数
+ light, color, radius 对象状态参数

```js
// 给出代码
function Ball(data) {
  this.posX = data.posX || 0;
  this.posY = data.posY || 0;
  this.radius = data.radius || 10;
  this.vx = data.vx || Math.random() - 0.5;
  this.vy = data.vy || Math.random() - 0.5;
  this.alive = true;
  this.canMove = false;
  this.birth = null;
  this.light = false;
  this.color = data.color || `#${Math.random().toString(16).substr(3, 6)}`;
}
Ball.prototype = {
  init(data) {
    this.initData(data);
    this.blender();
    return this;
  },
  initData(data) {
    this.WIDTH = data.WIDTH;
    this.HEIGHT = data.HEIGHT;
    this.ctx = data.ctx;
    this.life = 1000 * 15;
    this.gravity = 0.08;
    this.bounce = -0.7;
  },
}
```

### 先说说几个简单的

这里说一下为什么把参数分两部分，initData里的属性所有Ball实例都一样，没有必要单独设置，放到原型上，算是优化吧，减少不必要的开销。

值得注意的是颜色的随机使用了截取Math.random()的16进制串，想当年还是傻傻的用

```js
Math.ceil(Math.random() * 255)
```

这里的canMove用了控制Ball是否可以移动，light控制是否启用颜色，还记得数字时钟的数字前后没有改变的时候是固定不动的吗，而且还是没有颜色

### 关于为啥设置生命参数

当然是清除无用的对象，释放内存了。比如那些小球出了画布已经没有作用了，就可以清除了，这里使用alive标记，这样可以很方便的清除这些无用对象。其实这里面还有一些对象的vx可能特别小，如果等这些对象移出画布等待的事件会很长，所以这里设置了life来记录小球的生命，生命到期就会被标记

具体实现如下：

```js
// 标记生命到期的对象
if (new Date() - this.birth > this.life) {
	this.alive = false;
}
// 标记移出画布的对象
if (this.posX - this.radius <= 0 || this.posX >= WIDTH) {
	this.alive = false;
}
```

### 下面是模拟物理属性

回想高中我们学习的物理知识—抛物线运动

v = at	v = v0 + at	h = 1/2 * at^2

然而实际却无法用这些，因为这里我们拿不到时间t，那么我们就要换个思路了

#### 匀速运动

比如x方向做匀速运动，那么vx势必是**定值**，然后每次跟新把当前的posX = posX + vx，这样就可以实现匀速运动了

#### 加速运动

同理，y方向做加速运动，那么vy势必是**变值**，不仅每次跟新把当前的posY = posY + vy，还要把这个重力加速度vy = gravity + vy ,这样就可以实现加速运动了

#### 阻力呢？

为了达到每次弹跳有衰减，这里引入bounce参数，通过把这个参数设置一个（-1~0）即可实现反弹和衰减，一举两得。

![Honeycam 2019-06-12 15-57-38](D:\_study\_lesson\stage-2\js\_绘图\数字时钟\assets\Honeycam 2019-06-12 15-57-38.gif)

```js
// collide函数中
if (this.posY - this.radius <= 0 || this.posY + this.radius >= HEIGHT) {
    // 这里的min max是碰撞检测一个经典的做法
    this.posY = Math.min(this.posY, HEIGHT - this.radius);
    this.posY = Math.max(this.posY, 0);
    this.vy *= this.bounce;
}
// update函数中
if (this.canMove) {
    this.posX += this.vx;
    this.posY += this.vy;
    this.collide();
    this.vy += this.gravity;
}
```

### 小结

好了，至此我们已经完成了Ball对象的构建，使用这个对象已经可以完成一些基本效果，比如下图这些。

![Honeycam 2019-06-12 16-05-50](D:\_study\_lesson\stage-2\js\_绘图\数字时钟\assets\Honeycam 2019-06-12 16-05-50.gif)



## Tile类的实现（代码中的信达雅）

![1561965869970](D:\_study\_lesson\stage-2\js\_绘图\数字时钟\assets\1561965869970.png)

### 前言

严复在《天演论》讲到：“译事三难：信、达、雅“，这也是高中英语老师素来强调的，类比一个事物逻辑和程序亦是如此，程序上单单是做到可以跑出来效果是远远不够的，一个程序的好坏也要用”信达雅“来衡量。

当看到矩阵类的图形时，我们的第一印象当然是使用二维数组来描述了，很显然这是没什么大问题的。

### 一个简单的示范

就拿此案例里的七段数显时钟，比如一个数字8，我们会用下面的数字来描述

```js
// 使用1、0来描述不同的对象，当然你可以喜欢啥用啥，比如第二种
let NUM_EIGHT = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
]
let Eg = [
    ['■', '■', '■'],
    ['■', '□', '■'],
    ['■', '■', '■'],
    ['■', '□', '■'],
    ['■', '■', '■'],
]
```

然后呢，构建好这样一个二维数组，我们可以使用双层for遍历这个二维数组来构建我们的视图，这里大家比较容易，就不给出代码了。

接触的多了，大家会发现，使用二维数组虽然**简单**，但是十个数字定义下来，占用了很大一部分空间（编辑器），最主要的是我们的代码看上去不是很**优雅**，这就好像一个，那么如何改善呢？

### 十六进制构建数字模型

我们知道，七段数显这类矩阵每个点也就两种状态，其实完全可以用1bit表示，有时候使用二进制会让代码看起来更**简洁、优雅**。

![Honeycam 2019-07-01 14-58-10](D:\_study\_lesson\stage-2\js\_绘图\数字时钟\assets\Honeycam 2019-07-01 14-58-10.gif)

下一步的重点就是如何获取每一位数字了，按位运算符**& >>**就派上用了，&按位与的逻辑就是**全一为一**，也就是

```
1 & 1 // 1
1 & 0 // 0
0 & 1 // 0
0 & 0 // 0
```

这里有些结论

- 任何数 & 同位数全1，还是这个数本身，如0b1011 & 0b1111 = 0b1011
- 取一个数中指定位，如取低位1bit，0b1011 & 0001 = 0b0001（这也是我们今天需要的）

其实这里还缺少一个东西，就是移位操作，这是个很形象的游戏，规则

- 规则是听到口令做动作，口令有两句，左移n位，右移n位
- 凳子上有人的记1，没人的记0
- 没有凳子的人淘汰

如图所示

![1561968289250](D:\_study\_lesson\stage-2\js\_绘图\数字时钟\assets\1561968289250.png)

结合按位与和移位运算，我们即可完成我们的逻辑，代码也相当简单

```js
let num = 0x7bef
while (num) {
    let show = num & 1;
    num = num >> 1;
    if (show) {
        // coding
    }
}
```

其他思路，这里再提供一种方式就是使用toString

```
0x7bef.toString(2).split("")
// ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"]
```

后面要做的就是数据和视图的映射了，这里就不给赘述了。

### 总结

作为刚刚入行的我，每次代码写完后都会思考下如何把代码写的符合”信达雅“，译文推崇的也是我程序所需的，我会尽量把逻辑写的简洁，过程中的思考和内在逻辑会写在PPT里作为笔记，我很少在代码里写详细的注释，即便几个月后看不懂自己写的，那我会翻看我的课件。

## requestAnimationFrame

早起做动画一般的会用到定时器setInterval，H5 提供一个专门用于请求动画的API，requestAnimationFrame，直译就是**请求动画帧。**（好难听······）

那么两者有区别吗？requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。屏幕刷新率是**nHz**,那么回调函数就每**1000/n** ms被执行一次，比如刷新率是60Hz，那么这个时间间隔就变成了1000/60=16.7ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次。

直接的好处有以下几个：
+ 不会引起丢帧现象，也不会导致动画出现卡顿的问题（所谓的**函数节流**）
+ 浏览器页面处理未激活的状态下，比如关闭或切出去，动画不会被执行（**CPU开销小**，节省资源）























