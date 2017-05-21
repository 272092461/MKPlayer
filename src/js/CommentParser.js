define(function() {
    var clist = [];
    function create(xml) {
        var ds = xml.getElementsByTagName("d");
        var d;
        for (var i = 0; i < ds.length; i++) {
            d = ds[i];
            if (!d.childNodes[0])
                continue;
            var obj = {};
            var opt = d.getAttribute("p").split(",");
            obj.stime = Math.round(opt[0] * 1000);                      //开始时间
            obj.mode = parseInt(opt[1]);                                //弹幕模式
            obj.size = parseInt(opt[2]);                                //字体大小
            obj.color = parseInt(opt[3]);                               //字体颜色
            obj.date = parseInt(opt[4]);                                //发送日期
            obj.pool = parseInt(opt[5]);                                //弹幕池
            if (opt[7] != null)
                obj.dbid = parseInt(opt[7]);                            //用户id
            obj.hash = opt[6];
            obj.text = d.childNodes[0].nodeValue.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
            add(obj);
        }
        return clist;
    }
    function binInsert(comment, arr) {
        if (arr.length === 0) {
            arr.push(comment);
            return 0;
        } else if (comment.stime <= arr[0].stime) {
            arr.unshift(comment);
            return 0;
        } else if (comment.stime >= arr[arr.length - 1].stime) {
            arr.push(comment);
            return arr.length-1;
        } else {
            var find = false;
            var start = 0;
            var stop = arr.length;
            var position;
            while (!find) {
                position = start + parseInt((stop - start) / 2);
                if (arr[position - 1].stime <= comment.stime && arr[position].stime >= comment.stime) {
                    find = true;
                    arr.splice(position, 0, comment);
                    return position;
                } else if (arr[position].stime > comment.stime) {
                    stop = position;
                } else {
                    start = position + 1;
                }
            }
        }
    }
    function add(comment) {
        return binInsert(comment, clist);
    }
    function addXML(xml) {
        var obj = {};
        var opt = xml.getAttribute("p").split(",");
        obj.stime = Math.round(opt[0] * 1000)+20;
        obj.mode = parseInt(opt[1]);
        obj.size = parseInt(opt[2]);
        obj.color = parseInt(opt[3]);
        obj.date = parseInt(opt[4]);
        obj.pool = parseInt(opt[5]);
        if (opt[7] != null)
            obj.dbid = parseInt(opt[7]);
        obj.hash = opt[6];
        obj.text = d.childNodes[0].nodeValue.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
        return add(obj);
    }
    return {create: create, add: add, addXML: addXML};
});
