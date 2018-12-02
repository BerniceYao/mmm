// 品牌排行

$(function () {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrandtitle",
        dataType: "json",
        success: function (info) {
            info.result.forEach(function (v, i) {
                v["brand"] = v.brandTitle.split("十")[0];
            });
            console.log(info);
            var htmlStr = template("brandTmp", info);
            $(".brand ul").html(htmlStr);
        }
    })
})