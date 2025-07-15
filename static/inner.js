﻿adjustVideoBox();
$(".video").on("loadedmetadata", adjustVideoBox)
$(window).on("resize", adjustVideoBox)
function adjustVideoBox()
{
    var video = $(".video")
    if (video.length > 0)
    {
        var videoEl = $(".video")[0]
            , b = '1920'
            , c = '1080'
            , d = videoEl.parentNode.clientWidth
            , e = videoEl.parentNode.clientHeight;
        videoEl.playbackRate = 0.5;
        if (b && c && d && e)
        {
            if (b / c > d / e)
            {
                var f = e
                    , g = b / c * e;
                video.css("left", d / 2 - g / 2),
                    video.css("width", g),
                    video.css("height", f)
            } else
            {
                video.css("left", ""),
                    video.css("width", ""),
                    video.css("height", "")
            }
        }
    }
}

$(function ()
{
    //让【为什么选择】的第一个标签选中
    ToogleTabContent($('.WhyChooseYunLianPaaS .TabArea'), 'tabcontent1');

    var windowHeight = $(window).height(); //窗口高度
    var element;
    var ON_SCREEN_HEIGHT = 50;
    var ON_SCREEN_WIDTH = 50;
    var dataAnimateEl = $('[data-animate]');
    if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0)
    {
        dataAnimateEl.each(function ()
        {
            element = $(this);
            // 元素在可视区域，即刻开始动画
            animationStart(element);
        })
    }

    // 监听页面滚动，开始动画
    $(window).scroll(function (event)
    {
        var dataAnimateEl = $('[data-animate]');
        if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0)
        {
            dataAnimateEl.each(function ()
            {
                element = $(this);
                // 元素在可视区域，即刻开始动画
                animationStart(element);
            })
        };
        checkBanner();
        fixedNav();
        checkScroll();
        checkBanner();
        // checkVideo();
    });

    //banner动画
    checkBanner();

    function checkBanner()
    {
        var bannerContent = $(".banner-content");
        if (isOnScreen(bannerContent))
        {
            bannerContent.addClass("isview");
        } else
        {
            bannerContent.removeClass("isview");
        }
    };
    //播放按钮
    var is_1s = false
    $("body").on("click", "#play", function ()
    {
        $('.video_mask').css('display', 'block').find(".video").trigger('play');
        var video = $(".video-intro").get(0);
        if (is_1s)
        {
            video.playbackRate = 1;
        } else
        {
            video.playbackRate = 1;
        }
        $('.video_mask').css('display', 'block').find(".video").trigger('play');
        video.currentTime = 0;
    });
    //$(".video-intro").get(0).addEventListener('ended', function ()
    //{
    //    $("#play").show();
    //}, false);
    //播放视频

    // checkVideo()
    var initV = true;

    function checkVideo()
    {
        var inplayer = $(".player-bg");
        if (isOnScreen(inplayer))
        {
            if (initV)
            {
                var video = $(".video-intro").get(0);
                $("#play").click();
                initV = false;
            }
        } else
        {
            initV = true;
            $(".video-intro").get(0).pause();
        }
    };
    //视频切换按钮

    $(".player-tool").click(function ()
    {
        $(".player-tool_wrapper .active").removeClass("active");
        $(this).addClass("active");
        is_1s = $(this).data("rate") ? true : false;
        var src = $(this).attr("data-src");
        $(".video-intro").attr("src", src);
        $("#play").click();
    });
    //$(".video-intro").get(0).addEventListener('ended', function ()
    //{
    //    $('.video_mask').css('display', 'none').find(".video-intro").trigger('pause');
    //}, false);
    $(".video_mask").on("click", function ()
    {
        $('.video_mask').css('display', 'none').find(".video-intro").trigger('pause');
    })
    //开始动画
    function animationStart(element)
    {
        var annimationVal = element.data("animate");
        if (isOnScreen(element))
        {
            // setTimeout(function () {
            element.removeClass(annimationVal).addClass("animated").addClass(annimationVal)
            // },0)
        } else
        {
            element.removeClass("animated").removeClass(annimationVal)
        }
    }

    //函数作用：计算元素是否到达可视区域
    function viewingArea(element)
    {
        var objHeight = $(element).offset().top;　 //元素到顶部的高度
        var winPos = $(window).scrollTop(); //距离顶部滚动
        var val = objHeight - winPos;
        if (val < windowHeight && val > 0)
        {
            //可视区域
            return true;
        } else
        {
            //不可视区域
            return false;
        }
    };

    function isOnScreen(element)
    {
        try
        {
            element = element.get(0);
            var rect = element.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;
            var windowWidth = window.innerWidth || document.documentElement.clientWidth;

            var elementHeight = element.offsetHeight;
            var elementWidth = element.offsetWidth;
            var onScreenHeight = ON_SCREEN_HEIGHT > elementHeight ? elementHeight : ON_SCREEN_HEIGHT;
            var onScreenWidth = ON_SCREEN_WIDTH > elementWidth ? elementWidth : ON_SCREEN_WIDTH;
            // 元素在屏幕上方
            var elementBottomToWindowTop = rect.top + elementHeight;
            var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

            // 元素在屏幕下方
            var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
            var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

            // 元素在屏幕左侧
            var elementRightToWindowLeft = rect.left + elementWidth;
            var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

            // 元素在屏幕右侧
            var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
            var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

            return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
        }
        catch (e)
        {
            return true;
        }
    };
});

//评价
var swiper = new Swiper('.swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    // autoplay: true,
    slideToClickedSlide: true,
    on: {
        progress: function (progress)
        {
            for (i = 0; i < this.slides.length; i++)
            {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                modify = 1;
                if (Math.abs(slideProgress) > 1)
                {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                translate = slideProgress * modify * 25 + 'px';
                scale = 1 - Math.abs(slideProgress) / 10;
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scaleY(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3)
                {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function (transition)
        {
            for (var i = 0; i < this.slides.length; i++)
            {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }
        }
    }
})
//至下一页
$("#arrow").click(function ()
{
    animateToFuntion();
})

function fixedNav()
{
    var functionsEl = $("#functions");
    if (functionsEl.length > 0)
    {
        var top = functionsEl.offset().top;
        var scrollTop = $(window).scrollTop();
        var height = $(".header").height();
        if (scrollTop + height >= top)
        {
            $(".header-wrapper").addClass("fixed-header");
        } else
        {
            $(".header-wrapper").removeClass("fixed-header");
        }
    }
}

function animateToFuntion()
{
    var functionsEl = $("#functions");
    var top = functionsEl.offset().top;
    var height = $(".header").height();
    $('body,html').animate({scrollTop: top - height}, 500);
};

//置顶
$("#goTop").click(function ()
{
    $('body,html').animate({scrollTop: 0}, 500);
})

//检查侧边栏
function checkScroll()
{
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 70)
    {
        Element.AddClass($(".header-fixed-box"), "header-fixed-box-fixed");
    }
    else
    {
        Element.RemoveClass($(".header-fixed-box"), "header-fixed-box-fixed");
    }
};

function InitiateSystemRole()
{
    BlindEvent($(".SystemRole"),
        {
            "mouseover": function (sender)
            {
                var element = $(sender.currentTarget);
                var Container = $(element.parents(".SystemRoleList")[0]);
                Element.RemoveClass($(".SystemRoleFocus", Container), "SystemRoleFocus");
                Element.RemoveClass($(".SystemRole", Container), "animated");
                Element.RemoveClass($(".SystemRole", Container), "bounceIn");
                Element.AddClass(element, "SystemRoleFocus");
                element.removeClass("bounceIn").addClass("animated").addClass("bounceIn");
            }
        });
}

function InitiateScrollBox()
{
    $('#SuccessStoriesList').scrollbox({
        delay: 15,
        direction: 'h',
        distance: 280
    });

    $('#SuccessStoriesListBackward').click(function ()
    {
        $('#SuccessStoriesList').trigger('backward');
    });

    $('#SuccessStoriesListForward').click(function ()
    {
        $('#SuccessStoriesList').trigger('forward');
    });
}