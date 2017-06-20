define(["MKCanvas"],function(canvas){
    var globalTTl;
    var width;
    var height;
    function init({ ttl,height:_height,width:_width } = { ttl: 6000 ,height:0, width: 0 }){
        setTTl(ttl);
        width = _width;
        height = _height;
    }
    function setTTl(val){
        globalTTl = val;
    }
    function CoreComment(obj){
        this.ttl = globalTTl;
        this.dur = globalTTl;
        this.align = 0;
        Object.assign(this,obj);
    }
    Object.defineProperties(CoreComment.prototype,{
       height:{
           get:function(){
               if(this._height === undefined){
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
        CoreComment.apply(this,[obj]);
    }
    ScrollComment.prototype = Object.create(CoreComment.prototype);                         //继承弹幕类
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
    function builder(obj){
        if(obj.mode == 1 || obj.mode == 2 || obj.mode == 6){
            return new ScrollComment(obj);
        }
        else{
            return new CoreComment(obj);
        }
    }
    function resize(_width,_height){
        width = _width;
        height = _height;
    }
    return{builder, setTTl, init, resize};
});
