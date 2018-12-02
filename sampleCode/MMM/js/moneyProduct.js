// 折扣商品详情页
$(function () {
    // 1. 获取id
    var productId = getSearch("productId");
    console.log(productId);
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getmoneyctrlproduct",
        data: {
            productid: productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("mainTmp", info);
            $(".main").html(htmlStr);
        }
    })
})
