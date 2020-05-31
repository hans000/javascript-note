# 仅用CSS完成树形结构的效果，成就系统|组织架构图

![advancement](./assets/advancement.png)

## 前言
起因是我要做一个vscode插件，功能是为minecraft（我的世界）提供一个进度预览功能，游戏内的效果如下图所示。但是犯不着为了这么小的功能引入第三方插件，仅是个预览功能。当时有考虑用canvas做，但是由于交互的原因就放弃了，到后来自己琢磨出用css来做。

## 知识点

- 垂直居中方式（flex布局）
- 元素定位属性的使用
- 计算属性的使用
- 伪元素与伪类的使用

HTML结构如下
``` HTML
<ul>
    <li>
    <span>A-A-A</span>
    <ul>
        <li><span>A-A-A-A</span></li>
        <li><span>A-A-A-B</span></li>
        <li><span>A-A-A-C</span></li>
    </ul>
    </li>
</ul>
```

为了更好的演示，这个用不同的颜色做了区分，连线如图所示
![1590851820926](assets/1590851820926.png)

完整的CSS
```
ul {
    position: relative;
    list-style: none;
    margin-left: 32px;
}
li {
    position: relative;
    display: flex;
    align-items: center;
}
ul:not(:first-child) >li::before {
    content: '';
    display: block;
    position: absolute;
    height: calc(100% + 16px);
    top: 0;
    left: -16px;
    border-left: 1px solid blue;
}
ul:not(:first-child) >li:first-child::before {
    height: calc(50% + 16px);
    top: 50%;
    border-color: white;
}
ul:not(:first-child) >li:last-child::before {
    height: calc(50%);
    top: 0;
    border-color: gold;
}
ul:not(:first-child) >li:only-child::before {
    border: none;
}
li:not(:last-child) {
    margin: 0 16px 16px 0;
}
span {
    position: relative;
    display: block;
    width: 50px;
    height: 50px;
    background-color: #eee;
}
ul:not(:first-child) span::before {
    position: absolute;
    content: '';
    display: block;
    width: 16px;
    top: 25px;
    left: -16px;
    border-top: 1px solid red;
}
ul:not(:first-child)::after {
    position: absolute;
    content: '';
    display: block;
    width: 16px;
    top: 50%;
    left: -32px;
    border-top: 1px solid yellow;
} 
```

## 最后
给出代码就不过多解释了，感兴趣可以下载源码自己调试一下看看，下面是通过json数据渲染出的效果

![mc](./assets/mc.png)

源码：[链接](https://github.com/haima16/JavaScript-Case/tree/master/stage-1/树形结构) [仓库](https://github.com/haima16/JavaScript-Case)