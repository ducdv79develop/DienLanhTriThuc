(function ($) {
    $(document).ready(function () {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $("#partner-widget-2-carousel").owlCarousel({
            loop: true,
            dots: false,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 3000,
            responsiveClass: true,
            nav: true,
            //responsiveClass:true,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                1000: {
                    items: 8
                }
            }

        });


        $('.header-search .icon-search').click(function () {
            $('.icon-search').toggleClass('icon-close');
            $('.header-search').toggleClass('show');
        });

        $('#searchsubmit').click(function () {
            if ($('#smobile').val() == '') {
                alert('Vui lòng nhập từ khóa');
                return false;
            } else return true;
        });

        $("#back-to-top").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });

        //Clone canvas menu
        var mobilemenu = $("#menu-header-menu").clone();
        mobilemenu.prop('id', 'mobile-menu');
        mobilemenu.prop('class', 'nav nav-pills nav-stacked');
        mobilemenu.appendTo("#mobile-menu-wrap .module-ct");
        $("#mobile-menu li").removeAttr("id");
        //$( "#mobile-menu li" ).removeAttr( "class",'col-lg-4' );
        $("#mobile-menu .sf-mega.links").prop('class', 'mega-menu');
        $("#mobile-menu li i").remove();


        var scrollLastPos = 0,
            scrollDir = 0, // -1: up, 1: down
            scrollTimeout = 0;
        $(window).on('scroll', function (e) {
            var st = $(this).scrollTop();
            //Determines up-or-down scrolling
            if (st < 1) {
                if (scrollDir != 0) {
                    scrollDir = 0;
                    scrollToggle();
                }
            } else if (st > scrollLastPos) {
                //Replace this with your function call for downward-scrolling
                if (scrollDir != 1) {
                    scrollDir = 1;
                    scrollToggle();
                }
            } else if (st < scrollLastPos) {
                //Replace this with your function call for upward-scrolling
                if (scrollDir != -1) {
                    scrollDir = -1;
                    scrollToggle();
                }
            }
            //Updates scroll position
            scrollLastPos = st;
        });

        $('.ja-header').on('hover', function () {
            $('html').removeClass('scrollDown scrollUp').addClass('hover');
            scrollDir = 0;
        })

        scrollToggle = function () {
            $('html').removeClass('hover');
            if (scrollDir == 1) {
                $('html').addClass('scrollDown').removeClass('scrollUp');
            } else if (scrollDir == -1) {
                $('html').addClass('scrollUp').removeClass('scrollDown');
            } else {
                $('html').removeClass('scrollUp scrollDown');
            }
            $('html').addClass('animating');
            setTimeout(function () {
                $('html').removeClass('animating');
            }, 1000);
        }

        /*-----------------------------------------------------------------------------------*/
        /*	Tabber
        /*-----------------------------------------------------------------------------------*/

        // UL = .tabs
        // Tab contents = .inside

        var tag_cloud_class = '#tag-cloud';

        //Fix for tag clouds - unexpected height before .hide()
        var tag_cloud_height = jQuery('#tag-cloud').height();

        jQuery('.inside ul li:last-child').css('border-bottom', '0px') // remove last border-bottom from list in tab conten
        jQuery('.tabs').each(function () {
            jQuery(this).children('li').children('a:first').addClass('selected'); // Add .selected class to first tab on load
        });
        jQuery('.inside > *').hide();
        jQuery('.inside > *:first-child').show();


        jQuery('.tabs li a').click(function (evt) { // Init Click funtion on Tabs

            var clicked_tab_ref = jQuery(this).attr('href'); // Strore Href value

            jQuery(this).parent().parent().children('li').children('a').removeClass('selected'); //Remove selected from all tabs
            jQuery(this).addClass('selected');
            jQuery(this).parent().parent().parent().children('.inside').children('*').hide();

            /*
            if(clicked_tab_ref === tag_cloud_class) // Initiate tab fix (+20 for padding fix)
            {
                clicked_tab_ref_height = tag_cloud_height + 20;
            }
            else // Other height calculations
            {
                clicked_tab_ref_height = jQuery('.inside ' + clicked_tab_ref).height();
            }
            */
            //jQuery('.inside').stop().animate({
            //    height: clicked_tab_ref_height
            // },400,"linear",function(){
            //Callback after new tab content's height animation
            jQuery('.inside ' + clicked_tab_ref).fadeIn(500);
            // })

            evt.preventDefault();

        })

        var height_mainbody = $("#main-body").height();
        var height_right = $("#sidebar-right").height() + 150;
        if (height_mainbody > height_right) {
            $('#sidebar-right').css("height", height_mainbody);
        } else {
            $('#sidebar-right').css("height", height_right);
        }

        $('#feedback-reset').on('click', function () {
            $('.text-danger').empty();
        })
    });
})(jQuery);