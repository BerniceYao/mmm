// 国内折扣
$(function () {


    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getinlanddiscount",
        dataType: "json",
        success: function (info) {
            info.result.forEach(function (v, i) {
                // v["trueSrc"] = v.productImg.split(" ")[1].split('"')[1];
                v["trueSrc"] = v.productImg.split(' ')[1].split('src=')[1].slice(1).slice(0,-1);
            })
            console.log(info);
            var htmlStr = template("listTmp", info);
            $(".list ul").html(htmlStr);

            // 懒加载
            var $imgs = $(".list .imgBox");
            var timerId;
            // 1. 监听滚动事件 
            $(window).on("scroll", function () {
                clearTimeout(timerId);

                timerId = setTimeout(function() {
                    // 2. 判断是否在可视区
                    var scrollHeight = $(window).scrollTop();
                    var pageHeight = $(window).height();
                    $imgs.each(function (i, v) {
                        var height = $(this).offset().top;
                        if(height < scrollHeight + pageHeight) {
                            // 3. 判读是否有loading类
                            if($(this).find("img").hasClass("loading")) {
                                var img = $(v).data("img");
                                // var src = $(v).data("src");
                                $(this).html(img);
                                // $(this).find("img").attr("src",src);
                                $(this).find("img").removeClass("loading");
                            }
                        }

                    })
                }, 500)

            })
        } 
    })


})