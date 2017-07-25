function PrizeDraw(el,img_url) {
    this.el = el;
    this.img_url = img_url;
    this.init();
}
PrizeDraw.prototype = {
    constructor: PrizeDraw,
    init: function () {
        this.drawBox();
        this.prizeZhuan();
    },
    drawBox: function () {
        var div = document.createElement("div");
        div.setAttribute("class", "box");
        for(var i=0;i<9;i++){
            var img = document.createElement("img");
            img.setAttribute("name", "pic");
            img.setAttribute("src", this.img_url[i]);
            div.appendChild(img);
        }
        var target = document.getElementById(this.el);
        target.appendChild(div);
    },
    prizeZhuan: function () {
        var prizeIndex = 0;
        var arrNum = [0,1,2,5,8,7,6,3];//定义转动的顺序
        var arrPic = document.getElementsByName('pic');
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
        }
        arrPic[4].onclick = function () {
            var num = Math.ceil(Math.random()*8);
            var timer = setInterval(move,100);
            setTimeout(function () {
                clearInterval(timer);
            },2000+num*100)
        }
    }
}
