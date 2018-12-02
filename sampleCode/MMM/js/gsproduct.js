// 凑单品
$(function () {
    var shopId = 0;
    var areaId = 0;
    // 1. 渲染店铺
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getgsshop",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("mallTmp", info);
            $("#mall ul").html(htmlStr);

        }
    })

    // 2. 渲染地区
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getgsshoparea",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("areaTmp", info);
            $("#area ul").html(htmlStr);
        }
    })

    // 3. 渲染列表
    function render () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsproduct",
            data: {
                shopid: shopId,
                areaid: areaId
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("listTmp", info);
                $(".list ul").html(htmlStr);
            }
        })
    }

    render();

    // 4. 点击京东
    $(".jd").on("click", function () {
        show($("#mall"),$("#area"),$("#price"));
        $(this).find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
    })

    // 5. 点击华北
    $(".hb").on("click", function () {
        show($("#area"),$("#mall"),$("#price"));
        $(this).find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
    })

    // 6. 点击价格
    $(".jg").on("click", function () {
        show($("#price"),$("#area"),$("#mall"));
        $(this).find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");

    })

    // 对应显示， 其他隐藏
    function show (a,b,c) {
        a.stop().slideToggle();
        b.hide();
        c.hide();
    }

    // 7. 点击京东子元素

    $("#mall").on("click", "li", function() {
        $(this).addClass("on").siblings().removeClass("on");
        $("#mall").hide();
        $(".jd span").text($(this).text());
        $(".jd").find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
        shopId = $(this).data("id");
        render();
    })

    // 8. 点击华东子元素
    $("#area").on("click", "li", function() {
        $(this).addClass("on").siblings().removeClass("on");
        $("#area").hide();
        $(".hb span").text($(this).text().slice(0,2));
        $(".hb").find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
        console.log($(this).text().slice(0,2));
        areaId = $(this).data("id");
        render();
    })

})