function vol() {
    var c = $(".ui.vertical.labeled.icon.menu").attr('alt');
    if (c == "1.0") {
        $('.volume').removeClass('up');
        $('.volume').addClass('off');
        $(".ui.vertical.labeled.icon.menu").attr('alt', '0.0');
    } else {
        $('.volume').removeClass('off');
        $('.volume').addClass('up');
        $(".ui.vertical.labeled.icon.menu").attr('alt', '1.0');
    }

}
function xxx(dataz, optionz, nz) {
    switch (dataz[optionz][nz][0]) {

        case "ok":
            return 'ui button green';
        case "error":
            return 'ui button red';
        case "":
            return 'ui button';
    }
}


$(document).ready(function () {
    timeDown(1);//每秒迴圈
    $('.item.ing').hover()
    $(".ui.vertical.fluid.tabular.menu .item").click(function () { //左邊公司sidebar 點擊後更新公司監控項目的內容
        $('#igold').html('<div class="ui active inverted dimmer"><div class="ui text loader">讀取資料中</div> </div>');
        $(".item.active").removeClass('active'); //移除目前sidebar亮點
        $(this).addClass('active');//顯示目前sidebar在哪個公司
        var cls = $(this).attr('id');
        $.get("/index_content/", {company: $(this).attr('id')}, //ajax的get去傳company的字典
            function (data) {
                $('#igold').html(data);
                $('#igold').attr('class', 'ui raised very padded container segment ' + cls);
            });

    });
});


function update() {

    $.get("/update_errors/", {}, function (data) {
        var nok = $("#cz").attr('alt');
        var mok = $("#hr_title").attr('alt');
        if (nok != mok) {
            $("#cz").html(data);
            $("#hr_title").attr('alt', nok);
        }
    });

    $.getJSON("/update_status/", function (data) {

            voice(data);
            $('span').each(function () {
                var kinds = $(this).attr('alt');
                var nid = $(this).attr('id');
                var n_text = $(this).text();
                if (nid == 'ratedetail' || nid == 'cn01paging' || nid == 'cn02paging') {
                    $(this).html(data[kinds][nid][0]);

                } else if (nid == 'ratedetail1') {
                    $(this).html(data[kinds].ratedetail[1]);
                    if (n_text != data[kinds].ratedetail[1]) {
                        $(this).fadeOut(500).fadeIn(500);
                    }
                } else {
                    $(this).html(data[kinds][nid]);
                    if (n_text != data[kinds][nid]) {
                        $(this).fadeOut(500).fadeIn(500);
                    }
                }

            });
            $(".ui.button").each(function () {
                var n = $(this).attr('id');
                if (data.igold[n] != undefined) {
                    var n_text1_1 = data.web_json.cn01paging;
                    var n_text2_1 = data.web_json.cn02paging;
                    var n_text1 = $("#cn01paging").text();
                    var n_text2 = $("#cn02paging").text();
                    $(this).attr('class', xxx(data, 'igold', n));
                }
                if (data.bibgold[n] != undefined) {
                    $(this).attr('class', xxx(data, 'bibgold', n));
                }
                var ukk = 'uk';
                if (data[ukk][n] != undefined) {
                    $(this).attr('class', xxx(data, 'uk', n));
                }

                if (data.acetop[n] != undefined) {
                    $(this).attr('class', xxx(data, 'acetop', n));
                }
                var for079 = '079'
                if (data[for079][n] != undefined) {
                    $(this).attr('class', xxx(data, '079', n));
                }

                if (data.igold_price[n] != undefined) {
                    $(this).attr('class', xxx(data, 'igold_price', n));
                }
                if (data.igold_m[n] != undefined) {
                    $(this).attr('class', xxx(data, 'igold_m', n));
                }

            });


        }
    )
    ;
}
function voice(data) {
    var y = $("#cz").attr('alt');
    var audio = document.createElement("audio");
    var volume_trigger = $(".ui.vertical.labeled.icon.menu").attr('alt');
    if (data.count.ok < y) {
        audio.src = "/static/audio/error.mp3";
    }
    if (y < data.count.ok) {
        audio.src = "/static/audio/ok.mp3";
    }

    $("#cz").attr('alt', data.count.ok);
    $('.green.label').text(data.count.ok);
    $('.red.label').text(data.count.error);
    $('.grey.label').text(data.count.space);
    audio.volume = parseFloat(volume_trigger);
    audio.play();
}
function timeDown(i) {
    if (i == 1) {
        update();
    }

    setTimeout(function () {
        timeDown(1);
    }, 1000)
}

