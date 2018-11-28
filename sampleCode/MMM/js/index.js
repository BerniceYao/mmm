// 首页
$(function () {

    // 1. 渲染导航
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getindexmenu",
        dataType: "json",
        success: function (info) {
            // console.log(info);
            var htmlStr = template("navTmp", info);
            $(".m_nav ul").html(htmlStr);
            $(".m_nav .more").nextAll().hide();
        }
    })

    // 2. 点击更多显示或隐藏
    $(".m_nav").on("click", ".more", function (e) {
        $(this).nextAll().slideToggle();
        console.log(1);
        e.preventDefault();
    })

    // 3. 渲染推荐
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var comcountArr = [];
            info.result.forEach(function (v, i) {
                comcountArr.push(v.productComCount.slice(1).split("人")[0]);
            });
            comcountArr.forEach(function(v,i){
                info.result[i].comcount = v;
            });
            var htmlStr = template("disTmp", info);
            $(".m_discount ul").html(htmlStr);
        }
    })
})