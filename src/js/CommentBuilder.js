define(["MKCanvas"],function(canvas){
    "use strict";
    var globalTTl = 6000;
    var width;
    var height;
    function init(obj){
        if("ttl" in obj){
            setTTl(obj.ttl);
        }
        if("height" in obj){
            setHeight(obj.height);
        }
        if("width" in obj){
            setWidth(obj.width);
        }

    }
    function setTTl(val){
        globalTTl = val;
    }
    function setHeight(val){
        height = val;
    }
    function setWidth(val){
        width = val;
    }
    function CoreComment(obj){
        this.ttl = globalTTl;
        this.dur = globalTTl;
        this.align = 0;
        setDefalut(this,obj);
    }
    Object.defineProperties(CoreComment.prototype,{
       height:{
           get:function(){
               if(this._height == undefined){
                   this._height = this.size;
               }
               return this._height;
           },
           configurable:true,
           enumerable:true
       },
       bottom:{
           get:function(){
               return this._y+this.height;
           },
           configurable:true,
           enumerable:true
       },
        width:{
            get:function(){
                if(!this._width){
                    this._width = canvas.getWidth(this);
                }
                return this._width;
            }
        },
       y:{
            get:function(){
                return this._y;
            },
            set:function(val){
                this._y = val;
            },
           configurable:true,
           enumerable:true
        },
        align_y:{
           get:function(){
                if(this.align < 2){
                    return this._y;
                }
                else{
                    return height - this.bottom;
                }
            },
            configurable:true,
            enumerable:true
        },
        x:{
            get:function(){
                return "middle";
            },
            configurable:true,
            enumerable:true
        },
        align_x:{
            get:function(){
                return this.x;
            },
            configurable:true,
            enumerable:true
        },
        right:{
            get:function(){
                return this.x+this.width;
            },
            configurable:true,
            enumerable:true
        },
        endTime:{
           get:function(){
                if(this._endTime == undefined){
                    this._endTime = this.stime + this.dur;
                }
               return this._endTime;
            },
            configurable:true,
            enumerable:true
        }
    });
    CoreComment.prototype.time = function(val){
        this.ttl -= val;
        if(this.ttl<0){
            this.onFinish(this);
        }
    };
    CoreComment.prototype.onFinish = function(){

    };
    function ScrollComment(obj){
        this.ttl = globalTTl;
        this.dur = globalTTl;
        this.align = 0;
        setDefalut(this,obj);
    }
    ScrollComment.prototype = Object.create(CoreComment.prototype);
    Object.defineProperties(ScrollComment.prototype,{
        x:{
            get:function(){
                if(this.align != 1){
                    return (this.ttl/this.dur)*(this.width+width)-this.width;
                }
                else{
                    return ((this.dur-this.ttl)/this.dur)*(this.width+width) - this.width;
                }
            },
            configurable:true,
            enumerable:true
        },
        arriveTime:{
            get:function(){
                if(this._arrive == undefined){
                    this._arrive = this.stime + width*this.dur/(this.width+width);
                }
                return this._arrive;
            },
            configurable:true,
            enumerable:true
        },
        outTime:{
            get:function(){
                if(this._out == undefined){
                    this._out = this.stime+this.endTime-this.arriveTime;
                }
                return this._out;
            },
            configurable:true,
            enumerable:true
        }
    });
    function setDefalut(comment,obj){
        for(var name in obj){
            comment[name] = obj[name];
        }
    }
    function builder(obj){
        if(obj.mode == 1 || obj.mode == 2 || obj.mode == 6){
            return new ScrollComment(obj);
        }
        else{
            return new CoreComment(obj);
        }
    }
    function resize(_width,_height){
        setWidth(_width);
        setHeight(_height);
    }
    return{
        builder:builder,
        setTTl:setTTl,
        init:init,           //@param {width:*,height:*,ttl:*}
        resize:resize
    }
});
