define(["MKPlayer","ControlBar","CommentSender"],function(player,bar,sender){
    var video;
    var control = {};
    var MKPlayer;
    var textArea;
    function build(Player){
        MKPlayer = Player;
        var videoUrl = MKPlayer.getAttribute("video-url");
        var commentUrl = MKPlayer.getAttribute("comment-url");
        var socket_url = MKPlayer.getAttribute("socket-url");
        var width = parseInt(MKPlayer.getAttribute("width")) || 800;



        var fragment = _("div","player-body");

        video = buildVideo(videoUrl,width);

        var canvas = _("canvas","comment-canvas");
        var controls = buildControls();


        fragment.appendChild(video);
        fragment.appendChild(canvas);
        fragment.appendChild(controls);
        MKPlayer.appendChild(fragment);
        // var height = video.offsetHeight;
        // video.onresize = function(){
        //     canvas.width = video.offsetWidth;
        //     canvas.height = video.offsetHeight;
        // };
        // canvas.width = video.offsetWidth;
        // canvas.height = video.offsetHeight;
        /*manager.addEventListener("load",function(){
            manager.start(10);
            manager.timeto(10000);
        });
        manager.init(canvas,commentUrl);*/
        textArea = document.getElementById("comment-area");
        control.sendBtn = document.getElementById("comment-sender");
        player.init(video,canvas,commentUrl,socket_url);
        sender.init();
        if(MKPlayer.getAttribute("autoplay")){
                autoPlay();
        }
        initListener();
        video.addEventListener('canplay',function(){
          player.resize(video.offsetWidth);
        });

    }
    function buildVideo(url,width,height){
        url = url.split(";");
        var video = document.createElement("video");

        for(var i = 0; i < url.length;i++){
            var source = document.createElement("source");
            source.setAttribute("src",url[i]);
            var type = url[i].split(".");
            switch(type[type.length-1]){
                case "mp4":{
                    source.setAttribute("type","video/mp4");
                    break;
                }
                case "webm":{
                    source.setAttribute("type","video/webm");
                    break;
                }
                case "ogg":{
                    source.setAttribute("type","video/ogg");
                    break;
                }
            }
            video.appendChild(source);
        }
        video.width = width;
        // video.height = height;
        return video;
    }
    function buildControls(){
        var controls = _("div","play-controls");

        control.playButton = _("label","control-play iconfont icon-play btn-left");

        control.process = _("div","control-processbar");
        control.load = _("div","process-load");
        var line = _("div","process-line");
        control.play = _("div","process-play");
        control.process.appendChild(control.load);
        control.process.appendChild(line);
        control.process.appendChild(control.play);

        control.fullscreen = _("label","control-fullscreen iconfont icon-fullscreen btn-right");
        control.menu = _("label","control-play iconfont icon-menu btn-right");
        control.menu.setAttribute("for","comment-setting");
        var setting = _("div","setting-container");
        setting.innerHTML = '<div class="setting-wrap"><div class="setting-content">'+
        '<div class="setting-row">'+
            '<div class="radio">'+
                '<input type="radio" name="comment-mode" id="comment-scroll" value="1" checked="true">'+
                '<label for="comment-scroll">滚动弹幕</label>'+
            '</div> '+
            '<div class="radio">'+
                '<input type="radio" name="comment-mode" id="comment-bottom" value="4">'+
                '<label for="comment-bottom">底端弹幕</label>'+
            '</div>'+
        '</div>'+
        '<div class="setting-row">'+
          '<div class="radio">'+
              '<input type="radio" name="comment-mode" id="comment-top" value="5">'+
              '<label for="comment-top">顶端弹幕</label>'+
          '</div> '+
          '<div class="radio">'+
              '<input type="radio" name="comment-mode" id="comment-reserve" value="6">'+
              '<label for="comment-reserve">逆向弹幕</label>'+
          '</div></div>'+'<div class="comment-wrap">'+
          '<textarea name="" id="comment-area" cols="30" class="comment-content"></textarea><span class="btn submit-btn" id="comment-sender">发送</span></div></div></div>';
        // <div class="setting-row"><span class="iconfont icon-voice icon-white"></span><span class="setting-line"></span></div><div class="setting-row"><span class="iconfont icon-voice icon-white"></span><span class="setting-line"></span></div><div class="setting-row"><span class="iconfont icon-voice icon-white"></span>
        var check = _('input','check-hidden','comment-setting');
        check.setAttribute('type','checkbox');
        controls.appendChild(control.playButton);
        controls.appendChild(control.fullscreen);

        controls.appendChild(check);
        controls.appendChild(control.menu);
        controls.appendChild(control.process);
        controls.appendChild(setting);
        return controls;
    }
    function autoPlay(){
        player.addEventListener("load",function(){
            bar.changePlayStatus({toElement:control.playButton});
        });
    }
    function initListener(){
        video.addEventListener("durationchange",function(){
            bar.init({
                duration:video.duration,
            });
        });
        video.addEventListener("progress",bar.changeLoadTime);
        video.addEventListener("timeupdate",bar.changePlayTime);
        video.addEventListener("ended",bar.changePlayStatus);
        control.process.addEventListener("touch",bar.movePlayTime);
        control.process.addEventListener("click",bar.movePlayTime);
        control.fullscreen.addEventListener("click",bar.changeFullscreen);
        control.playButton.addEventListener("click",bar.changePlayStatus);
        control.sendBtn.addEventListener("click",function(){
          sender.send(textArea.value,player.getMillTime());
        });
        var timer;
        MKPlayer.addEventListener('click',function(){
          var dom = MKPlayer.getElementsByClassName('play-controls')[0];
          dom.classList.add('active');
          if(timer !== undefined){
            clearInterval(timer);
          }
          timer = setInterval(function(){
            dom.classList.remove('active');
          },3000);
        });
        document.addEventListener("keyup",function(e){
            if(e.keyCode == 27){
                bar.changeFullscreen(0);
            }
        });
    }
    function _(type,className,id){
        var ele = document.createElement(type);
        ele.className = className;
        ele.setAttribute('id',id);
        return ele;
    }
    function setLoadLine(widthStyle){
        control.load.style.width = widthStyle;
    }
    function setPlayLine(widthStyle){
        control.play.style.width = widthStyle;
    }
    function turnFullscreen(){
        /*MKPlayer.webkitRequestFullscreen();*/
        requestFullscreen(MKPlayer);
        if(!setFullSize()){
            MKPlayer.style.transform = "rotate(90deg)";
        }
    }
    function setFullSize(){
        var availWidth;
        var availHeight;
        var flag = true;
        if(window.screen.height<window.screen.width){
            availHeight = window.screen.height;
            availWidth = window.screen.width;
        }
        else{
            flag = false;
            availWidth = window.screen.height;
            availHeight = window.screen.width;
        }
        player.resize(availWidth,availHeight);
        return flag;
    }
    function requestFullscreen(docElm){
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } 
        else{
            console.error("requset fullscreen failed");
        }
    }
    function setSubmit(isSubmit){
      var classList = control.sendBtn.classList;
      if(isSubmit){
        classList.remove("disable-btn");
        classList.add("submit-btn");
      }
      else{
        classList.remove("submit-btn");
        classList.add("disable-btn");
      }
    }
    function exitFullscreen(docElm){
        if (docElm.exitFullscreen) {
            docElm.exitFullscreen();
        }
        else if (docElm.mozCancelFullScreen) {
            docElm.mozCancelFullScreen();
        }
        else if (docElm.webkitCancelFullScreen) {
            docElm.webkitCancelFullScreen();
        }
        else if (docElm.msExitFullscreen) {
            docElm.msExitFullscreen();
        }
        else if(document.msExitFullscreen){
          document.msExitFullscreen()
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else{
            console.error("exit fullscreen failed");
        }
    }
    function turnWindow(){
        exitFullscreen(MKPlayer);
        MKPlayer.style.transform = "";
        var width = parseInt(MKPlayer.getAttribute("width")) || 800;
        /*player.resize(MKPlayer.getAttribute("width"),MKPlayer.getAttribute("height"));*/
        player.resize(width);
        console.log("turnWindow");
    }
    function play(){
        control.playButton.className = "control-play iconfont icon-pause btn-left";
    }
    function stop(){
        control.playButton.className = "control-play iconfont icon-play btn-left";
    }
    return{
        build:build,
        setLoadLine:setLoadLine,
        setPlayLine:setPlayLine,
        turnFullscreen:turnFullscreen,
        turnWindow:turnWindow,
        play:play,
        stop:stop,
        setSubmit:setSubmit
    };
});
