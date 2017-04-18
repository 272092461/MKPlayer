define(["CommentManager","require"],function(manager,require){
  var param = {};
  var sendable = true;
  var comment;
  function init(setting){
    if(setting === undefined){
      setting = {};
    }
    param.color = "color" in setting ? setting.color : 16777215;
    param.size = "size" in setting ? setting.size : 25;
    param.mode = "mode" in setting ? setting.mode : 1;
    param.dbid = "dbid" in setting ? setting.dbid : 0;
    param.hash = "hash" in setting ? setting.hash :"45883172";
    param.pool = 1;
  }
  function getDate(){
    return parseInt(new Date().getTime/1000);
  }
  function send(text,stime){
    comment = Object.create(param);
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
    comment. text = text;
    //param.date = getDate();
    comment.stime = stime+20;
    changeSendable();
    requestAnimationFrame(changeSendable);
    manager.receiveComment(comment);
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
  return{
    init:init,
    send:send,
    setColor:setColor,
    setSize:setSize,
    setMode:setMode
  };
});
