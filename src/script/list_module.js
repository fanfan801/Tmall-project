define(['jlazyload'], () => {
    return {
        init: function() {
            const $liebiaoye = $('.liebiaoye ul');
            //1.渲染section页面
            $.ajax({
                url: 'http://10.31.161.126/dashboard/Tmallproject/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                let $strhtml = '';
                $.each(data, function(index, value) {
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
                $liebiaoye.html($strhtml);
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });

        }
    }
})