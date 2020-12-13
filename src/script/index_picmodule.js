define(['jlazyload'], () => {
    return {
        init: function() {
            const $section2 = $('.section2 ul');
            //1.渲染section页面
            $.ajax({
                url: 'http://localhost/dashboard/JS2010/week06/Day%2029-Day%2031_jquery/projectname/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                let $strhtml = '';
                $.each(data, function(index, value) {
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
                $section2.html($strhtml);
                // $(function() { //页面加载完成
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn" //显示方法：谈入
                //     });
                // });
            });

        }
    }
})