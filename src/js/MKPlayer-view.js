define(["MKPlayer","ControlBar"],function(player,bar){
    var video;
    var control = {};
    var MKPlayer;
    function build(Player){
        MKPlayer = Player;
        var videoUrl = MKPlayer.getAttribute("video-url");
        var commentUrl = MKPlayer.getAttribute("comment-url");
        var width = MKPlayer.getAttribute("width") | 800;
        var height = MKPlayer.getAttribute("height") | 600;


        var fragment = _("div","player-body");

        video = buildVideo(videoUrl,width,height);

        var canvas = _("canvas","comment-canvas");
        var controls = buildControls();


        fragment.appendChild(video);
        fragment.appendChild(canvas);
        fragment.appendChild(controls);
        MKPlayer.appendChild(fragment);
        video.onresize = function(){
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        }
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
        /*manager.addEventListener("load",function(){
            manager.start(10);
            manager.timeto(10000);
        });
        manager.init(canvas,commentUrl);*/

        player.init(video,canvas,commentUrl);
        if(MKPlayer.getAttribute("autoplay")){
                autoPlay();
        }
        initListener();

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
        video.height = height;
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
        control.menu.for = "comment-setting";
        var setting = _("div","setting-container");
        setting.innerHTML = '<input type="checkbox" name="" id="comment-setting" class="check-hidden"><div class="setting-wrap"><div class="setting-content"><div class="setting-row"><span class="iconfont icon-voice icon-white"></span><span class="setting-line"></span></div><div class="setting-row"><span class="iconfont icon-voice icon-white"></span><span class="setting-line"></span></div><div class="setting-row"><span class="iconfont icon-voice icon-white"></span><span class="setting-line"></span></div><div class="comment-wrap"><textarea name="" id="" cols="30" class="comment-content"></textarea><span class="btn submit-btn">提交</span></div></div></div>';
        controls.appendChild(control.playButton);
        controls.appendChild(control.fullscreen);
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
        control.process.addEventListener("touch",bar.movePlayTime);
        control.process.addEventListener("click",bar.movePlayTime);
        control.fullscreen.addEventListener("click",bar.changeFullscreen);
        control.playButton.addEventListener("click",bar.changePlayStatus);
        document.addEventListener("keyup",function(e){
            if(e.keyCode == 27){
                bar.changeFullscreen(0);
            }
        });
    }
    function _(type,className){
        var ele = document.createElement(type);
        ele.className = className;
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
        if(window.screen.availHeight<window.screen.availWidth){
            availHeight = window.screen.availHeight;
            availWidth = window.screen.availWidth;
        }
        else{
            flag = false;
            availWidth = window.screen.availHeight;
            availHeight = window.screen.availWidth;
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
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        else{
            console.error("requset fullscreen failed");
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
        /*player.resize(MKPlayer.getAttribute("width"),MKPlayer.getAttribute("height"));*/
        player.resize(800,600);
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
        stop:stop
    };
});
