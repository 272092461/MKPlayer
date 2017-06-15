define(function(){
  let playerEvent = {};
  let Event = {on,emit,removeListener};
  Object.assign(playerEvent,Event);
  function on(eName,callback){
    if(!this.handles){
      Object.defineProperty(this,"handles",{value:{}});
    }
    if(!(eName in this.handles)){
      this.handles[eName] = [];
    }
    this.handles[eName].push(callback);
  }
  function emit(eName,...params){
    if(this.handles && this.handles[eName]){
      this.handles[eName].forEach((callback) => callback(...params));
    }
  }
  function removeListener(eName,listener){
    if(this.handles && this.handles[eName]){
      var position = this.handles[eName].indexOf(listener);
      position !== -1 ? this.handles[eName].splice(position,1) : false;
    }
  }
  return {playerEvent,Event};
});
