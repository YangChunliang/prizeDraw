# prizeDraw
使用原生JS编写的九宫格抽奖组件
### 使用方法
#### 导入prizedraw.css与prizeDraw.js文件
#### 在自定义script标签中创建对象并传入数据
#### 数据格式
##### el 指定渲染标签的ID名 类型：字符串
##### img_url 传入九张图片的地址 类型：数组 每个位置所传入的奖品及概率见测试代码
#### 测试代码
```
<head>
     <meta charset="UTF-8">
     <title>抽奖页面</title>
     <link rel="stylesheet" href="./prizeDraw/css/prizedraw.css">
</head>
```
```angular2html
<body>
<div id="app"></div>
<script src="./prizeDraw/js/prizeDraw.js"></script>
<!--<script src="./prizeDraw/lib/prizeDraw.js"></script>不支持es6的浏览器导入转为es5的js文件-->
<script>
    var data = [
        './img/yideng.jpg',   //一等奖概率0.5%
        './img/111.jpg',      //其他小奖概率19.2%
        './img/erdeng.jpg',   //二等奖概率1%
        './img/111.jpg',      //其他小奖概率19.2%
        './img/prize.jpg',
        './img/111.jpg',      //其他小奖概率19.2%
        './img/111.jpg',      //其他小奖概率19.2%
        './img/sandeng.jpg',  //三等奖概率2.5%
        './img/111.jpg'       //其他小奖概率19.2%
    ];
    new PrizeDraw('app', data);
</script>
</body>
```