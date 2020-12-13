define([], () => {
    return {
        init: function() {
            //代码实现
            //1.鼠标移入左侧的li元素，显示右侧的大盒子。
            //1.鼠标移入左侧的li元素，显示右侧的大盒子。
            const $list = $('.banner-menu1 li');
            const $cartlist = $('.cartlist');
            const $items = $('.item');
            $list.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                //切换内容发生改变，不同的li对应不同的内容块。
                $items.eq($(this).index()).show().siblings('.item').hide();

                //改变右侧的大盒子的位置
                let $scrolltop = $(window).scrollTop();
                let $bannertop = $('.banner').offset().top;
                if ($scrolltop > $bannertop) {
                    $cartlist.css({
                        top: $scrolltop - $bannertop
                    });
                } else {
                    $cartlist.css({
                        top: 0
                    });
                }
            }, function() {
                $cartlist.hide();
            });

            //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
            $cartlist.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });


            //检测是否用户已经登录
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.login').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });



            //  轮播图1、获取元素
            const $section2 = $('.section2 ul');
            // //1.渲染section页面
            // $.ajax({
            //     url: 'http://localhost/dashboard/JS2010/week06/Day%2029-Day%2031_jquery/projectname/php/listdata.php',
            //     dataType: 'json'
            // }).done(function(data) {
            //     console.log(data);
            //     let $strhtml = '';
            //     $.each(data, function(index, value) {
            //         $strhtml += `
            //             <li>
            //                 <a href="detail.html?sid=${value.sid}">
            //                 <img class="lazy" data-original="${value.url}" width="200" height="200"/>
            //                     <p>${value.title}</p>
            //                     <span>￥${value.price}</span>
            //                 </a>
            //             </li>
            //         `;
            //     });
            //     $section2.html($strhtml);
            // $(function() { //页面加载完成
            //     $("img.lazy").lazyload({
            //         effect: "fadeIn" //显示方法：谈入
            //     });
            // });
            // });


        }


    }
});