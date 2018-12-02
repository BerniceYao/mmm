// 商品列表页
$(function () {
    // 1. 获取id
    var categoryId = getSearch("categoryId");
    // console.log(categoryId);

    // 2. 渲染路径导航
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {
            categoryid: categoryId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("navTmp", info);
            $(".nav_spec").html(htmlStr);
        }
    })

    // 3. 渲染商品列表
    var pageId = 1;
    var totalSize;
    function render () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: {
                categoryid: categoryId,
                pageid: pageId
            },
            dataType: "json",
            success: function (info) {
                info["totalSize"] = Math.ceil(info.totalCount / info.pagesize);
                info["pageId"] = pageId;
                info["categoryId"] = categoryId;
                console.log(info);
                var htmlStr = template("proTmp", info);
                $(".proList").html(htmlStr);
                totalSize = info["totalSize"];
                $("option[value=" + pageId + "]").prop("selected", true);
                pageId === 1 ? $(".proList .prev").addClass("not_allowed") : $(".proList .prev").removeClass("not_allowed");
                pageId === totalSize ? $(".proList .next").addClass("not_allowed") : $(".proList .next").removeClass("not_allowed");

            }
        })
    }
    render();  
    
    // 4. 分页

    $(".proList").on("click", ".next", function () {
        if( pageId >= totalSize) {
            return false;
        }
        pageId++;
        render();
    })

    $(".proList").on("click", ".prev", function () {
        if( pageId <= 1 ) {
            return false;
        }
        pageId--;
        render();
        console.log(pageId);
    })

    $(".proList").on("change", ".selectBox",function () {
         pageId = $(this).children("option:selected").data("id");
         render();
    })



    
})