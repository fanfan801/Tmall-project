define(['jlazyload'], () => {
    return {
        init: function() {

            //搜索引擎





            // 菜单的切换
            $('.bl-span1').hover(function() {
                $('.banner-menu1').show();
                $('.banner-menu2').hide();


            })
            $('.bl-span2').hover(function() {
                $('.banner-menu2').show();
                $('.banner-menu1').hide();



            })





            //菜单效果 点击二级菜单进入列表页

            //1.鼠标移入左侧的li元素，显示右侧的大盒子。
            const $list = $('.banner-menu1 li');
            const $cartlist = $('.cartlist');
            const $items = $('.item');

            $list.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                $items.eq($(this).index()).show().siblings('.item').hide();
                //改变右侧大盒子的位置
                let $scrolltop = $(window).scrollTop();
                let $bannertop = $('.banner-bottom').offset().top;
                if ($scrolltop > $bannertop) {
                    $cartlist.css({
                        top: $scrolltop - $bannertop
                    })
                } else {
                    $cartlist.css({
                        top: 0
                    })
                }

            }, function() {
                $cartlist.hide()
            })

            //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
            $cartlist.hover(function() {
                $cartlist.show()
            }, function() {
                $cartlist.hide()
            })



            //检测是否用户已经登录
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.dlq').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.dlq').show();
                localStorage.removeItem('loginname');
            });



            // section8区域的渲染效果

            const $section8 = $('.section8 ul');
            //1.渲染section页面
            $.ajax({
                url: 'http://10.31.161.126/dashboard/Tmallproject/php/index1.php',
                dataType: 'json'
            }).done(function(data) {
                // console.log(data);
                let $strhtml = '';
                $.each(data, function(index, value) {
                    // console.log(value);
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                            <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                            <span>￥${value.price}</span>
                                <p>${value.title}</p>

                            </a>
                        </li>
                    `;
                });
                $section8.html($strhtml);
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });




            // 轮播图效果

            const $lunbo = $('.banner-lunbo');
            const $piclist = $('.banner-lunbo ul li');
            const $btnlist = $('.banner-lunbo ol li');
            const $right = $('#right');
            let $num = 0;
            let $timer1 = null;

            //1.点击横线切换
            $btnlist.on('mouseover', function() {
                $(this).addClass('active').siblings('li').removeClass('active');
                $piclist.eq($(this).index()).stop(true).animate({
                    opacity: 1

                }).siblings('li').stop(true).animate({
                    opacity: 0
                })

            })

            //2 、右箭头做自动轮播的效果
            $right.on('click', function() {
                $num++;
                if ($num > $piclist.length - 1) {
                    $num = 0;
                }
                $piclist.eq($num).animate({
                    opacity: 1
                }).siblings($num).animate({
                    opacity: 0
                })
                $btnlist.eq($num).addClass('active').siblings('li').removeClass('active')

            })

            //3 、自动轮播
            $timer1 = setInterval(function() {
                $right.click()
            }, 2000)

            //4 、鼠标移入停止自动播放
            $lunbo.hover(function() {
                clearInterval($timer1)

            }, function() {
                $timer1 = setInterval(function() {
                    $right.click()
                }, 2000)

            })


            // 楼梯效果 获取元素
            var $loutinav = $('#loutinav');
            var $louti = $('#loutinav li').not('.last').not('.first');
            var $louceng = $('.louceng');


            //楼梯显示
            function scroll() {
                var $scrolltop = $(window).scrollTop();
                if ($scrolltop >= 600) {
                    $loutinav.show();
                    $('.xfk').show();
                    $louceng.each(function(index, element) {
                        // console.log(element);
                        var $loucengtop = $(element).offset().top;
                        if ($loucengtop >= $scrolltop) {
                            $louti.removeClass('active1');
                            $louti.eq(index).addClass('active1');
                            return false;
                        }
                    })
                } else {
                    $loutinav.hide();
                    $('.xfk').hide()
                }

            }

            scroll();
            $(window).on('scroll', function() {
                scroll();
            })

            $louti.on('click', function() {
                $(window).off('scroll');
                $(this).addClass('active1').siblings('li').removeClass('active1');
                var $loucengtop = $louceng.eq($(this).index() - 1).offset().top - $('.xfk').height();
                $('html').animate({
                    scrollTop: $loucengtop
                }, function() {
                    $(window).on('scroll', function() {
                        scroll();
                    })
                })
            })

            //回到顶部
            $('.last').on('click', function() {
                $('html').animate({
                    scrollTop: 0
                })
            })



            // 横排渲染区域

            const $section3 = $('.s3pic ul');
            //1.渲染section页面
            $.ajax({
                url: 'http://10.31.161.126/dashboard/Tmallproject/php/index2.php',
                dataType: 'json'
            }).done(function(data) {
                // console.log(data);
                let $strhtml = '';
                $.each(data, function(index, value) {
                    // console.log(value);
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                            <img class="lazy" data-original="${value.url}" width="200" height="200"/>

                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                                

                            </a>
                        </li>
                    `;
                });
                $section3.html($strhtml);
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });










        }


    }
});