define(['jcookie'], () => {
    return {
        init: function() {
            // 1、前端通过地址栏获取列表页面传入的sid
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            //2 、 将获取的值传递给后端
            $.ajax({
                url: 'http://10.31.161.126/dashboard/Tmallproject/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                $('#smallpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                $('#bpic').attr('src', data.url);


                //3 、渲染放大镜下面的小图
                let $picurl = data.urls.split(',');
                // console.log($picurl);
                let $strhtml = '<ul>';
                $.each($picurl, function(index, value) {
                    $strhtml += `
                    <li>
                    <img src="${value}"/>
                    </li>
                    `
                })
                $strhtml += '<ul>';

                $('#list ').html($strhtml)
            })




            // 小图切换
            $('#list').on('click', 'li', function() {
                let $imgurl = $(this).find('img').attr('src');
                $('#smallpic').attr('src', $imgurl);
                // console.log($('#bf #bpic'));
                $('#bpic').attr('src', $imgurl);
            })

            //左右箭头的切换 
            let $num = 6;
            $('#right').on('click', function() {
                let $lists = $('#list ul li');
                if ($lists.size() > $num) {
                    $num++;
                    $('#left').css('color', '#333');
                    if ($lists.size() == $num) {
                        $('#right').css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    })
                }
            })
            $('#left').on('click', function() {
                // alert(1);
                let $lists = $('#list ul li');
                if ($num > 6) {
                    $num--;
                    $('#right').css('color', '#333');
                    if ($num <= 6) {
                        $('#left').css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    })

                }
            })

            // 放大镜效果
            const $spic = $('#spic');
            const $bpic = $('#bpic');
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width();
            $spic.hover(function() {

                $sf.css('visibility', 'visible');
                $bf.css('visibility', 'visible');
                $(this).on('mousemove', function(ev) {
                    let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });

                });
            }, function() {
                $sf.css('visibility', 'hidden');
                $bf.css('visibility', 'hidden');
            });

            // 购物车：(商品sid、商品数量)
            // 1 、设置存储变量的cookie
            let arrsid = [];
            let arrnum = [];
            // 2.判断是第一次存储，多次存储。
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.p-btn .jrgwc').on('click', function() {
                getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                if ($.inArray($sid, arrsid) === -1) { //不存在
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {
                    //通过$sid获取商品的数量所在的位置。
                    let $index = $.inArray($sid, arrsid);
                    // arrnum[$index]//原来的数组
                    // $('#count').val()//新添加的数量
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val()); //重新赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('按钮被点击了');
            });

        }
    }
});