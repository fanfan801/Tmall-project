define([], () => {
    return {
        init: function() {
            const $username = $('#username');
            const $span = $('span');
            $username.on('focus', function() {
                $span.eq(0).css('color', 'red').html('设置后不可更改，中英文均可，最长14个英文或七个汉字')

            })


            $username.on('blur', function() {
                if ($username.val() !== '') {
                    var $strLen = $username.val().replace(/[\u4e00-\u9fa5]/g, '**').length;
                    if ($strLen > 0 && $strLen <= 14) {
                        var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                        if (reg.test($(this).val())) {
                            $span.eq(0).css('color', 'green').html('用户名可注册')

                        } else {
                            $span.eq(0).css('color', 'red').html('用户名格式有误')
                        }

                    } else {
                        $span.eq(0).css('color', 'red').html('用户名长度有误')

                    }

                } else {
                    $span.eq(0).css('color', 'red').html('用户名不能为空')
                }



                // $.ajax({
                //     type: 'post',
                //     url: 'http://10.31.161.126/dashboard/Tmallproject/php/reg.php',
                //     data: {
                //         xingming: $username.val()
                //     }
                // }).done(function(data) { //data就是后端返回的结果
                //     console.log(data);
                //     if (!data) { //不存在
                //         $span.css('color', 'green').html('该用户名可注册');
                //     } else { //存在
                //         $span.css('color', 'red').html('该用户名已存在');
                //     }
                // });
            });














        }
    }
})