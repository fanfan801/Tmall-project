define([], () => {
    return {
        init: function() {
            const $username = $('#username');
            const $phone = $('#phone');
            const $pwd = $('#password');
            const $span = $('span');
            //用户注册获取焦点
            $username.on('focus', function() {
                $span.eq(0).css('color', '#333').html('设置后不可更改，中英文均可，最长14个英文或七个汉字')

            })

            //用户注册失去焦点
            $username.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.126/dashboard/Tmallproject/php/reg.php',
                    data: {
                        xingming: $username.val()
                    }
                }).done(function(data) { //data就是后端返回的结果
                    // console.log(data);
                    if (!data) { //不存在
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

                        // $span.css('color', 'green').html('该用户名可注册');
                    } else { //存在
                        $span.css('color', 'red').html('该用户名已存在');
                    }
                });
            });


            //手机号码获取焦点
            $phone.on('focus', function() {
                    $span.eq(1).css('color', '#333').html('请输入11位正确的手机号码')

                })
                //手机号码失去焦点

            $phone.on('blur', function() {
                if ($phone.val() !== '') {
                    var reg = /^1[3|5|8]\d{9}$/;
                    if (reg.test($phone.val())) {
                        $span.eq(1).css('color', 'green').html('手机号可注册')

                    } else {
                        $span.eq(1).css('color', 'red').html('手机号格式有误')
                    }
                } else {
                    $span.eq(1).css('color', 'red').html('手机号不能为空')

                }

            })

            //密码注册获取焦点

            $pwd.on('focus', function() {
                $span.eq(2).css('color', '#333').html('请输入密码,长度为6-14个字符')

            })

            //密码注册失去焦点
            $pwd.on('blur', function() {
                if ($pwd.val() !== '') {

                } else {
                    $span.eq(2).css('color', 'red').html('密码不能为空')

                }
            })
















            //init
        }
    }
})