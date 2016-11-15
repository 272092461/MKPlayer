define(function(){
    function create(comment){
        Object.defineProperty("height",{
            get:function(){
                return this.size;
            },
            set:function(val){
                this.size = val;
            },
            configurable:true,
            enumerable:true
        });
        
    }
    
    return {
        create:create
    }
});