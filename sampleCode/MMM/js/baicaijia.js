// 白菜价
$(function () {
    var titleId = 1;
    // 1. 渲染tab栏
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("tabTmp", info);
            $(".tab ul").html(htmlStr);

            // 动态设置ul的宽度
            var ulwidth = 0;
            var $lis = $(".tab ul").children();
            $lis.each(function (i, v) {
                 ulwidth += $(v).outerWidth();
            })
            $(".tab ul").width(ulwidth + 1);

            // 屏幕改变
            $(window).on("resize", function() {
                ulwidth = 0;
                $lis = $(".tab ul").children();
                $lis.each(function (i, v) {
                    ulwidth += $(v).outerWidth();
                })
                $(".tab ul").width(ulwidth + 1);
                console.log(ulwidth);
            })
            // 区域滚动
            new IScroll(".ulbox", {
                scrollX: true,
                scrollY: false
            });
            // 3.点击事件
            $(".tab .ulbox").on("click", "li", function () {
                $(".tab .ulbox li").removeClass("current");
                $(this).addClass("current");
                titleId = $(this).data("id");
                render();
            })
            

        }
    })

    // 2. 渲染商品列表
    function render () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
            data: {
                titleid: titleId 
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("contentTmp", info);
                $(".content ul").html(htmlStr); 
            }
        })
    }

    render();

    // 4. 返回顶部
    $("#gotop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    })


    
})