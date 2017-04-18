define(["CommentManager"],function(manager){
    var video;
    var _listener = {};
    function init(_video,_canvas,_url,socket_url){
        manager.init(_canvas,_url,socket_url);
        video = _video;
        video.addEventListener("play",manager.start);
        video.addEventListener("timeupdate",function(){
            console.log(this.currentTime*1000 +"  "+manager.getTime());
        });
        video.addEventListener("pause",manager.stop);
        manager.addEventListener("load",function(){
            dispatchEvent("load");
        });
    }
    function start(val){
        video.play();
        /*manager.start(val);*/
    }
    function stop(){
        video.pause();
        /*manager.stop();*/
    }
    function getMillTime(){
      return manager.getTime();
    }
    function timeto(second){
        video.currentTime = second;
        manager.timeto(second * 1000);
    }
    function setVolume(val){
        video.volume = val;
    }
    function dispatchEvent(name){
        var calls = _listener[name];
        if(calls != undefined){
            for(var i = 0;i<calls.length;i++){
                calls[i]();
            }
        }
    }
    function addEventListener(name,callback){
        if(_listener[name] == undefined){
            _listener[name] = [];
        }
        _listener[name].push(callback);
    }
    function resize(width,height){
        video.width = width;
        video.height = height;
        manager.resize(width,height);
    }
    function send(){
      manager.send({});
    }
    return{
        init:init,
        start:start,
        stop:stop,
        timeto:timeto,
        addEventListener:addEventListener,
        resize:resize,
        getMillTime:getMillTime,
        setVolume:setVolume,
        send:send
    };
});
