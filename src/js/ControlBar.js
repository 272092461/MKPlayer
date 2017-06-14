define(["require","MKPlayer"],function(require,player){
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
    }
    function changePlayStatus(e){
        getView();
        var button = e.toElement;
        playStatus = !playStatus;
        if(playStatus){
            view.play();
            player.start();
        }
        else{
            view.stop();
            player.stop();
        }
    }
    function changeFullscreen(flag){
        getView();
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
    function changeLoadTime(){
        getView();
        var timeRanges = this.buffered;
        if(timeRanges.length == 0){
            return;
        }
        view.setLoadLine(timeRanges.end(timeRanges.length-1)*100/this.duration + "%");
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
