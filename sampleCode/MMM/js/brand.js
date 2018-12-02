// 品牌详情
$(function () {
    //  1. 获取id
    var brandTitleId = getSearch("brandTitleId");
    var pageSize = 4;
    var productId;
    var proInfo = {};
    var brand = getSearch("brand");
    $(".brantit").text(brand);
    
    // 2. 渲染品牌列表
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrand",
        data: {
            brandtitleid: brandTitleId
        },
        dataType: "json",
        success: function (info) {
            // console.log(info);
            var htmlStr = template("brandTmp", info);
            $(".brand ul").html(htmlStr);
        }
    })

    // 3. 渲染排行列表
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrandproductlist",
        data: {
            brandtitleid: brandTitleId,
            pagesize: pageSize
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            productId = info.result[0].productId;
            // 获取第一个产品的图片和名称
            proInfo["img"] = info.result[0].productImg;
            proInfo["tit"] = info.result[0].productName;

            var htmlStr = template("sortTmp", info);
            $(".sort ul").html(htmlStr);

            // 评论渲染
            comRender();
        }
    })


    // 4. 渲染评论列表
    function comRender() {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductcom",
            data: {
                productid: productId
            },
            dataType: "json",
            success: function (info) {
                info.result.forEach(function (v, i) {
                    v["proForm"] = v.comFrom.split("：")[1];
                });
                info["img"] = proInfo["img"];
                info["tit"] = proInfo["tit"];
                console.log(info);
                var htmlStr = template("comTmp", info);
                $(".comment ul").html(htmlStr);
            }
        })
    }
    

})