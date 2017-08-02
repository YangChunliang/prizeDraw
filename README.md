### 简介
#### 使用原生JS实现的九宫格抽奖组件。可以自定义组件的背景以及位置，可以实现对组件开始运动、结束运动的控制，可以监听组件运动的开始及结束状态
### 支持度
#### PC
##### Chrome Opera Firefox es6语法支持IE9以上
#### Android
##### 微信平台 QQ平台 微博平台
#### iOS
##### 微信平台 QQ平台 微博平台
### 接口说明
```
constructor(config)  //构造函数，初始化数据
init()               //初始化，执行drawBox与listenMove
drawBox()            //画出视图
listenMove()         //监听点击事件
startmove(num)       //开始运动，num为运动停止的位置
endMove()            //结束运动
getRandom()          //按照对应的概率返回指定位置
regist('start', function () {      //监听运动开始
    ...
});
regist('end', function (result) {  //监听运动结束，result.currentPosition返回运动结束的位置
    ...
});
```
### 使用方法
#### 导入prizedraw.css与prizeDraw.js文件
#### 在自定义script标签中创建对象并传入数据，然后调用init()方法即可
### 数据格式
#### 见测试代码
### 测试代码
```angular2html
<script>
    var config = {
        el: 'app',
        url: [
            './img/yideng.jpg',   //一等奖概率0.5%
            './img/111.jpg',      //其他小奖概率19.2%
            './img/erdeng.jpg',   //二等奖概率1%
            './img/111.jpg',      //其他小奖概率19.2%
            './img/prize.jpg',
            './img/111.jpg',      //其他小奖概率19.2%
            './img/111.jpg',      //其他小奖概率19.2%
            './img/sandeng.jpg',  //三等奖概率2.5%
            './img/111.jpg'       //其他小奖概率19.2%
        ],
        posi: {                   //相对于插入元素左边及上边的距离，单位"px"
            left: 50,
            top: 50
        },
        bgColor: {
            pColor: '#3a64cc'     //背景颜色
        }
    };
    var prizeDraw = new PrizeDraw(config);       //创建对象并传入参数
    prizeDraw.init();                            //执行初始化
    prizeDraw.regist('end', function (result) {   //监听运动结束，result.currentPosition返回运动结束的位置
        console.log(result.currentPosition);
    });
</script>
```
