define(["require","MKPlayer",'Event'],function(require,player,{playerEvent}){
    var currentTime;
    var loadTime;
    var duration;
    var volume;
    var playStatus;
    var fsStatus;
    var view;
    function init(barStatus){
        if(!("duration" in barStatus)){
            console.error("Please init duration int barStatus");
            return;
        }
        else{
            duration = barStatus.duration;
            volume = barStatus["volume"] | 1;
            currentTime = barStatus["currentTime"] | 0;
            playStatus = barStatus["playStatus"] | false;
            fsStatus = barStatus["fsStatus"] | false;
        }
        playerEvent.on('changePlayStatus', changePlayStatus);
        playerEvent.on('changeFullscreen', changeFullscreen);
        playerEvent.on('changeLoadTime', changeLoadTime);
        playerEvent.on('changePlayTime', changePlayTime);
    }
    function changePlayStatus(e){
        playStatus = !playStatus;
        if(playStatus){
            playerEvent.emit('play');
            player.start();
        }
        else{
            playerEvent.emit('stop');
            player.stop();
        }
    }
    function changeFullscreen(flag){
        fsStatus = flag | !fsStatus;
        if(flag == 0){
            fsStatus = 0;
        }
        if(fsStatus){
            view.turnFullscreen();
        }
        else{
            view.turnWindow();
        }
    }
    function changePlayTime(){
        getView();
        view.setPlayLine(player.currentTime*100/player.duration + "%");
    }
    function movePlayTime(e){
        var offsetLength = this.offsetWidth;
        var length = e.offsetX;
        var time = length/offsetLength * duration;
        player.timeto(time);
        changePlayTime();
    }
    function changeLoadTime(e){
        let video = e.target || e.srcElement;
        let timeRanges = video.buffered;
        if(timeRanges.length == 0){
            return;
        }
        playerEvent.emit('loadTime', timeRanges.end(timeRanges.length-1)*100/video.duration + "%");
    }
    function getView(){
        if(view == undefined){
            view = require("MKPlayer-view");
        }
    }
    return{
        init:init,
        changePlayStatus:changePlayStatus,
        changeFullscreen:changeFullscreen,
        changePlayTime:changePlayTime,
        changeLoadTime:changeLoadTime,
        movePlayTime:movePlayTime
    };
});
