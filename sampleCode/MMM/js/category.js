// 分类页
$(function () {
    // 1. 渲染分类标题
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("cateTmp", info);
            $(".cate").html(htmlStr);
            $(".m_category").on("click", ".classify", function () {
                $(this).find("i").toggleClass("fa-angle-right").toggleClass("fa-angle-down");
                var titleId = $(this).data("id");
                // 没有渲染过发送请求，否则直接渲染
                if($(this).next().find("li").length === 0) {
                    renderById(titleId);
                } else {
                    $(this).next().slideToggle();
                }
            })
            
        }
    })

    // 2. 点击渲染列表
     function renderById (id) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getcategory",
            data: {
                titleid: id
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("listTmp", info);
                $(".list[index=" + id + "]").html(htmlStr);
                $(".list[index=" + id + "]").slideToggle();
            }
        })
    }
})