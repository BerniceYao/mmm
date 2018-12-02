// 商品详情页

$(function () {
    
    var productId = getSearch("productId");
    var categoryId = getSearch("categoryId");
    var navObj = {};
    
    // 1. 渲染导航 
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {
            categoryid: categoryId
        },
        dataType: "json",
        success: function (info) {
            navObj["category"] = info.result[0].category;
        }
    })

    //  2. 商品
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproduct",
        data: {
            productid: productId
        },
        dataType: "json",
        success: function (info) {
            navObj["product"] = info.result[0].productName.split(" ")[0];
            var htmlStr1 = template("navTmp", navObj);
            $(".breadcrumb").html(htmlStr1);
            var htmlStr2 = template("infoTmp",info);
            $(".proInfo").html(htmlStr2);
            console.log(info);
        }
    })

    //  3. 评论
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {
            productid: productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("comTmp", info);
            $(".comments .list").html(htmlStr);
        }
    })
})