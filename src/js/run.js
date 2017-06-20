define(["MKPlayer-view"],function(view){
    var MKPlayer = document.getElementsByClassName("MKPlayer");
    var video;
    if(!MKPlayer.length){
        return;
    }
    view.build(MKPlayer[0]);

    return{};
});
