//速度递减未实现
//move方法未能独立封装

class PrizeDraw{
    constructor(el,img_url) {
        this.el = el;
        this.img_url = img_url;
        this.init();
    }
    init() {
        this.drawBox();
        this.prizeMove();
    }
    drawBox() {
        let div = document.createElement("div");
        div.setAttribute("class", "box");
        for(let i=0;i<9;i++){
            let img = document.createElement("img");
            img.setAttribute("name", "pic");
            img.setAttribute("src", this.img_url[i]);
            div.appendChild(img);
        }
        let target = document.getElementById(this.el);
        target.appendChild(div);
    }
    prizeMove() {
        let prizeIndex = 0;
        let moveCount;
        let myIndex = 0;
        let timer = null;
        let arrNum = [0,1,2,5,8,7,6,3];//定义转动的顺序
        let arrPic = document.getElementsByName('pic');
        function move() {
            if(prizeIndex === 0){
                arrPic[arrNum[7]].style.opacity = 1;
                arrPic[arrNum[prizeIndex]].style.opacity = 0.8;
                prizeIndex++;
            }else if(prizeIndex === 8){
                prizeIndex = 0;
                arrPic[arrNum[7]].style.opacity = 1;
                arrPic[arrNum[prizeIndex]].style.opacity = 0.8;
                prizeIndex++;
            }else{
                arrPic[arrNum[prizeIndex-1]].style.opacity = 1;
                arrPic[arrNum[prizeIndex]].style.opacity = 0.8;
                prizeIndex++;
            }
            myIndex++;
            if(myIndex > moveCount){
                clearInterval(timer);
            }
        }
        arrPic[4].addEventListener("click", function(){
            moveCount = 0;
            myIndex = 0;
            let ran = Math.ceil(Math.random()*1000);
            console.log("ran: "+ran);
            let num;//定义中奖的位置
            let arr = [1,3,4,6,7];
            if(ran<=5) {//一等奖在“0”位置
                num = 0;
                moveCount = 8-prizeIndex;
            }else if(ran>=6 && ran<=15){//二等奖在“2”位置
                num = 2;
                moveCount = 10-prizeIndex;
            }else if(ran>=16 && ran<=40){//三等奖在“5”位置
                num = 5;
                moveCount = 13-prizeIndex;
            }else{
                let n = Math.ceil(Math.random()*5-1);//产生其他位置
                num = arr[n];
                moveCount = num+8-prizeIndex;
            }
            let arr2 = [0,1,2,5,8,7,6,3];
            console.log("中奖的位置: "+(arr2[num]+1));
            moveCount += 16;
            timer = setInterval(move,100);

        });
    }
}
