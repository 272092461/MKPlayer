define(["CommentManager","require","DataSender"],function(manager,require,datasender){
  var param = {};
  var sendable = true;
  var comment;
  var radios = document.getElementsByName("comment-mode");
  function init(setting){
    if(setting === undefined){
      setting = {};
    }
    param.color = "color" in setting ? setting.color : 16777215;
    param.size = "size" in setting ? setting.size : 25;
    param.mode = "mode" in setting ? setting.mode : 1;
    param.dbid = "dbid" in setting ? setting.dbid : 0;
    param.hash = "hash" in setting ? setting.hash :"45883172";
    param.pool = 0;
  }
  function getDate(){
    return parseInt(new Date().getTime()/1000);
  }
  function send(text,stime){
    comment = Object.assign(param);
    if(sendable === false){
      return;
    }
    if(stime === undefined){
      console.error("弹幕未设置时间，发送失败");
      return;
    }
    if(text.split(" ").join("") === ""){
      return false;
    }
    var mode = getMode();
    if(mode){
      comment.mode = mode;
    }
    comment. text = text.replace(/\r|\n/g,"");
    //param.date = getDate();
    comment.date = getDate();
    comment.stime = stime+20;           //跳过当前帧
    changeSendable();
    requestAnimationFrame(changeSendable);
    manager.receiveComment(comment);
    datasender.send(comment);
  }
  function changeSendable(){
    sendable = !sendable;
    var view = require("MKPlayer-view");
    view.setSubmit(sendable);
  }
  function setColor(){

  }
  function setSize(){

  }
  function setMode(){

  }
  function getMode(){
    for(var i = 0;i<radios.length;i++){
      if(radios[i].checked){
        return parseInt(radios[i].value);
      }
    }
  }
  return{
    init:init,
    send:send,
    setColor:setColor,
    setSize:setSize,
    setMode:setMode
  };
});
