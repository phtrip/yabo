/*
 * fullpage.js
 * by ray   
 * 2016-9-11
 */
var flag = true;
(function($){
    $.fn.fullpage = function(options){
        $.fn.fullpage.defaults = {
            speed: 500,            //窗口滚动速度
            menuCell: null,
            mainCell: '.page',
            className:"active",
            defaultIndex: 0,
            startFn: null,          //滚动前调用方法
            endFn: null             //滚动后调用方法
        };

        var opts = $.extend({}, $.fn.fullpage.defaults, options);
        var self = $(this);
        var menu = $(opts.menuCell);        //导航元素对象集合
        var page = $(opts.mainCell, self);  //页面对象集合
        var pageSize = page.size();         //页面的数量
        var pageHeight = $(window).height();//页面的高度

        var mouseS = {
            index: opts.defaultIndex,       //页面索引
            isScroll: false,                //窗口滚动状态

            //初始化
            init: function(){
                var t = this; 

                t.rW();
                $(window).resize(function(){
                    t.rW();
                });                
                t.active(t.index);                

                t.mS(); //滚轮事件
                t.nC(); //导航点击
                t.kD(); //键盘切换
            },
            //自适应屏幕
            rW: function(){  
                pageHeight = $(window).height();
                page.height(pageHeight);    //重置页面高度
                page.removeClass('h735 h835');
                if(pageHeight < 835){
                    page.eq(0).addClass('h835');
                }
                if(pageHeight < 735){
                    page.addClass('h735');
                }
                $('html, body').animate({scrollTop: this.index * pageHeight}, 1);   //重置滚动条高度
            },
            //处理滚轮事件
            mS: function(){
                var t = this;
                $(document).on("mousewheel DOMMouseScroll", function(e) {
                    if(flag) {
                        flag = false
                        e.preventDefault(); // 阻止默认滚轮事件(如果存在这样的事件)
                        var v = e.originalEvent.wheelDelta || -e.originalEvent.detail;  //得到的值为120(向上)和-120(向下)
                        var i = v > 0 ? t.index-1 : t.index+1;
                        t.hS(i); //实现滚动效果
                       setTimeout(function(){
                            flag = true
                       }, 1500)
                    }
                });
            },
            //实现窗口滚动效果
            hS: function(i){
                var t = this;
                i = i < 0 ? i = 0 : i;
                i = i > pageSize ? i-1 : i;

                if (i !== t.index && !t.isScroll){
                    t.isScroll = true;
                    if( typeof opts.startFn === 'function'){
                        opts.startFn(i);
                    }
                    $('html, body').animate({scrollTop: i * pageHeight}, opts.speed, function(){
                        if(t.isScroll){
                            if( typeof opts.endFn === 'function'){
                                opts.endFn(i);
                            }
                            
                            t.index = i;
                            t.isScroll = false; //滚动结束
                        }
                    });
                    t.active(i);
                }
            },
            active: function(i){
                page.eq(i).addClass(opts.className).siblings().removeClass(opts.className); //当前页面添加className
                menu.eq(i).addClass(opts.className).siblings().removeClass(opts.className); //导航高亮
            },
            //导航点击定位
            nC:function(){  
                var t = this;
                menu.click(function(){
                    var i = $(this).index();                    
                    t.hS(i);
                });
            },
            //键盘控制
            kD: function(){
                var t = this; 
                $(document).keydown(function(event){
                    var k = event.keyCode; 
                    var i = t.index;
                    if(k === 38){
                        i--;
                    }
                    if(k === 40){
                        i++;
                    }
                    t.hS(i);
                });
            } 
        };
        mouseS.init();
    }
})(jQuery)
    
function GetQueryValue(queryName) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) { return pair[1]; }
    }
    return null;
}   

$(function(){
    var nav = $('#navbar'); 
    var topNav = $('.topbar'); 
    var page = $('#pages');
    var currentVideoId = 0;
    var pageNum = 1;
    var currentPage = 0;

    page.fullpage({
        menuCell: '#navbar li, .topbar li',
        mainCell: '.page',
        speed: 600,
        startFn: function(index){
            currentVideoId = $(".sp-selected-thumbnail .sp-thumbnail").attr("data-index");
            if (currentVideoId) {
                if (index === 0) {
                    videos[currentVideoId].muted = false;
                    $(".voice-off").hide();
                    $(".voice-on").show();
                } else {
                    videos[currentVideoId].muted = true;
                    $(".voice-off").show();
                    $(".voice-on").hide();
                }
                // $(".voice-on").hide();
                // $(".voice-off").show();
                for (var j = videos.length - 1; j >= 0; j--) {
                    if (j!=index) {
                        videos[j].pause();
                    } else {
                        videos[currentVideoId].play();
                    }
                }
            }
            pageNum = index + 1
            history.pushState({page: pageNum}, 'title 1', '?page='+pageNum);

            nav.find('li').eq(index).addClass('active').siblings('li').removeClass('active');
            index>4 ? nav.fadeOut() : nav.fadeIn();
            page.find('.page').removeClass('page-leave');
            page.find('.page').eq(index-1).addClass('page-leave');
            
        }
    })

    if(!GetQueryValue('page')) {
        history.pushState({page: pageNum}, 'title 1', '?page='+pageNum);
    } else {
        currentPage = GetQueryValue('page');
        nav.find('li').eq(currentPage-1).trigger("click");
    }

})
