define(['jcookie'], () => {
    return {
        init: function() {

            //1.获取cookie的编号和数量
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(',');
                    let $arrnum = $.cookie('cookienum').split(',');
                    // console.log($arrsid, $arrnum);
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]); //index:数组的索引
                    });

                }
            }

            getcookietoarray();

            // 2.渲染商品列表
            function rendergoods(sid, num) {
                $.ajax({
                    url: 'http://10.31.161.126/dashboard/Tmallproject/php/listdata.php',
                    dataType: 'json'
                }).done(function(datalist) {
                    data = datalist.pagedata;
                    $.each(data, function(index, value) {
                        if (sid == value.sid) {
                            let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆
                            $clonebox.find('.goods-pic img').attr('src', value.url);
                            $clonebox.find('.goods-pic img').attr('sid', value.sid);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.price);
                            $clonebox.find('.quantity-form input').val(num);
                            $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block'); //显示
                            $('.item-list').append($clonebox); //追加
                            calcprice();
                        }
                    })
                })
            }


            //3.计算总价--使用次数很多--函数封装
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());
                    }

                    $('.amount-sum').find('em').html($sum);
                    $('.totalprice').html($count.toFixed(2));
                })

            }

            //3.计算总价--使用次数很多--函数封装
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());
                    }
                });
                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html($count.toFixed(2));
            }

            //4.全选
            $('.allsel').on('change', function() {
                $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcprice();
            })

            let $inputs = $('.goods-item:visible').find(':checkbox');
            $('.item-list').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice(); //计算总价
            });

            //5 、数量的改变
            //数量增加

            $('.quantity-add').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
                $num++;
                if ($num > 99) {
                    $num = 99;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num); //赋值
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //单个商品总价
                calcprice(); //计算总
                addcookie($(this)); //数量发生改变，重新存储cookie

            })

            //数量减少
            $('.quantity-down').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
                $num--;
                if ($num <= 0) {
                    $num = 1;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num); //赋值
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //单个商品总价
                calcprice(); //计算总价
                addcookie($(this)); //数量发生改变，重新存储cookie
            })

            //文本框值改变
            $('.quantity-form input').on('input', function() {
                let $reg = /^\d+$/;
                let $value = $(this).val();
                if (!$reg.test($value)) {
                    $(this).val(1);
                }
                if ($value <= 0) {
                    $(this).val(1);
                }
                if ($value > 99) {
                    $(this).val(99);
                }
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //单个商品总价
                calcprice(); //计算总价
                addcookie($(this)); //数量发生改变，重新存储cookie

            })


            // 封装单个商品的总价
            function singlegoodsprice(obj) { //当前调用函数的元素对象，那条列表进行计算
                let $singleprice = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
                let $num = parseFloat(obj.parents('.goods-item').find('.quantity-form input').val());
                return ($singleprice * $num).toFixed(2); //保留2位小数。
            }

            //将改变后的值存放cookie中 - 获取商品的sid,通过sid找到商品的数量。
            let $arrsid = [];
            let $arrnum = [];

            function cookietoarray() { //cookie转换成数组
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    $arrsid = $.cookie('cookiesid').split(','); //[4,5,6] 
                    $arrnum = $.cookie('cookienum').split(','); //[10,50,60] 
                }
            }

            function addcookie(obj) {
                cookietoarray() //cookie转换成数组
                let $sid = obj.parents('.goods-item').find('img').attr('sid'); //获取sid
                $arrnum[$.inArray($sid, $arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val(); //赋值
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });

            }


            //6.删除 - 结构+cookie
            //删除单个商品
            $('.b-action a').on('click', function() {
                cookietoarray(); //cookie转换成数组
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goods-item').remove();
                    calcprice(); //计算总价
                    delcookie($(this).parents('.goods-item').find('img').attr('sid'), $arrsid);
                    //传入当前的sid 和 cookiesid的值
                    if ($arrsid.length === 0) {

                        $.cookie('cookiesid', $arrsid, { expires: -1, path: '/' });
                        $.cookie('cookienum', $arrnum, { expires: -1, path: '/' });
                    }
                }
            });
            //删除选中商品
            $('.operation a').on('click', function() {
                cookietoarray(); //cookie转换成数组
                if (window.confirm('你确定要删除吗?')) {
                    $('.goods-item:visible').each(function() {
                        console.log($(this)); //表示当前遍历的goods-item
                        if ($(this).find(':checkbox').is(':checked')) { //当前的复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), $arrsid)
                        }
                    });
                    calcprice(); //计算总价
                }
            });

            //删除商品对应的sid和num
            //例如：delcookie(5,[4,5,6]);
            function delcookie(sid, $arrsid) { //sid:删除商品的sid   arrsid:数组，cookie里面的值
                let $sidindex = -1; //假设接收索引的值
                $.each($arrsid, function(index, value) {
                    if (sid === value) {
                        $sidindex = index; //接收删除项的索引值
                    }
                });

                //删除
                $arrsid.splice($sidindex, 1);
                $arrnum.splice($sidindex, 1);

                //重新设置cookie
                $.cookie('cookiesid', $arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });


                // init
            }
        }
    }
})