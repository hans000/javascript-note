# colorpicker

### 说明

使用原生js封装

### 使用方法

1、引入css，js文件

```
<link rel="stylesheet" href="./lib/colorpicker.css">
<script src="./lib/colorpicker.js"></script>
```

2、做一个挂载点，然后实例化

```
// html
<div id="color"></div>

// script
let color = document.getElementById('color');
new ColorPicker(color).init();
```

