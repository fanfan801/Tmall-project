define([], () => {
    return {
        init: function() {
            const $form = $('form');
            const $username = $('#username');
            const $phone = $('#phone');
            const $pwd = $('#password');
            const $span = $('.spanintro');
            const $spanhint = $('.error');
            const $spanzq = $('.zqts');


            // 定义检测标记
            $userflag = true;
            $phoneflag = true;
            $pwdflag = true;


            //用户注册获取焦点
            $username.on('focus', function() {
                    $span.eq(0).css('color', '#333').html('设置后不可更改，中英文均可，最长14个英文或七个汉字')

                })
                //用户注册失去焦点
            $username.on('blur', function() {
                $span.eq(0).html('');
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $strLen = $value.replace(/[\u4e00-\u9fa5]/g, '**').length; //中文当做两个字符
                    if ($strLen > 0 && $strLen <= 14) {
                        let $reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                        if ($reg.test($value)) {
                            $spanhint.eq(0).html('');
                            $spanzq.eq(0).html('√').css('color', '#fff');
                            $spanzq.eq(0).show();
                            $userflag = true;

                            //用户名格式没有问题，将用户名传给后端。
                            $.ajax({
                                type: 'post',
                                url: 'http://10.31.161.126/dashboard/Tmallproject/php/reg.php',
                                data: {
                                    username: $username.val()
                                }
                            }).done(function(data) {
                                if (!data) { //不存在
                                    $spanzq.eq(0).html('√').css('color', '#fff');
                                } else { //存在
                                    $spanhint.eq(0).html('此用户名太受欢迎,请更换一个').css('color', 'red');
                                }
                            });


                        } else {
                            $spanhint.eq(0).html('用户名格式有误').css('color', 'red');
                            $userflag = false;
                        }
                    } else {
                        $spanhint.eq(0).html('用户名长度有误').css('color', 'red');
                        $userflag = false;
                    }
                } else {
                    $spanhint.eq(0).html('用户名不能为空').css('color', 'red');
                }
            });




            //手机号码获取焦点
            $phone.on('focus', function() {
                    $span.eq(1).css('color', '#333').html('请输入11位正确的手机号码')

                })
                //手机号码失去焦点

            $phone.on('blur', function() {
                $span.eq(1).html('');
                if ($phone.val() !== '') {
                    var reg = /^1[3|5|8]\d{9}$/;
                    if (reg.test($phone.val())) {
                        $spanhint.eq(1).html('');

                        $spanzq.eq(1).css('color', '#fff').html('√');
                        $spanzq.eq(1).show();

                        $phoneflag = true;

                    } else {
                        $spanhint.eq(1).css('color', 'red').html('手机号码格式不正确');
                        $phoneflag = false;
                    }
                } else {
                    $spanhint.eq(1).css('color', 'red').html('手机号不能为空');
                    $phoneflag = false;

                }

            })

            //密码注册获取焦点

            $pwd.on('focus', function() {
                $span.eq(2).css('color', '#333').html('长度为8-14个字符，字母/数字以及标点符号至少包含2种')

            })

            //密码强度检测
            $pwd.on('input', function() {

                let $value = $(this).val(); //当前表单的值
                // console.log($value);
                if ($value.length >= 8 && $value.length <= 14) {
                    let $regnum = /\d+/;
                    let $reguppercase = /[A-Z]+/;
                    let $reglowercase = /[a-z]+/;
                    let $other = /[\W_]+/; //特殊字符%&^$#@!*
                    let $count = 0; //字符种类的统计结果。

                    if ($regnum.test($value)) { //值存在数字
                        $count++;
                    }
                    if ($reguppercase.test($value)) {
                        $count++;
                    }
                    if ($reglowercase.test($value)) {
                        $count++;
                    }
                    if ($other.test($value)) {
                        $count++;
                    }

                    //根据统计的种类输出弱中强
                    switch ($count) {
                        case 1:
                            $spanhint.eq(2).css('color', 'red').html('弱');
                            $pwdflag = false;
                            break;
                        case 2:
                        case 3:
                            $spanhint.eq(2).css('color', 'orange').html('中')
                            $pwdflag = true;
                            break;
                        case 4:
                            $spanhint.eq(2).css('color', 'green').html('强')
                            $pwdflag = true;
                            break;
                    }




                } else {
                    $spanhint.eq(2).css('color', 'red').html('密码长度有误')

                }


            })


            //密码注册失去焦点
            $pwd.on('blur', function() {
                $span.eq(2).html('');
                if ($pwd.val() !== '') {
                    if ($pwdflag) {
                        $spanhint.eq(2).html('');
                        $spanzq.eq(2).css('color', '#fff').html('√');
                        $spanzq.eq(2).show();
                    }

                } else {
                    $spanhint.eq(2).css('color', 'red').html('密码不能为空');
                    $pwdflag = false;


                }
            })


            //阻止表单的跳转

            $form.on('submit', function() {
                if ($username.val() === '') {
                    $spanhint.eq(0).css('color', 'red').html('用户名不能为空');
                    $userflag = false;
                }
                if ($phone.val() === '') {
                    $spanhint.eq(1).css('color', 'red').html('手机号不能为空');
                    $phoneflag = false;
                }
                if ($pwd.val() === '') {
                    $spanhint.eq(2).css('color', 'red').html('密码不能为空');
                    $pwdflag = false;
                }

                if (!$userflag || !$phoneflag || !$pwdflag) {
                    return false;

                }
            })


















            //init
        }
    }
})