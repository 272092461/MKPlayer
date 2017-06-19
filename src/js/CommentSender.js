define(["CommentManager","DataSender"],function(manager,datasender){
  var param;
  var defaultParam = {
    color: 16777215,
    size: 25,
    mode: 1,
    dbid: 0,
    hash: 45883172,
    pool: 0
  };
  var comment;
  var radios = document.getElementsByName("comment-mode");
  function init(setting){
    param = Object.assign({},setting,defaultParam);
  }
  function getDate(){
    return parseInt(new Date().getTime()/1000);
  }
  function send(text,stime,setting){
    comment = Object.assign({},setting,param);
    if(stime === undefined){
      console.error("弹幕未设置时间，发送失败");
      return;
    }
    if(text.split(" ").join("") === ""){
      return false;
    }
    var mode = getMode() || 1;
    comment.mode = mode;
    comment.text = text.replace(/\r|\n/g,"");
    comment.date = getDate();
    comment.stime = stime+20;           //跳过当前帧
    manager.receiveComment(comment);
    datasender.send(comment);
  }
  function getMode(){
    for(var i = 0;i<radios.length;i++){
      if(radios[i].checked){
        return parseInt(radios[i].value);
      }
    }
  }
  return{ init, send };
});
