let Observer = (function(){
    //消息容器
    let __message = {};
    return {
        //注册信息接口
        regist(eventName, callback) {
            if (!__message[eventName]) {
                __message[eventName] = [];
            }
            __message[eventName].push(callback);
        },
        //发布信息接口
        fire(eventName, args) {
            if (__message[eventName]) {
                for (var i = 0; i < __message[eventName].length; i++) {
                    __message[eventName][i].call(this, args);
                }
            }
        },
        //移除信息接口
        remove(eventName, callback) {
            if (__message[eventName]) {
                for (var i = 0; i < __message[eventName].length; i++) {
                    if (__message[eventName][i] === callback) {
                        __message[eventName].splice(i, 1);
                    }
                }
            }
        }
    }
})();
