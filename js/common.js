// video 
var currentId = 0;
var videos = document.getElementsByTagName('video');
var video_0 = document.getElementById("video_0");
var video_1 = document.getElementById("video_1");
var video_2 = document.getElementById("video_2");
var video_3 = document.getElementById("video_3");

video_0.play(); 
$(document).ready(function($) {
    // 视频轮播
    $( '#videoBox' ).sliderPro({
        touchSwipe: false,
        fade: true,
        autoplay: false,
        loop: false,
        arrows: false,
        buttons: false,
        thumbnailsPosition: 'bottom',
        thumbnailPointer: true,
        thumbnailWidth: 240,
        thumbnailHeight: 110
    }); 

     // 打开声音
    $(".voice-off").on("click", function() {
        disableMute()
    })

     // 关闭声音
    $(".voice-on").on("click", function() {
        enableMute()
    })

    // 切换轮播
    $('.sp-thumbnails-container .sp-thumbnail').on("click",function(){
        currentId = Number($(this).attr('data-index'))
        $(".voice-off").hide();
        $(".voice-on").show();

        // 暂停除了当前播放
        for (var i = videos.length - 1; i >= 0; i--) {
            (function(){
                videos[i].muted=true;
                videos[currentId].muted=false;
                var p = i;
                videos[p].addEventListener('play',function(){
                    pauseAll(p);
                })
            })()
        }
        function pauseAll(index){
            for (var j = videos.length - 1; j >= 0; j--) {
                if (j!=index) videos[j].pause();
            }
        };

        if (currentId === 0) {
            video_0.play();
        } else if (currentId === 1) {
            video_1.play();
        } else if (currentId === 2) {
            video_2.play();
        } else if (currentId === 3) {
            video_3.play();
        }
    })  

    //首先将.toTop隐藏
    $(".toTop").hide();
    //当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
      $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
          $(".toTop").fadeIn(200);
        } else {
          $(".toTop").fadeOut(200);
        }
      });
  //当点击跳转链接后，回到页面顶部位置
    // $(".toTop, .logo").on("click", function() {
    //     window.location.href="/indx.html?page=1"
    // }); 

    // 下一页按钮
    $(".nextPage").on("click", function() {
        $("#navbar li").eq($(this).attr("data-id")).click();
    })

    if (!sessionStorage.getItem('navbar')) {
        $("#navbar").addClass("navbarActive");
        sessionStorage.setItem('navbar', 'navbarActive');
    } else {
        $("#navbar").removeClass("navbarActive");
    }
});

//关闭声音
function enableMute(){
    if (currentId === 0) {
        video_0.muted=true;
    } else if (currentId === 1) {
        video_1.muted=true;
    } else if (currentId === 2) {
        video_2.muted=true;
    } else if (currentId === 3) {
        video_3.muted=true;
    }
    $(".voice-on").hide();
    $(".voice-off").show();
}
//打开声音
function disableMute(){
    if (currentId === 0) {
        video_0.muted=false;
    } else if (currentId === 1) {
        video_1.muted=false;
    } else if (currentId === 2) {
        video_2.muted=false;
    } else if (currentId === 3) {
        video_3.muted=false;
    }
    $(".voice-off").hide();
    $(".voice-on").show();
}  

video_0.oncanplay = function(){
    // console.log("准备就绪"); 
};
//监听播放开始
video_0.addEventListener('play',function(){
    // console.log("开始播放");
    $(".loading, .overlay").hide();
});

//监听播放结束
video_0.addEventListener('pause',function(){
    console.log("播放暂停");
});
//客户端正在请求数据
video_0.addEventListener('loadedmetadata',function(){
    // $(".loading, .overlay").show();
});

//客户端正在请求数据
video_0.addEventListener('canplay',function(){
    // $(".loading, .overlay").show();
});

//当指定的音频/视频的元数据已加载时
video_0.addEventListener('progress',function(){
    // $(".loading, .overlay").show();
});

for (var i = 0; i <  videos.length; i++) {
     //监听播放结束
    videos[i].addEventListener('ended',function(){
        // console.log("播放结束");
       /* var nowVideoId = Number($(".sp-selected-thumbnail .sp-thumbnail").attr("data-index"));
        var nextId = 0;
        var totalVid = 3; // 总共几个视频
        $('#videoBox').sliderPro('nextSlide');
        nextId = Number(nowVideoId + 1);
        if (nowVideoId >= totalVid) {
            nowVideoId = 0;
            nextId = 0;
        }
        videos[nextId].play();*/
    });
}

     
//使用事件监听方式捕捉事件， 此事件可作为实时监测video 播放状态
video_0.addEventListener("timeupdate",function(){
    var timeDisplay;
    //用秒数来显示当前播放进度
    timeDisplay = Math.floor(video_0.currentTime);
    // console.log(Math.floor(video_0.currentTime))

    //当视频播放到 4s的时候做处理
    if(timeDisplay == 4){
            //处理代码
    }
},false);  
