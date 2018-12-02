// 省钱控
$(function () {
    // 1. 渲染商品列表
    var pageId = 1;
    var totalSize;
    function renderById () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getmoneyctrl",
            data: {
                pageid: pageId
            },
            dataType: "json",
            success: function (info) {                
                var comcountArr = [];
                info.result.forEach(function (v, i) {
                    comcountArr.push(v.productComCount.slice(1).split("人")[0]);
                });
                comcountArr.forEach(function(v,i){
                    info.result[i].comcount = v;
                });
                info["totalSize"] = Math.ceil(info.totalCount / info.pagesize);
                totalSize = info["totalSize"];
                console.log(info);
                var htmlStr = template("monTmp", info);
                $(".m_discount").html(htmlStr);
                $("option[value=" + pageId + "]").prop("selected", true);
                pageId === 1 ? $(".m_discount .prev").addClass("not_allowed") : $(".m_discount .prev").removeClass("not_allowed");
                pageId === totalSize ? $(".m_discount .next").addClass("not_allowed") : $(".m_discount .next").removeClass("not_allowed");
            }
        })
    }

    renderById();

    // 2. 分页

    $(".m_discount").on("click", ".next", function () {
        if( pageId >= totalSize) {
            return false;
        }
        pageId++;
        renderById();
    })

    $(".m_discount").on("click", ".prev", function () {
        if( pageId <= 1 ) {
            return false;
        }
        pageId--;
        renderById();
        console.log(pageId);
    })

    $(".m_discount").on("change", ".selectBox",function () {
         pageId = $(this).children("option:selected").data("id");
         renderById();
    })

})
