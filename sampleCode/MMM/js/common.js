// 公共功能

// 1. 返回顶部
$("#top").click(function () {
    $("html,body").animate({
        scrollTop: 0
    }, 500);
})

 // 2. 解析地址栏参数
function getSearch (k) {
    var str = decodeURI(location.search);
    str = str.slice(1);
    var arr = str.split("&");
    var obj = {};
    arr.forEach(function (v, i){
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    })
    return obj[k];
}
