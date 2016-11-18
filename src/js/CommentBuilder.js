define(["MKCanvas"],function(canvas){
    var globalTTl = 3000;
    var width;
    var height;
    function init(obj){
        if(obj.ttl){
            setTTl(obj.ttl);
        }
        if(obj.height){
            setHeight(obj.height);
        }
    }
    function setTTl(val){
        globalTTl = val;
    }
    function setHeight(val){
        height = val;
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
                   this._height = this.size/1.2;
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
                    this._width = canvas.getWidth(this.text);
                }
                return this._width;
            }
        },
       y:{
            get:function(){
                if(this.align < 2){
                    return this._y;
                }
                else{
                    return height - this.bottom;
                }
            },
            set:function(val){
                this._y = val;
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
        }
    });
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
                return (this.ttl/this.dur)*(this.width+width)-this.width;
            }
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
    return{
        builder:builder,
        setTTl:setTTl,
        init:init
    }
});