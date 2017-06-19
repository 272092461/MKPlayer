define(function() {
    var clist = [];
    function create(xml) {
        var ds = xml.getElementsByTagName("d");
        var d;
        for (var i = 0; i < ds.length; i++) {
            d = ds[i];
            if (!d.childNodes[0])
                continue;
            addXML(d);
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
    function parseArrInt(arr){
      return arr.map( (item) => parseInt(item));
    }
    function addXML(xml, delay = 0) {
        var obj = {};
        var opt = xml.getAttribute("p").split(",");
        var optInt = parseArrInt(opt);
        [obj.stime, obj.mode, obj.size, obj.color, obj.date, obj.pool, obj.hash, obj.dbid] = optInt;
        obj.stime = Math.round(obj.stime * 1000) + delay;
        obj.text = xml.childNodes[0].nodeValue.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
        return add(obj);
    }
    return {create, add, addXML};
});
