define(["CommentManager"],function(manager){
    var video;
    var _listener = {};
    function init(_video,_canvas,_url,socket_url){
        video = _video;
        manager.init(_canvas,_url,socket_url,video);
        video.addEventListener("play",manager.start);
        // video.addEventListener("timeupdate",function(){
        //     console.log(this.currentTime*1000 +"  "+manager.getTime());
        // });
        video.addEventListener("ended",function(){
          manager.reset();
        });
        video.addEventListener("pause",manager.stop);
        manager.addEventListener("load",function(){
            dispatchEvent("load");
        });
    }
    function start(val){
        video.play();
    }
    function stop(){
        video.pause();
    }
    function getMillTime(){
      return manager.getTime();
    }
    function timeto(second){
        video.currentTime = second;
        manager.timeto(second * 1000);
    }
    function setVolume(val){
      if(val >= 0 && val <= 1){
        video.volume = val;
      }
    }
    function getVolume(){
      return video.volume;
    }
    function dispatchEvent(name){
        var calls = _listener[name];
        if(calls !== undefined){
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
        if(height !== undefined){
          video.height = height;
        }
        else{
            video.removeAttribute("height");
            manager.resize(width,video.clientHeight);
            return;
        }
        manager.resize(width,height);
    }
    return { init, start, stop, timeto, addEventListener, resize, getMillTime, setVolume, getVolume,
        get currentTime(){
          return video.currentTime;
        },
        get duration(){
          return video.duration;
        }
    };
});
