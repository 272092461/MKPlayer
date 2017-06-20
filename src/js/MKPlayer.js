define(["CommentManager","MKPlayer-view"],function(manager,view){
    var video;
    var _listener = {};
    function init(_video,_canvas,_url,socket_url){
        video = _video;
        manager.init(_canvas,_url,socket_url,video);
        video.addEventListener("play",manager.start);
        video.addEventListener("ended",function(){
          manager.reset();
        });
        video.addEventListener("pause",manager.stop);
        manager.addEventListener("load",function(){
            dispatchEvent("load");
        });
    }
    function create({ container:dom, video_url, comment_url, socket_url, width, height }){
      dom.classList.add('MKPlayer');
      let { canvas, video: _video } = view.create({ dom, video_url, width })
      video = _video
      manager.create({canvas,comment_url,socket_url,video});
      video.addEventListener("play",manager.start);
      video.addEventListener("ended",manager.reset);
      video.addEventListener("pause",manager.stop);
      manager.addEventListener("load", () => dispatchEvent("load") );
      video.addEventListener('resize',() => resize(video.offsetWidth) );
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
