class PrizeDraw {
    constructor(config) {
        this.el = config.el;
        this.img_url = config.url;
        this.pLeft = config.posi.left;
        this.pTop = config.posi.top;
        this.pColor = config.bgColor.pColor;
        this.__message = {};//消息容器
        this.prizeIndex = 0;//当前中奖位置
        this.moveCount = 100;//应该转动的步数
        this.myIndex = 0;//已经转动的步数
        this.timer = null;//定时器
        this.speed = 640;//初始化速度
        this.flag = true;//点击事件激活
        this.arrNum = [0, 1, 2, 5, 8, 7, 6, 3];//定义转动的顺序
        this.arrPic = document.getElementsByName('pic');
        this.myFlag = false;
        this.myFlag2 = true;
        this.init();
    }

    //初始化
    init() {
        this.drawBox();//绘制界面
        this.listenMove();//图片点击监听挂起
    }

    //绘制界面
    drawBox() {
        let pDiv = document.createElement("div");
        pDiv.setAttribute("class", "box");
        pDiv.style.left = this.pLeft + 'px';
        pDiv.style.top = this.pTop + 'px';
        pDiv.style.backgroundColor = this.pColor;
        for (let i = 0; i < 9; i++) {
            let img = document.createElement("img");
            img.setAttribute("name", "pic");
            img.setAttribute("src", this.img_url[i]);
            pDiv.appendChild(img);
        }
        let target = document.getElementById(this.el);
        target.appendChild(pDiv);
    }

    //挂起监听事件
    listenMove() {
        this.arrPic[4].addEventListener("click", () => {
            if (this.flag) {
                this.startmove();
                setTimeout(() => {
                    if (!this.myFlag) {
                        alert("请求超时！");
                        this.endMove();
                        this.myFlag2 = false;
                    }
                }, 5000);
            }
        });
    }

    //注册信息接口
    regist(eventName, callback) {
        if (!this.__message[eventName]) {
            this.__message[eventName] = [];
        }
        this.__message[eventName].push(callback);
    }

    //发布信息接口
    fire(eventName, args) {
        if (this.__message[eventName]) {
            for (var i = 0; i < this.__message[eventName].length; i++) {
                this.__message[eventName][i](args);
            }
        }
    }

    myMove(num){
        if (!this.myFlag2) {
            return;
        }
        console.log("接收数据num: " + num);
        this.myFlag = true;
        if (num>7 || num<0) {
          alert("请输入0到7之间的数！");
          this.endMove();
          return;
        }
        clearInterval(this.timer);
        this.moveCount = num + 32 - this.prizeIndex;
        this.myIndex = 0;
        this.move();
    }

    //执行运动
    startmove() {
        this.flag = false;//点击事件冻结
        this.myIndex = 0;
        this.speed = 640;
        this.move();
        this.fire('start', {}); //触发开始状态
    }

    //运动具体实现
    move() {
        if (this.prizeIndex === 0) {
            this.arrPic[this.arrNum[7]].className = "dark";
        } else if (this.prizeIndex === 8) {
            this.prizeIndex = 0;
            this.arrPic[this.arrNum[7]].className = "dark";
        } else {
            this.arrPic[this.arrNum[this.prizeIndex - 1]].className = "dark";
        }
        this.arrPic[this.arrNum[this.prizeIndex]].className = "bright";
        this.prizeIndex++;
        this.myIndex++;
        this.setSpeed();
        this.timer = setTimeout(() => {
            this.move();
        }, this.speed);
        if (this.myIndex > this.moveCount) {
            this.endMove();
        }
    }

    //设置速度
    setSpeed() {
        if (this.moveCount - this.myIndex < 8) {
            this.speed += 80;
        }else {
            if (this.speed > 80) {
                this.speed -= 80;
            }
        }
    }

    //结束运动
    endMove() {
        clearInterval(this.timer);
        this.fire('end', {
            currentPosition: this.prizeIndex-1
        }); //触发开始状态
        this.flag = true;//鼠标点击激活
    }

    //按照概率来获取随机数
    static getRand() {
        let ran = Math.ceil(Math.random() * 1000);
        let num;//定义中奖的位置(顺时针旋转位置)
        let arr = [1, 3, 4, 6, 7];
        if (ran <= 5) {//一等奖在“0”位置
            num = 0;
        } else if (ran >= 6 && ran <= 15) {//二等奖在“2”位置
            num = 2;
        } else if (ran >= 16 && ran <= 40) {//三等奖在“5”位置
            num = 5;
        } else {
            let n = Math.ceil(Math.random() * 5 - 1);//产生其他位置
            num = arr[n];
        }
        return num;
    }
}
