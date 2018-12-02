// 优惠券商品
$(function () {
    // 1. 获取id
    var couponId = getSearch("couponId");
    var couponTitle = getSearch("couponTitle");
    $(".couponTitle").html(couponTitle);
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcouponproduct",
        data: {
            couponid: couponId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("listTmp", info);
            $(".list ul").html(htmlStr);

            // 2. 模态框
            
            $(".list").on("click", ".mo", function() {
                var imgObj = {};
                var imgArr = [];
                var id;
                // 当前图片
                id = $(this).data("id");
                if (info.result.length != 1 && id != 0) {
                    imgArr.push(info.result[id].couponProductImg);
                }

                // 其他图片
                info.result.forEach(function (v, i) {
                    imgArr.push(v.couponProductImg);
                });
                imgObj["imgArr"] = imgArr;
                console.log(imgObj);
                // 动态渲染
                var htmlStri = template("modalTmp", imgObj);
                $(".swiper-wrapper").html(htmlStri);

                $(".modal").show();
                console.log(info.result.length,id);
                // 轮播图
                if (info.result.length != 1) {
                    var mySwiper = new Swiper ('.swiper-container', {
                        direction: 'horizontal', 
                        loop: true, // 循环模式选项
                        // 如果需要前进后退按钮
                        navigation: {
                          nextEl: '.swiper-button-next',
                          prevEl: '.swiper-button-prev',
                        }
                      }) 
                }
                
            })
                
            $(".modal").on("click", ".close", function () {
                $(".modal").hide();
            })
            
        }
    })

    
})