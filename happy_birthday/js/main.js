note_id = 0;
win_height = 0;
music_player = new Audio();
pop_up_note_mode = true;
in_qq_browser = false;

text_prepared = false;
font_img = null;

function initViewport()
{
    if(/Android (\d+\.\d+)/.test(navigator.userAgent))
    {
        var version = parseFloat(RegExp.$1);

        if(version>2.3)
        {
            var phoneScale = parseInt(window.screen.width)/500;
            document.write('<meta name="viewport" content="width=500, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');

        }
        else
        {
            document.write('<meta name="viewport" content="width=500, target-densitydpi=device-dpi">');    
        }
    }
    else if(navigator.userAgent.indexOf('iPhone') != -1)
    {
        var phoneScale = parseInt(window.screen.width)/500;
        document.write('<meta name="viewport" content="width=500, height=750,initial-scale=' + phoneScale +', user-scalable=no" /> ');         //0.75   0.82
    }
    else 
    {
        document.write('<meta name="viewport" content="width=500, height=750,initial-scale=0.64" /> ');         //0.75   0.82

    }
    document.write('<style>@-webkit-keyframes rotatemusic {from {-webkit-transform: rotate(0deg);}to { -webkit-transform: rotate(360deg);}}::-webkit-input-placeholder {color: #000;}</style>');

    if(navigator.userAgent.match(/iPad/i)=="ipad" || navigator.userAgent.match(/iPhone/i)=="iPhone")
    {
        document.ontouchmove = function(e)
        {
            e.preventDefault();
        } 
    } 
}

function wrap_url(url)
{
    url = url.replace(/\./g, '_dian_');
    url = url.replace(/\:/g, '_maohao_');
    url = url.replace(/\//g, '_xiegang_');
    url = url.replace(/\?/g, '_wenhao_');
    url = url.replace(/\&/g, '_yu_');
    url = url.replace(/\=/g, '_denghao_');
    return url;
}
function getCookie(c_name)
{
    if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1; 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) 
                    c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
    return ""
}


function add_keyframes(name, cssbody)
{
    csstext = '@-webkit-keyframes ' + name + '{' + cssbody + '}';

    style = document.createElement('style');
    document.head.appendChild(style);
    sheet = style.sheet;
    sheet.insertRule(csstext, 0);
}

function create_imgdiv(url, idname, visible, x, y)
{
    imgdiv = document.createElement('div');
}

function objid(idname)
{
    return document.getElementById(idname);
}

function _kv(value)
{
    if(typeof(value) == 'undefined')
    {
        return false;
    }

    if(value == '')
    {
        return false;
    }

    if(value.charAt(0) == '#')
    {
        return false;
    }

    return true;
}

function _v(keyname)
{
    if(typeof(kawa_data[keyname]) == 'undefined')
    {
        return '';
    }

    return kawa_data[keyname];
}

// ---------------------------------------------------------------------
// text
function reset_text_height()
{
    var height = objid('textdiv').offsetHeight;
    objid('textdiv').style.height = height + 'px';
}

function kawa_init_async()
{
    read_base();
    create_textdiv();
    create_music();
}

function kawa_init()
{
    document.body.style.margin = '0px';
    create_base();
    setTimeout("kawa_init_async()", 100);

    if(in_qq_browser)
    {
        setTimeout("play_music()", 500);
    }
 }

function is_show_words()
{
    if(typeof(kawa_data.show_words) == 'undefined')
    {
        return true;
    }

    if(kawa_data.show_words != 'no')
    {
        return true;
    }

    return false;
}

function read_base()
{
    win_height = objid('basepoint').offsetTop;
}

function create_base()
{
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '0px';
    div.style.width = '1px';
    div.style.height = '1px';
    div.style.left = '-100px';
    div.id = 'basepoint';
    document.body.appendChild(div);
}

function make_text_animation()
{
    var mask = objid('textmask');
    var textdiv = objid('textdiv');
    var namediv = objid('namediv');

    if(kawa_data.mode == 'up')
    {

        mask.style.webkitMaskImage = 'url(http://kawaweika.qiniudn.com/font/shu.png)';
        mask.style.webkitMaskSize  = 'contain';
        mask.style.zIndex          = 10000;
        if(namediv == null)
        {
            var height = 0;
            if(font_img && textdiv.offsetHeight == 0)
            {
                height = font_img.height;
            }
            else
            {
                height = textdiv.offsetHeight;
            }
            var keycss = 'from{-webkit-transform:translate(0px, ' + mask.offsetHeight + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + height + 'px);}' 

            add_keyframes('textdivani', keycss);
            var dt = (mask.offsetHeight + height) / kawa_data.speed;
            textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';
        }
        else
        {
            var keycss = 'from{-webkit-transform:translate(0px, ' + mask.offsetHeight + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + (textdiv.offsetHeight + namediv.offsetHeight) + 'px);}' 

            add_keyframes('textdivani', keycss);
            var dt = (mask.offsetHeight + textdiv.offsetHeight + namediv.offsetHeight) / kawa_data.speed;
            textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';


            var keycss = 'from{-webkit-transform:translate(0px, ' + (mask.offsetHeight + textdiv.offsetHeight)  + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + namediv.offsetHeight + 'px);}' 

            add_keyframes('namedivani', keycss);


            namediv.style.webkitAnimation = 'namedivani ' + dt + 's linear infinite';
        }
    }
    else if(kawa_data.mode == 'left')
    {
        var keycss = 'from{-webkit-transform:translate(' + mask.offsetWidth + 'px, 0px);}' +
                 'to{-webkit-transform:translate(-' + textdiv.offsetWidth + 'px, 0px);}' 

        add_keyframes('textdivani', keycss);

        var dt = (mask.offsetWidth + textdiv.offsetWidth) / kawa_data.speed;

        textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';

        mask.style.webkitMaskImage = 'url(http://kawaweika.qiniudn.com/font/bg6.png)';
        mask.style.webkitMaskSize  = 'contain';
        mask.style.zIndex          = 1;
    }
    else if (kawa_data.mode == 'print')
    {
        onPrint();
        setTimeout("onPrintAni()", 1500);
    }
    else if (kawa_data.mode == 'alldisplay')
    {
        objid('textdiv').style.top = '0px';
        var keycss = 'from{opacity:0;}' +
                 'to{opacity:1;}' 

        add_keyframes('textdivani', keycss);
        textdiv.style.webkitAnimation = 'textdivani '+kawa_data.speed+'s linear forwards';
        if(getQueryStr('shuming') != '')
        {
            textdiv.style.height = textdiv.offsetHeight - namediv.offsetHeight;
            namediv.style.top = textdiv.offsetHeight;
            namediv.style.webkitAnimation = 'textdivani '+kawa_data.speed+'s linear forwards';
        }

    }
    else if (kawa_data.mode == "ualizer")
    {

        objid('textdiv').innerHTML = '';
        objid('textdiv').style.height = '100%';
        objid('textdiv').style.width = '100%';
        var txt = $('#textdiv');

        var options = {
            duration: kawa_data.speed,          // 每段句子在页面中的停留时间(ms)
            rearrangeDuration: 1000, // 单词切换间隔时间(ms)
            effect: 'random'         // 显示的动画效果：random, fadeIn, slideLeft, slideTop
        }

        txt.textualizer(card_text(),options);
        txt.textualizer('start');
    }
}
function onPrint()
{
    objid('textdiv').style.top = objid('textmask').offsetHeight;
    gPrText          = card_text();
    gOrgCardText       = card_text();
}

function onPrintAni()
{
    pushText = '';
    
    var reachEnd = 0;
    
    if(gPrText.length <1)
    {
        reachEnd = 1;
    }
    
    var cutlen = 0;

    if(gPrText.length >= 4 && gPrText.substring(0, 4) == '<br>')
    {
        gPrText  = gPrText .substring(4);
        pushText = '<br>';
        cutlen = 4;
    }
    else if(gPrText.substring(0, 2) == '/:')
    {
        result = ConvFaceOnBegin(gPrText );
        cutlen = result[1];
        if(cutlen > 0)
        {
            gPrText  = gPrText .substring(cutlen);
            pushText = result[0];
        }
    }
    
    if(cutlen == 0 && gPrText.length >= 1)
    {
        pushText   = gPrText.substring(0, 1);
        gPrText  = gPrText.substring(1);
    }

    objid('textdiv').innerHTML = objid('textdiv').innerHTML + pushText;
    if((objid('textdiv').offsetTop + objid('textdiv').offsetHeight)> objid('textmask').offsetHeight)
    {
        trans = objid('textmask').offsetHeight - objid('textdiv').offsetHeight;
        objid('textdiv').style.top = trans+ 'px';
    }

    if(reachEnd == 1)
    {
        if(getQueryStr('shuming') != '')
        {
            nameText = unescape(getQueryStr('shuming'));
            setTimeout("printName()", gSpeed);
        }
        else
        {
            setTimeout("pauseShow()",2000);
        }
        
    }
    else
    {
        var gSpeed = kawa_data.speed;
        setTimeout("onPrintAni()", gSpeed);
    }
}
function printName()
{
    var pushText = '';
    var reachEnd = 0;
    if(nameText.length<1)
    {
        setTimeout("pauseShow()",2000);
    }
    else
    {
        pushText = nameText.substring(0,1);
        nameText = nameText.substring(1,nameText.length);

        objid('namediv').innerHTML = objid('namediv').innerHTML + pushText;
        objid('namediv').style.top = objid('textmask').offsetHeight - objid('namediv').offsetHeight;


        if((objid('textdiv').offsetTop + objid('textdiv').offsetHeight + objid('namediv').offsetHeight)> objid('textmask').offsetHeight)
        {
            trans = objid('textmask').offsetHeight - objid('textdiv').offsetHeight - objid('namediv').offsetHeight;
            objid('textdiv').style.top = trans+ 'px';
        }
        setTimeout("printName()", kawa_data.speed);
    }

}
function pauseShow()
{
    reachEnd=0;
    trans = 0;
    objid('textdiv').style.top =objid('textmask').offsetHeight;
    gPrText              = gOrgCardText;
    objid('textdiv').innerHTML = "";
    if(getQueryStr('shuming')!='')
    {
        objid('namediv').innerHTML = '';
    }
    setTimeout("onPrintAni()",1000);
}
function show_textdiv()
{
        var box = kawa_data.text_box.split(' ');

        var mask = document.createElement('div');
        mask.id = 'textmask';
        mask.style.position = 'absolute';
        mask.style.left     = box[0] + 'px';
        mask.style.top      = box[1] + 'px';
        mask.style.width    = box[2] + 'px';
        mask.style.height   = box[3] + 'px';
        mask.style.overflow = 'hidden';

        var textdiv = document.createElement('div');
        textdiv.id = 'textdiv';
        textdiv.style.position = 'absolute';
        textdiv.style.color = kawa_data.text_color;
        textdiv.style.fontSize  = kawa_data.font_size;
        
        textdiv.style.lineHeight = kawa_data.line_height;
        textdiv.style.fontWeight = '600';       
        textdiv.style.fontFamily = 'Microsoft YaHei';

        textdiv.style.zIndex = 50000;

        if(_kv(kawa_data.text_align))
        {
            textdiv.style.textAlign = kawa_data.text_align;
        }

        if(_kv(kawa_data.font_weight))
        {
            textdiv.style.fontWeight = kawa_data.font_weight;
        }

        document.body.appendChild(mask);    
        mask.appendChild(textdiv);

        if(kawa_data.mode == 'left')
        {
            textdiv.style.float = 'left';
        }
        else if(getQueryStr('shuming') != '')
        {
            var namediv = document.createElement('div');
            namediv.id = 'namediv';
            namediv.style.position = 'absolute';
            namediv.style.color = kawa_data.text_color;
            namediv.style.fontSize  = kawa_data.font_size;
            namediv.style.float = 'center';
            namediv.style.right = '0px';
            
            namediv.style.lineHeight = kawa_data.line_height;
            namediv.style.fontWeight = '600';       
            namediv.style.fontFamily = 'Microsoft YaHei';

            namediv.style.zIndex = 50000;
            namediv.style.textAlign = 'center';

            if(_kv(kawa_data.font_weight))
            {
                namediv.style.fontWeight = kawa_data.font_weight;
            }

            mask.appendChild(namediv);
        }


        set_up_words();

        setTimeout("reset_text_height()", 500);

}

function create_textdiv()
{
    if(is_show_words())
    {
        show_textdiv();
    }
}

function set_up_words()
{
    if(_kv(kawa_data.font_family))
    {
        var text = pure_card_text();

        if(kawa_data.mode == 'up' || kawa_data.mode == 'static')
        {
            text = wrap_text(text);
        }
        if(kawa_data.mode == 'alldisplay')
        {
            text = wrap_text_cut(text);
            textdiv.style.height= textmask.style.height;
            textdiv.style.width= textmask.style.width;
        }
        var font_ip = 'aliyun7.kagirl.cn:8000';

        if(_kv(kawa_data.font_ip))
        {
            font_ip = kawa_data.font_ip;
        }

        var re_d = /^\d+/;
        var font_size = parseFloat(re_d.exec(kawa_data.font_size)[0]);
        var line_height = parseFloat(re_d.exec(kawa_data.line_height)[0]);
        var gap = line_height - font_size;

        var box = kawa_data.text_box.split(' ');

        var color = kawa_data.text_color.substring(1);
        if(getQueryStr('shuming') != '')
        {
            if(kawa_data.mode == 'left')
            {
                text = text + '一' + unescape(getQueryStr('shuming'));
            }
            else
            {
                var url2 = "http://" + font_ip + "/fontimg?words=" + encodeURIComponent(unescape(getQueryStr('shuming'))) + "&fontname=" + 
                kawa_data.font_family + "&fontsize=" + font_size + "&gap=" + gap + "&width=" + box[2] + 
                "&color=" + color;
                name_img = document.createElement('img');
                name_img.src = url2;
            }
        }
        var url = "http://" + font_ip + "/fontimg?words=" + encodeURIComponent(text) + "&fontname=" + 
                kawa_data.font_family + "&fontsize=" + font_size + "&gap=" + gap + "&width=" + box[2] + 
                "&color=" + color;
        font_img = document.createElement('img');
        font_img.src = url;
        imgLoad(font_img,on_font_img_load);
        setTimeout('on_check_font_img()', 1000);
    }
    else
    {
        textdiv = objid('textdiv');
        if (kawa_data.mode=='print')
            textdiv.innerHTML = '';
        else
            textdiv.innerHTML = card_text();
        if(getQueryStr('shuming') != '')
        {
            if(kawa_data.mode == 'left')
            {
                var words = textdiv.innerHTML;
                words = words.substring(0,words.length-7);
                words = words + '一' + unescape(getQueryStr('shuming')) + '</nobr>';
                textdiv.innerHTML = words ;
            }
            else
            {
                namediv = objid('namediv');
                if (kawa_data.mode=='print')
                    namediv.innerHTML = '';
                else
                    namediv.innerHTML = unescape(getQueryStr('shuming'));
            }
        }
        make_text_animation();
    }
}
function imgLoad(img, callback) {
            var timer = setInterval(function() {
                if (img.complete) {
                    callback(img)
                    clearInterval(timer)
                }
            }, 50)
        }
function on_font_img_load()
{
    if(!text_prepared)
    {
        text_prepared = true;
        var textdiv = objid('textdiv');
        textdiv.appendChild(font_img);
        var namediv = objid('namediv');
        if(namediv != null)
        {
            namediv.appendChild(name_img);
        }
        make_text_animation();
    }
}

function on_check_font_img()
{
    if(!text_prepared)
    {
        var textdiv = objid('textdiv');
        text_prepared = true;
        var fontSize = parseInt(textdiv.style.fontSize);
        var lineHeight = parseInt(textdiv.style.lineHeight);
        textdiv.style.fontSize = fontSize*2/3 + textdiv.style.fontSize.substring(textdiv.style.fontSize.length-2,textdiv.style.fontSize.length);
        textdiv.style.lineHeight = lineHeight*2/3 + textdiv.style.lineHeight.substring(textdiv.style.lineHeight.length-2,textdiv.style.lineHeight.length);
        textdiv.innerHTML = card_text();
        make_text_animation();
    }
}

function pure_card_text()
{
    text = kawa_data.words;

    if(kawa_data.replace_words != '#replace_words#')
    {
        text = kawa_data.replace_words;
    }

    return text;
}

function card_text()
{
    text = pure_card_text();

    if((kawa_data.mode == 'up')||(kawa_data.mode == 'print')||(kawa_data.mode =='alldisplay'))
    {
        text = wrap_text(text);
    }
    else if(kawa_data.mode == 'left')
    {
        text = '<nobr>' + text + '</nobr>';
    }
    else if(kawa_data.mode == 'ualizer')
    {
        text = text.split(/，|。|,|\.|\n|<br>|<br\/>|;|；|!|！|～|:|：|\?|？/g);
        if(text[text.length-1] == "")
        {
            text.pop();
        }
    }

    return text;
}

function wrap_text(in_text)
{
    text = in_text.replace(/,/g, ',<br>');
    text = text.replace(/，/g, '，<br>');
    text = text.replace(/\./g, '.<br>');
    text = text.replace(/。/g, '。<br>');
    text = text.replace(/;/g, ';<br>');
    text = text.replace(/；/g, '；<br>');
    text = text.replace(/!/g, '!<br>');
    text = text.replace(/！/g, '！<br>');
    text = text.replace(/～/g, '～<br>');
    text = text.replace(/：/g, '：<br>');
    text = text.replace(/:/g, ':<br>');    
    text = text.replace(/？/g, '：<br>');
    text = text.replace(/\?/g, ':<br>');
    return text;
}
function wrap_text_cut(in_text)
{
    var text = wrap_text(in_text);
    arr_word = new Array();
    arr_word=text.split('<br>');
    var row=0;
    hangshu=arr_word.length;
    console.log(hangshu);
    myarr=new Array();
    var box = kawa_data.text_box.split(' ');
    var bound = Math.floor(box[2]/parseInt(kawa_data.font_size));
    for(var i=0;i<hangshu;i++)
    {
        if(arr_word[i].length>bound)
        {
            for(var k=0;k<Math.ceil((arr_word[i].length)/bound);k++)
            {
                if(k==Math.floor(arr_word[i].length/bound))
                    myarr[row]=arr_word[i].substring(k*bound);
                else
                    myarr[row]=arr_word[i].substring(k*bound,(k+1)*bound);
                row++;
            }
        }
        else
        {
            myarr[row]=arr_word[i];
            row++;
        }
    }
    mywords="";
    mywords=myarr.join('<br>');
    return mywords;
}

var bplay = 0;              
function switchsound()
{
    au = music_player
    ai = objid('sound_image');
    if(au.paused)
    {
        bplay = 1;
        au.play();
        ai.src = "http://tu.kagirl.net/pic/music_note_big.png";		
		objid('sound_image').style.webkitAnimation = 'rotatemusic 4s infinite linear';
        pop_up_note_mode = true;
        objid("music_txt").innerHTML = "打开";
        objid("music_txt").style.visibility = "visible";
		
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
    else
    {
        bplay = 0;
        pop_up_note_mode = false;
        au.pause();
        ai.src = "http://tu.kagirl.net/pic/music_note_big.png";
        objid("music_txt").innerHTML = "关闭";
        objid("music_txt").style.visibility = "visible";
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
}

function play_music()
{
    if(typeof(kawa_data) != 'undefined')
    {
        music = kawa_data.music;

        if(kawa_data.replace_music != '#replace_music#')
        {
            music = kawa_data.replace_music;
        }

        music_player.src = music;
        music_player.loop = 'loop';
        music_player.play();
        bplay = 1;
    }
}

function create_music()
{
    play_music();

    sound_div = document.createElement("div");
    sound_div.setAttribute("ID", "cardsound");
    sound_div.style.cssText = "position:fixed;right:20px;top:25px;z-index:50000;visibility:visible;";
    sound_div.onclick = switchsound;
    bg_htm = "<img id='sound_image' src='http://tu.kagirl.net/pic/music_note_big.png'>";
    box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:0px;top:-80px'></div>";
    txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
    sound_div.innerHTML = bg_htm + box_htm + txt_htm;
    document.body.appendChild(sound_div);

	objid('sound_image').style.webkitAnimation = 'rotatemusic 4s infinite linear';
    //setTimeout("popup_note()", 100);
}   
function on_pop_note_end(event)
{
    note = event.target;
    
    if(note.parentNode == objid("note_box"))
    {
        objid("note_box").removeChild(note);
    }
}

// ---------------------------------------------------------------------
// weixin

function get_host()
{
    return location.host;
    /*
    if(location.href.indexOf('jielanhua') != -1)
    {
        return 'hg.jielanhua.cn';
    }
    if(location.href.indexOf('work.kagirl.net') != -1)
    {
        return 'work.kagirl.net';
    }

    return 'weika6.kagirl.net';
    */
}

function share_url()
{
    if(_v('use_share_url') == 'yes' && _kv(kawa_data.share_url))
    {
        return kawa_data.share_url;
    }

    url = 'http://' + get_host() + '/kawa2/show.php';
    url = url + '?cardid=' + kawa_data.cardid + '&fromshare=1';

    if(kawa_data.replace_words != '#replace_words#')
    {
        encoded_words = encodeURIComponent(pure_card_text());
        url = url + '&words=' + encoded_words;
    }

    url = url + '&cookie=' + Math.floor(Math.random() * 10000000);

    if(_v('replace_music_name') != '#replace_music_name#')
    {
        url = url + '&music=' + kawa_data.replace_music_name;
    }

    if(in_qq_browser)
    {
        url = url + '&channel=duimian';
    }
    else if(typeof(g_channel) != 'undefined' && g_channel != '')
    {
        url = url + '&channel=' + g_channel;
    }

    if(typeof(g_pubdate) != 'undefined' && g_pubdate != '')
    {
        url = url + '&pubdate=' + g_pubdate;
    } 

    return url;
}

function share_desc()
{
    var desc = '';

    if(_v('user_desc') != '')
    {
        desc = _v('user_desc');
    }
    else
    {
        desc = kawa_data.desc;

        if(kawa_data.replace_words != '#replace_words#')
        {
            desc = kawa_data.replace_words;
        }        
    }

    return desc;
}


function on_weixin_ready()
{
    play_music();  
}


function zk_build_card()
{
    url = 'show.php?cardid=' + kawa_data.cardid;

    var music = getQueryStr("music");
     
    if(music_sel != "")
    {
        url = url + '&music=' + music_sel;
    }
    else if(music != "")
    {
        url = url + '&music=' + music;   
    }
        
    if(objid('words').value == '')
    {
        alert('您还没有输入祝福语呢');
        return;
    }
        
    if(objid('shuming').value != '')
    {
        url = url + '&shuming=' + escape(objid('shuming').value);
    }
        
    var txt = wrap_input(objid('words').value);
    url = url + '&words=' + encodeURIComponent(txt);
        
    if(_v('openid') != '#openid#')
    {
        url = url + '&openid_u=' + _v('openid');
        url = url + '&headimgurl_u=' + _v('headimgurl');
        url = url + '&nickname_u=' + _v('nickname');
    }

    if(typeof(g_channel) != 'undefined' && g_channel != '')
    {
        url = url + '&channel=' + g_channel;
    }

    if(typeof(g_pubdate) != 'undefined' && g_pubdate != '')
    {
        url = url + '&pubdate=' + g_pubdate;
    }

    if(in_qq_browser)
    {
        url += '&modify=yes'
    }
    location.href = url;
}

function getQueryStr(str)
{   
   
    var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";   
}
function zk_buildmusic_card(index)
{
    music_player.src = mp3_list.url_header + mp3_list.mp3s[index].url;
    music_player.loop = 'loop';
    if(bplay==1)
    {
        music_player.play();
    }
    kawa_data.replace_music = mp3_list.url_header + mp3_list.mp3s[index].url;
    kawa_data.replace_music_name = mp3_list.mp3s[index].name;
    closeTBt();
    weixin_share();
}
var xmlHttp;
function GetXmlHttpObject()
{
    var xmlHttp=null;
    try
    {
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}
function wordStateChanged() 
{ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        var div = document.createElement('div');
        div.id = 'select_list';
        div.style.position = 'absolute';
        div.style.zIndex = '90005';
        div.style.backgroundColor = 'white';
        div.style.width = '89%';
        div.style.top = '155px';
        div.style.left = '5%';
        div.style.webkitBorderRadius = '5px';
        div.style.border = '2px ridge #E5E5E5';
        div.style.overflow = 'auto';
        div.style.display = 'none';

        var arr = xmlHttp.responseText.split('</option>');
        var html_body = '';
        for(var i=0;i<arr.length-1;i++)
        {
            var in1 = arr[i].indexOf('<option>');
            var word = arr[i].substring(in1+8,arr[i].length);
            html_body += '<div onclick="select_word(\''+ word +'\')" style="width:95%;font-size:18pt;line-height:25pt;margin:10px 0px 0px 10px;border-bottom:2px ridge #E5E5E5;">'+ word +'</div>';
        }
        html_body += '<div style="width:95%;height:40px;"></div>'

        div.innerHTML = html_body;
        objid('wind').appendChild(div);

    } 
}
function select_word(words)
{
    objid('list_words').innerHTML = words;
    objid('words').value = words;
    objid('select_list').style.display = 'none';
    objid('wind').style.height = win_height - 70;
}
function musicStateChanged() 
{ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        if(xmlHttp.responseText == "0")
        {
            alert("已经是最后一页了~");
            return ;
        }
        mp3_list = JSON.parse(xmlHttp.responseText); 
        setup_lines();
        if(objid('player') == null)
        {
            player = document.createElement('audio');
            player.id = 'player';
            player.loop = 'loop';
            document.body.appendChild(player);
        }
        objid('player').pause();
        music_page = music_page + 1;
    } 
}
var music_page = 1;        
var music_pageNum = 20;

function assert_qb()
{
    var channel = get_channel();

    if(channel == 'qbchannel' && !in_qq_browser)
    {
        alert('跳往QQ浏览器')
        return true;
    }

    return false;
}

function on_modifymusic_click()
{
    if(assert_qb())
    {
        return;
    }

    createTBt();                  

    objid('div_word').style.backgroundColor = '#FAFAFA';
    objid('div_music').style.backgroundColor = '#EAEAEA';
    objid('div_weika').style.backgroundColor = '#FAFAFA';

    var body_html = '';
    body_html += '<div style="position:relative; width:100%;background:rgb(100,86,86);height:70px;-webkit-border-radius:5px 5px 0px 0px;border-bottom:1px solid #89AF4C;">';
    body_html += '<div style="position:relative;float:left;color:white;font-size:18pt;height:70px;line-height:70px;left:6%;">点音乐名试听，确定后保存</div>';
    body_html += '<div  onclick="closeTBt()" style="position:relative;float:right;height:70px;line-height:70px;width:70px;color:white;font-size:40pt;">×</div></div>';

    body_html += '<div id="music-menu" style="position:relative;float:left;margin-top:-2px;width: 100%;height: 50px;line-height: 50px;background:-webkit-gradient(linear, 0% 50%, 100% 50%,from(rgb(93,81,65)), to(rgb(75,65,63)));">';
    body_html += '<div  id="music-type-0" style="color:white;position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(0)">流行</div>';
    body_html += '<div  id="music-type-1"  style="color:rgb(214,66,90);position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(1)">纯音乐</div>';
    body_html += '<div  id="music-type-2"  style="color:rgb(214,66,90);position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(2)">自然声</div>';
    body_html += '<div  id="music-type-3"  style="color:rgb(214,66,90);position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(3)">节日</div>';
    body_html += '<div  id="music-type-4"  style="color:rgb(214,66,90);position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(4)">生日</div>';
    body_html += '<div  id="music-type-5"  style="color:rgb(214,66,90);position:relative;float:left;padding-left: 20px;font-size:18pt;font-family:\'微软雅黑\';text-align:center;" onclick="musicTypeClick(5)">儿歌</div></div>';
    body_html += '<div style="width:100%;min-height:510px;background-color:white;"><div onscroll="mp3boxScroll()" style="-webkit-overflow-scrolling: touch;width:90%;position:relative;float:left;left:5%;height:' + (win_height -230) + ';overflow-y:scroll;background-color:color;" id="mp3box"></div></div>';

    //body_html += '<div onscroll="mp3boxScroll()" style="width:90%;position:relative;float:left;left:5%;height:' + (win_height -170) + ';overflow-y:scroll;background-color:color;" id="mp3box"></div>';
    body_html += '<div id="scroll_div" style="width:8px;-webkit-border-radius:3px;height:50px;position:relative;float:right;right:10px;background-color:rgb(199,199,199);"></div>';
    objid('wind').innerHTML=body_html;
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return;
    } 

    var url ="music.php?";
    url = url +'type=0';
    url =url+"&page=" + music_page;
    url =url+"&pageNum=" + music_pageNum;
    xmlHttp.onreadystatechange=musicStateChanged; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

var musicType = 0;
function musicTypeClick(type)
{
    musicType = type;
    var type_len = objid('music-menu').childNodes.length;
    for(var i=0;i<type_len;i++)
    {
        objid('music-type-' + i).style.color = 'rgb(214,66,90)';
    }
    objid('music-type-' + type).style.color = 'white';
    music_page = 1;
    var url="music.php?";
    url = url +'type=' + type;
    url = url+"&page=" + music_page;
    url = url+"&pageNum=" + music_pageNum;
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return;
    } 
    xmlHttp.onreadystatechange  = musicStateChanged; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
    objid('mp3box').innerHTML = '';
}

function mp3boxScroll()
{
    var y = objid('mp3box').offsetHeight * objid('mp3box').scrollTop/objid('mp3box').scrollHeight;
    objid('scroll_div').style.webkitTransform = 'translateY(' + y + 'px)';
    if(objid('mp3box').offsetHeight + objid('mp3box').scrollTop == objid('mp3box').scrollHeight)
    {
        more_music();
    }
}
function select_click()
{
    if(objid('select_list').style.display == 'none')
    {
        objid('select_list').style.display = 'block';
        objid('wind').style.height = parseInt(objid('select_list').style.top,10) + objid('select_list').offsetHeight;
    }
    else
    {
        objid('select_list').style.display = 'none';
        objid('wind').style.height = win_height - 70;
    }
}


function on_selectweika_click()
{
    var channel = get_channel();

    if(channel == 'qbchannel')
    {
        alert('跳往QQ浏览器')
        return;
    }

    //goto_kawa();
    
    if(/\bQQ\b/i.test(navigator.userAgent))
    {
        //location.href = 'http://article.mp.qq.com/index.php/preview/show?p=cd8c8cf61eb8c661b2163815a8f35a59&m=1442370092841159&i=0&t=c005e9f4d683429f35044a50ba3c4ab1&_wv=134217729&v=3&env=10003&mpu=33303236323133363530';
        location.href = "http://weika.kagirl.net/menu/menu_aiqing.html";
    }
    else
    {
        //location.href = 'http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MjM5MDg0OTE0Mw==#wechat_webview_type=1&wechat_redirect';
        location.href = "http://weika.kagirl.net/menu/menu_aiqing.html";
    }
    
    return;
}
var add=0;
function addMenu()
{
    if(add==0)
    {
        switchsound1();
        objid('add_jia').style.webkitTransform = 'rotate(92deg)';
        setTimeout('objid("shu1").style.display = "inline"',20);
        setTimeout('objid("shu1").style.webkitTransform = "translateY(52px)"',40);
        setTimeout('objid("music_div").style.display = "inline"',40);
        setTimeout('objid("music_div").style.webkitTransform = "translateY(102px)"',60);
        setTimeout('objid("shu2").style.display = "inline"',60);
        setTimeout('objid("shu2").style.webkitTransform = "translateY(50px)"',80);
        setTimeout('objid("word_div").style.display = "inline"',80);
        setTimeout('objid("word_div").style.webkitTransform = "translateY(100px)"',100);
        setTimeout('objid("shu3").style.display = "inline"',100);
        setTimeout('objid("shu3").style.webkitTransform = "translateY(50px)"',120);
        setTimeout('objid("weika_div").style.display = "inline"',120);
        setTimeout('objid("weika_div").style.webkitTransform = "translateY(100px)"',140);
        add = 1;
    }
    else
    {
        objid('add_jia').style.webkitTransform = 'rotate(-45deg)';
        setTimeout("objid('weika_div').style.webkitTransform = 'translateY(-100px)';objid('shu3').style.webkitTransform = 'translateY(-50px)';",20);
        setTimeout("objid('weika_div').style.display = 'none';objid('shu3').style.display = 'none';",40);
        setTimeout("objid('word_div').style.webkitTransform = 'translateY(-100px)';objid('shu2').style.webkitTransform = 'translateY(-50px)';",40);
        setTimeout("objid('word_div').style.display = 'none';objid('shu2').style.display = 'none';",60);
        setTimeout("objid('music_div').style.webkitTransform = 'translateY(-102px)';objid('shu1').style.webkitTransform = 'translateY(-52px)';",60);
        setTimeout("objid('music_div').style.display = 'none';objid('shu1').style.display = 'none';",80);
        add = 0;
    }
}
function switchsound1()
{
    au = music_player;
	bplay = 1;
	au.play();
	objid("sound_image3").style.display = 'none';
	objid('sound_image2').style.webkitAnimation = 'rotatemusic 5s infinite linear';
}
function switchsound2()
{
    au = music_player;
    if(au.paused)
    {
        bplay = 1;
        au.play();
        objid("sound_image3").style.display = 'none';
        objid('sound_image2').style.webkitAnimation = 'rotatemusic 5s infinite linear';
    }
    else
    {
        au.pause();
        objid("sound_image3").style.display = 'block';
        objid('sound_image2').style.webkitAnimation = '';
    }
}

mp3_list = new Array();

music_sel = '';



function get_music(music_name)
{
    for(i=0; i<mp3_list.mp3s.length; i++)
    {
        if(mp3_list.mp3s[i].name == music_name)
        {
            return i;
        }
    }

    return -1;
}


function setup_lines()
{
    for(i=0; i<mp3_list.mp3s.length; i++)
    {
        div = document.createElement('div');
        div.style.position = 'relative';
        div.style.height = '90px';
        div.style.width = '98%';
        div.style.borderBottom = '2px ridge #E5E5E5';


        var div_html = '';
        div_html += '<div  id="play_img_' + i + '" style="position:relative;float:left;top:30px;left:5px;width:40px;height:40px;-webkit-border-radius:50%;border:2px solid rgb(50,50,50);">';
        div_html +='<div style="position:absolute;float:left;left:14px;top:12px;width:12px;height:12px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
        div_html +='<div style="position:absolute;float:left;left:10px;top:8px;width:20px;height:20px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
        div_html +='<div style="position:absolute;float:left;left:5px;top:3px;width:30px;height:30px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
        div_html +='<div style="position:absolute;float:left;left:16px;top:16px;width:4px;height:4px;-webkit-border-radius:50%;border:2px solid rgb(50,50,50);"></div></div>';
        div_html += '<div onclick="select_mp3(' + i +')" style="position:relative;float:left;height:90px;left:5%;width:70%;line-height:90px;font-size:20pt;font-weight:bold;">' + mp3_list.mp3s[i].title +'</div>';
        div_html += '<div onclick="zk_buildmusic_card(' + i + ')" style="position:relative;float:right;right:2%;height:90px;width:60px;top:25px"><div id="ok_img_' + i + '" style="display:none;height:38px;line-height:38px;text-align:center;font-size:18pt;font-weight:bold;width:65px;background-color:rgb(255,102,0);color:white;-webkit-border-radius:7px 7px 7px 7px;">确定</div></div>';

        div.innerHTML = div_html;

        objid('mp3box').appendChild(div);
    }
    
    var div_more = document.createElement('div');
    div_more.id = 'more_music_div';
    div_more.style.position = 'relative';
    div_more.style.height = '90px';
    div_more.style.width = '98%';
    div_more.style.borderBottom = '2px ridge #E5E5E5';

    var div_html = '';
    div_html += '<span onclick="more_music()" id="more_music_span" style="display:block;height:70px;line-height:70px;margin-top:10px;width:80%;margin-left:10%;font-size:20pt;font-weight:bold;-webkit-border-radius:7px;text-align:center;background-color:rgb(255,102,0);color:white;">更多音乐</span>';
    div_more.innerHTML = div_html;
    objid('mp3box').appendChild(div_more);

}
function more_music()
{
    var url="music.php?";
    url=url+'type=' + musicType;
    url=url+"&page=" + music_page;
    url=url+"&pageNum=" + music_pageNum;
    if(objid('more_music_span'))
    {
        objid('more_music_span').innerHTML = '加载中...';
    }
    xmlHttp.onreadystatechange=more_music_callback; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}
function more_music_callback()
{
    
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        if(objid('more_music_div'))
            {
                objid('mp3box').removeChild(objid('more_music_div'));
            }
            if(xmlHttp.responseText == "0")
            {
                alert("已经是最后一页了~");
                return ;
            }
            mp3_list_more = JSON.parse(xmlHttp.responseText); 
            for(i=0; i<mp3_list_more.mp3s.length; i++)
            {
                div = document.createElement('div');
                div.style.position = 'relative';
                div.style.height = '90px';
                div.style.width = '98%';
                div.style.borderBottom = '2px ridge #E5E5E5';

                mp3_list.mp3s[i + (music_page-1)*music_pageNum] = {"name":mp3_list_more.mp3s[i].name,"title":mp3_list_more.mp3s[i].title,"url":mp3_list_more.mp3s[i].url};



            var div_html = '';
            div_html += '<div  id="play_img_' + (i + (music_page-1)*music_pageNum) + '" style="position:relative;float:left;top:30px;left:5px;width:40px;height:40px;-webkit-border-radius:50%;border:2px solid rgb(50,50,50);">';
            div_html +='<div style="position:absolute;float:left;left:14px;top:12px;width:12px;height:12px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
            div_html +='<div style="position:absolute;float:left;left:10px;top:8px;width:20px;height:20px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
            div_html +='<div style="position:absolute;float:left;left:5px;top:3px;width:30px;height:30px;-webkit-border-radius:50%;border-top:2px solid rgb(50,50,50);"></div>';
            div_html +='<div style="position:absolute;float:left;left:16px;top:16px;width:4px;height:4px;-webkit-border-radius:50%;border:2px solid rgb(50,50,50);"></div></div>';
            div_html += '<div onclick="select_mp3(' + (i + (music_page-1)*music_pageNum) +')" style="position:relative;float:left;height:90px;left:5%;width:70%;line-height:90px;font-size:20pt;font-weight:bold;">' + mp3_list_more.mp3s[i].title +'</div>';
            div_html += '<div onclick="zk_buildmusic_card(' + (i + (music_page-1)*music_pageNum) + ')" style="position:relative;float:right;right:2%;height:90px;width:60px;top:25px"><div id="ok_img_' + (i + (music_page-1)*music_pageNum) + '" style="display:none;height:38px;line-height:38px;text-align:center;font-size:18pt;font-weight:bold;width:65px;background-color:rgb(255,102,0);color:white;-webkit-border-radius:7px 7px 7px 7px;">确定</div></div>';

                div.innerHTML = div_html;

                objid('mp3box').appendChild(div);
            }
            
            if(mp3_list_more.mp3s.length >= music_pageNum)
            {
                var div_more = document.createElement('div');
                div_more.id = 'more_music_div';
                div_more.style.position = 'relative';
                div_more.style.height = '90px';
                div_more.style.width = '98%';
                div_more.style.borderBottom = '2px ridge #E5E5E5';

                var div_html = '';
                div_html += '<span id="more_music_span" onclick="more_music()" style="display:block;height:70px;line-height:70px;margin-top:10px;width:80%;margin-left:10%;font-size:20pt;font-weight:bold;-webkit-border-radius:7px;text-align:center;background-color:rgb(255,102,0);color:white;">更多音乐</span>';
                div_more.innerHTML = div_html;
                objid('mp3box').appendChild(div_more);

            }
            music_page = music_page + 1;
    }
}

function select_mp3(index)
{
    if(music_player != null)
    {
        music_player.pause();
        pop_up_note_mode = false;
    }
    
    for(var i=0; i<mp3_list.mp3s.length; i++)
    {
        objid('ok_img_' + i).style.display = 'none';
        objid('play_img_' + i).style.webkitAnimation = '';
    }
    objid('ok_img_' + index).style.display = 'block';
    objid('play_img_' + index).style.webkitAnimation = 'rotatemusic 2.5s infinite linear';

    if(objid('player').src == mp3_list.url_header + mp3_list.mp3s[index].url)
    {
        if(objid('player').paused)
        {
            objid('player').play();
            objid('play_img_' + index).style.webkitAnimation = 'rotatemusic 2.5s infinite linear';
        }
        else
        {
            objid('player').pause();
            objid('play_img_' + index).style.webkitAnimation = '';
        }
    }
    else
    {
        objid('player').src = mp3_list.url_header + mp3_list.mp3s[index].url;
        objid('player').play();
    }
    music_sel = mp3_list.mp3s[index].name;
}


if(/mqqbrowser\/(\S+)\s+mobile/i.test(navigator.userAgent))
{
    in_qq_browser = true;
}

