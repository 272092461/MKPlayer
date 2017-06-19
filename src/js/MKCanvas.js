define(function(){
    var canvas;
    var canvas_cache = document.createElement('canvas').getContext('2d');
    var comments = [];
    var globalAlpha = 1;
    function bind(obj){
        obj = obj.getContext ?obj.getContext("2d") : obj;
        if(obj instanceof CanvasRenderingContext2D){
            canvas = obj;
        }
        else{
            console.error("canvas binding error");
        }
        canvas_cache.storkeStyle = "white";
    }
/**
 * comObj
 * @property text 文本
 * @property x    位置
 * @property y
 * @property color 颜色
 * @property opacity 透明度
 * @property size 字体大小
*/
    function add(_comments){
        comments = _comments;
    }
    function clear(){
        comments = [];
        canvas.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
        setFont({size:null});
    }
    function clearCache(){
        canvas_cache.clearRect(0,0,canvas_cache.canvas.width,canvas_cache.canvas.height);
        setFont({size:null});
    }
    function remove(comment){
        var p = comments.indexOf(comment);
        if(p!= -1){
            comments.splice(p,1);
        }
    }
    var setFont = function(){
        var size;
        return function(comObj){
            if(size != comObj.size){
                size = comObj.size;
                canvas_cache.font = '600 '+size +"px"+" Arial";
            }
        };
    }();
    var setColor = function(comObj){
        var colorCache = {};
        return function(comObj){
            var color;
            if(colorCache[comObj.color]){
                color = colorCache[comObj.color];
            }
            else{
                color = comObj.color.toString(16);
                color = color.length >= 6 ? color : new Array(6 - color.length + 1).join("0") + color;
                color = "#" + color;
                colorCache[comObj.color] = color;

            }
            canvas_cache.fillStyle = color;
        };
    }();
    function setAlpha(opacity){
        canvas_cache.globalAlpha = opacity;
    }

    function drawCache(){
        var staticComment = [];
        canvas_cache.textAlign = "start";
        comments.forEach(function(comObj,index){
            var x = comObj.align_x;
            if(x === "middle"){
                x = canvas_cache.canvas.width/2;                //顶端弹幕与底端弹幕层级较高
                staticComment.push({
                  x:x,
                  comObj:comObj
                });
            }else{
              setFont(comObj);
              setColor(comObj);
              canvas_cache.fillText(comObj.text,x,comObj.align_y+comObj.height);
              canvas_cache.strokeText(comObj.text,x,comObj.align_y+comObj.height);
            }
        });
        canvas_cache.textAlign = "center";
        staticComment.forEach(function(item,index){
            setFont(item.comObj);
            setColor(item.comObj);
            canvas_cache.fillText(item.comObj.text,item.x,item.comObj.align_y+item.comObj.height);
            canvas_cache.strokeText(item.comObj.text,item.x,item.comObj.align_y+item.comObj.height);
        });
    }
    function draw(){
        canvas.drawImage(canvas_cache.canvas,0,0);
    }
    function getWidth(comment){
        setFont(comment);
        return canvas_cache.measureText(comment.text).width;
    }
    function resize(width,height){
        canvas_cache.canvas.width = canvas.canvas.width = width;
        canvas_cache.canvas.height = canvas.canvas.height = height;
    }
    return{ bind, add, draw, drawCache, setAlpha, clear, clearCache, getWidth, resize };
});
