define(["MKPlayer","ControlBar","CommentSender",'Event'],function(player,bar,sender,{playerEvent}){
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

        // video.style.visibility = "hidden";
        fragment.appendChild(video);
        fragment.appendChild(canvas);
        fragment.appendChild(controls);
        MKPlayer.appendChild(fragment);
        textArea = document.getElementById("comment-area");
        control.sendBtn = document.getElementById("comment-sender");
        player.init(video,canvas,commentUrl,socket_url);
        sender.init();
        if(MKPlayer.getAttribute("autoplay")){
            autoPlay();
        }
        initListener();
        video.addEventListener('resize',function(){
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
        control.voice = _("label","control-btn iconfont icon-voice btn-right");
        control.voice.setAttribute("for","comment-voice");

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
        var setting_voice = _('div',"setting-voice");
        setting_voice.innerHTML =
          '<div class="voice-wrap">'+
            '<div class="voice-container voice-background"></div>'+
            '<div class="voice-rate"></div>'+
          '</div>'+
          '<div class="voice-cover"></div>';
        var check = _('input','check-hidden','comment-setting');
        var checkvoice =  _('input','check-hidden','comment-voice');
        check.setAttribute('type','checkbox');
        checkvoice.setAttribute('type','checkbox');
        controls.appendChild(control.playButton);
        controls.appendChild(control.fullscreen);

        controls.appendChild(check);
        controls.appendChild(control.menu);
        controls.appendChild(checkvoice);
        controls.appendChild(control.voice);
        controls.appendChild(control.process);
        controls.appendChild(setting_voice);
        controls.appendChild(setting);
        return controls;
    }
    // function autoPlay(){
    //     player.addEventListener("load",function(){
    //         bar.changePlayStatus({toElement:control.playButton});
    //     });
    // }
    function initListener(){
        playerEvent.on('play', play);
        playerEvent.on('stop', stop);
        playerEvent.on('loadTime', setLoadLine);
        playerEvent.on('playTime', setPlayLine);
        video.addEventListener("durationchange",function(){
            bar.init({
                duration:video.duration,
            });
        });
        video.addEventListener("progress", (e) => playerEvent.emit('changeLoadTime', e));
        video.addEventListener("timeupdate",(e) => playerEvent.emit('changePlayTime', e));
        video.addEventListener("ended",() => playerEvent.emit('changePlayStatus'));
        control.process.addEventListener("touch", (e) => playerEvent.emit('movePlayTime', e,control.process));
        control.process.addEventListener("click", (e) => playerEvent.emit('movePlayTime', e,control.process));
        control.fullscreen.addEventListener("click",() => playerEvent.emit('changeFullscreen'));
        control.playButton.addEventListener("click",() => playerEvent.emit('changePlayStatus'));
        control.sendBtn.addEventListener("click",function(){
          sender.send(textArea.value,player.getMillTime());
        });
        var timer;
        MKPlayer.addEventListener('click',function(){
          var dom = MKPlayer.querySelector('.play-controls');
          dom.classList.add('active');
          if(timer !== undefined){
            clearInterval(timer);
          }
          timer = setInterval(function(){
            dom.classList.remove('active');
          },2000);
        });
        MKPlayer.addEventListener('mousemove',function(){
          var dom = MKPlayer.querySelector('.play-controls');
          dom.classList.add('active');
          if(timer !== undefined){
            clearInterval(timer);
          }
          timer = setInterval(function(){
            dom.classList.remove('active');
          },2000);
        });
        document.addEventListener("keyup",function(e){
            if(e.keyCode == 27){
                playerEvent.emit('changeFullscreen',0);
            }
        });
        var voiceControl = {
          _wholeHeight:document.querySelector(".voice-background").offsetHeight,
          get wholeHeight(){
            return this._wholeHeight = this._wholeHeight=== 0 ?  document.querySelector(".voice-background").offsetHeight : this._wholeHeight;
          },

          _wholeWidth:document.querySelector(".voice-background").offsetWidth,
          get wholeWidth(){
            return this._wholeWidth = this._wholeWidth=== 0 ?  document.querySelector(".voice-background").offsetWidth : this._wholeWidth;
          },
          voiceDom:document.querySelector(".voice-rate"),
          set voice(val){
            var rh = this.wholeHeight*val;
            this.setView(this.rateWidth(rh),rh);
          },
          get voice(){
            return this.voiceDom.offsetHeight/this.wholeHeight;
          },
          rateWidth:function(rH){
            return this.wholeWidth*rH/this.wholeHeight;
          },
          setView:function(rW,rH){
            this.draw(rW,rH);
            this.onChange();
          },
          draw:function(rW,rH){
            if(rH>this.wholeHeight){
              rH = this.wholeHeight;
              rW = this.wholeWidth;
            }
            if(rH<2){
              rH = 0;
              rW = 0;
            }
            this.voiceDom.setAttribute("style","border-bottom-width:" + rH +"px;border-right-width:" + rW+"px;");
          },
          onChange:function(){
            player.setVolume(this.voice);
          },
          init:function(){
            var rh = player.getVolume()*this.wholeHeight;
            this.draw(this.rateWidth(rh),rh);
          }
        };
        document.querySelector("#comment-voice").addEventListener('change',function(){
          voiceControl.init();
        });
        document.querySelector(".voice-cover").addEventListener('click',function(e){
          var rH = voiceControl.wholeHeight-e.layerY;
          voiceControl.setView(voiceControl.rateWidth(rH),rH);
        });
        document.querySelector(".voice-cover").addEventListener('mousedown',function(e){
          e.preventDefault();
          this.addEventListener('mousemove',voiceChange);
        });
        function voiceChange(e){
          var rH = voiceControl.wholeHeight-e.layerY;
          voiceControl.setView(voiceControl.rateWidth(rH),rH);
        }
        document.querySelector(".voice-cover").addEventListener('mouseup',function(e){
          this.removeEventListener('mousemove',voiceChange);
        });
        document.querySelector(".voice-cover").addEventListener("mouseout",function(e){
          this.removeEventListener("mousemove",voiceChange);
        });
    }
    function _(type,className,id){
        var ele = document.createElement(type);
        if(!className)
          return ele;
        ele.className = className;
        if(!id)
          return ele;
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
        playerEvent.emit('full');
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
          document.msExitFullscreen();
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else{
            console.error("exit fullscreen failed");
        }
        playerEvent.emit('exitFull');
    }
    function turnWindow(){
        exitFullscreen(MKPlayer);
        MKPlayer.style.transform = "";
        var width = parseInt(MKPlayer.getAttribute("width")) || 800;
        /*player.resize(MKPlayer.getAttribute("width"),MKPlayer.getAttribute("height"));*/
        player.resize(width);
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
