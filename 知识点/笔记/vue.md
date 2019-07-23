1. 什么是MVVM

   - M-Model，数据模型，js中的数据，业务逻辑;
   - V-View， 视图层，页面视图
   - VM-ViewModel，连接view和model的桥梁，一方面通过数据绑定将Model转化成View（即将后端传递的数据转化成所看到的页面），另一方面通过DOM 事件监听将View转化成Model（即将所看到的页面转化成后端的数据）

   MVVM是一种设计思想，开发者不需要直接操作DOM

2. MVVM和MVC的区别

   - MVVM是从MVC演变过来的，即Controller -> Model，ViewModel存在目的在于抽离Controller中展示的业务逻辑，而不是替代Controller

   - MVC是单向通信，MVVM是双向通信

3. Vue的优势和缺陷

   优势：低耦合，可重用性，独立开发，可测试，渐进式

   缺陷：SPA，不利于SEO