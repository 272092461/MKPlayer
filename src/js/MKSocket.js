define(function(){
    var url;
    var socket;
    function init(_url,callback,error){
        if(! ("WebSocket" in window)){
            console.error("你的浏览器不支持WebSocket");
            return;
        }
        if(url == undefined){
          return;
        }
        url = _url;
        socket = new WebSocket(url);
        socket.onmessage = function(evt){
            callback(evt.data);                             //收到弹幕将数据交给回调函数
        };
        socket.error = error;
    }
    function send(data){
        if(socket == null){
            return;
        }
        socket.send(data);
    }
    return {
        init:init,
        send:send
    };
});
