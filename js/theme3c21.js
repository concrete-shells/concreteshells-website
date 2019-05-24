jQuery(document).ready(function() {
    "use strict";
    /**
     * Skip link focus fix
     */
    ( function() {
    	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
    	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
    	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
    		window.addEventListener( 'hashchange', function() {
    			var element = document.getElementById( location.hash.substring( 1 ) );

    			if ( element ) {
    				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
    					element.tabIndex = -1;

    				element.focus();
    			}
    		}, false );
    	}
    })();

    /**
     * Responsive Videos
     */
    ( function() {
    	jQuery('.site-content').fitVids();
    })();

    /**
     * Initialise Menu Toggle
     */
    ( function() {
        var header_h = jQuery('.site-header').height();
        var header_widget_h = jQuery('.header-widget').height();

        jQuery('.wpc-menu li.menu-item-has-children').each( function() {
            jQuery(this).prepend('<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>');
        });

        jQuery('#nav-toggle').click(
            function () {

                jQuery('.main-navigation .wpc-menu').toggleClass("wpc-menu-mobile");
                jQuery('.header-widget').toggleClass("header-widget-mobile");
                jQuery('.header-widget-mobile').css('top', header_h);
                jQuery('.wpc-menu-mobile').css('top', header_h + header_widget_h + 20);
            }
        );
        jQuery('.nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow').click(
            function () {
                jQuery(this).parent().toggleClass("nav-toggle-dropdown");
            }
        );

    } )();

    /**
     * Initialise transparent header
     */
    ( function() {

        var site_header_h = jQuery('.site-header').height();
        var logo_h = jQuery('.site-branding img').height();
        var nav_h = jQuery('.wpc-menu').height() - 30;
        var page_header = jQuery('.page-header-wrap');
        var page_header_pt = parseInt(page_header.css('padding-top'), 10);
        //alert(page_header_pt);
        //alert(nav_h);

        // Vertical Align Logo
        //jQuery('.site-branding').css('padding-top', (site_header_h - logo_h) / 2 + 'px');

        // Single Page transparent header.
        if ( jQuery('body').hasClass('header-transparent') && page_header.length ) {
            page_header.css('padding-top', page_header_pt + site_header_h + 'px');
        }

    })();

    /**
     * Parallax Section
     */
    ( function() {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        var testMobile = isMobile.any();

        jQuery('.wpc_row_parallax').each(function() {
    		var $this = jQuery(this);
    		var bg    = $this.find('.wpc_parallax_bg');

            jQuery(bg).css('backgroundImage', 'url(' + $this.data('bg') + ')');

            if (testMobile == null) {
                jQuery(bg).addClass('not-mobile');
                jQuery(bg).removeClass('is-mobile');
                jQuery(bg).parallax('50%', 0.4);
            }
            else {
                //jQuery(bg).css('backgroundAttachment', 'inherit');
                jQuery(bg).removeClass('not-mobile');
                jQuery(bg).addClass('is-mobile');

            }

        });

    })();

    /**
     * Call magnificPopup when use
     */
    ( function() {

        // WordPress gallery lightbox
        jQuery('.gallery-lightbox').magnificPopup({
            delegate: '.gallery-item a',
            type:'image',
            gallery:{
                enabled:true
            },
            zoom: {
                enabled:true
            }
        });

        jQuery('.popup-video').magnificPopup({
            //disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            zoom: {
                enabled:true
            }
        });

    })();

    /**
     * Fix slider padding issue.
     */
    ( function() {
        jQuery('.rev_slider_wrapper').parents('.vc_row').find('.vc_col-sm-12').css({"padding-left": "0px","padding-right": "0px"});
    })();

    /**
     * Back To Top
     */
    ( function() {
        jQuery('#btt').fadeOut();
        jQuery(window).scroll(function() {
            if(jQuery(this).scrollTop() != 0) {
                jQuery('#btt').fadeIn();
            } else {
                jQuery('#btt').fadeOut();
            }
        });

        jQuery('#btt').click(function() {
            jQuery('body,html').animate({scrollTop:0},800);
        });
    })();

    /**
     * Fixed Header + Navigation.
     */
    ( function() {

        if ( header_fixed_setting.fixed_header == '1' ) {
            var header_fixed = jQuery('.fixed-on');
            var p_to_top     = header_fixed.position().top;


            jQuery(window).scroll(function(){
                if(jQuery(document).scrollTop() > p_to_top) {
                    header_fixed.addClass('header-fixed');
                    header_fixed.stop().animate({},300);
                    if ( jQuery("body").hasClass('header-transparent') ) {
                        // No Thing
                    } else {
                        jQuery('.site-content').css('padding-top', header_fixed.height());
                    }

                } else {
                    header_fixed.removeClass('header-fixed');
                    header_fixed.stop().animate({},300);
                    if (jQuery("body").hasClass('header-transparent') ) {
                        // No Thing
                    } else {
                        jQuery('.site-content').css('padding-top', '0');
                    }
                }
            });
        }

    })();

});
