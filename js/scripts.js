/**
 * 1. Search Popup
 * 2. Index Tiled
 * 3. Menu Mobile
 * 4. Project Detail
 * 5. Preload
 * 6. Fill GG Form
 */

'use strict';

(function ($) {

    $.fn.kellyMagnificPopup = function (opts) {

        var $self = $(this),
            options = $.extend({
                delegate: '.media',
                type: 'image',
                tLoading: '<div class="dots">\
							<div class="dot active"></div>\
							<div class="dot active"></div>\
							<div class="dot active"></div>\
							<div class="dot active"></div>\
						</div>',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 3] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                },
                closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
                callbacks: {
                    markupParse: function (item) { },
                    imageLoadComplete: function () {
                        var $container = $('.mfp-container');

                        $container.addClass('load-done');
                        setTimeout(function () {
                            $container.addClass('load-transition');
                        }, 50);
                    },
                    change: function () {
                        var $container = $('.mfp-container');
                        $container.removeClass('load-done load-transition');
                    }

                }
            }, $self.data(), opts);
        $('.media', $self).each(function () {
            var href = $(this).data('url');

            if (href && href !== '') {
                $(this).attr('href', href);
            }

        });
        $self.magnificPopup(options);
    };

    $(document).ready(function () {

        var $header = $('.header'),
            $search = $('.fa-search', $header);

        // 1. Search Popup
        if ($search.length) {
            var $boxSearch = $('.box-search', $header);

            $search.on('click', function (event) {
                event.preventDefault();
                $boxSearch.addClass('active');
                $('.search-field', $boxSearch).focus();
            });

            $('.kd-close', $boxSearch).on('click', function (event) {
                event.preventDefault();
                $boxSearch.removeClass('active');
            });

            $(document).on('keydown', function (event) {

                if (event.keyCode === 27) {

                    $boxSearch.removeClass('active');
                }
            });

        }

        // 2. Index Tiled
        var $tiled = $('.tiled-gallery');

        if ($tiled.length) {
            var ww = $(window).width(),
                margins = 6;

            if (ww <= 600) {
                margins = 0;
            }
            $tiled.justifiedGallery({
                rowHeight: 220,
                margins: margins,
                lastRow: 'justify',
                randomize: false
            });
        }

        // 3. Menu Mobile
        var $btnMenu = $('.menu-mobile'),
            $hideMenu = $('.hide-menu');

        $btnMenu.on('click', function () {
            $header.toggleClass('active');

            if ($header.hasClass('active')) {
                $hideMenu.addClass('active');
            } else {
                $hideMenu.removeClass('active');
            }
        });
        $hideMenu.on('click', function () {
            $header.removeClass('active');
            $hideMenu.removeClass('active');
        });

        $('.menu-item-has-children', '.main-menu').on('click', ' > a', function (e) {
            var ww = $(window).width();

            if (ww <= 991) {
                var $parent = $(e.target).closest('.menu-item-has-children');
                e.preventDefault();
                $('>.sub-menu', $parent).slideToggle(400);
            }
        });


        // 4. Project Details
        var $imageProject = $('.images-project');

        if ($imageProject.length) {
            $imageProject.kellyMagnificPopup({
                delegate: 'a'
            });
        }

        // 5. Preload

        var $preload = $('#preload');

        if ($preload.length) {
            $(window).on('load', function () {
                $preload.fadeOut(400);
            });
        }
    });

    // 6. Fill GG Form

    // Process contact form
    $('#contact-form').submit(function (event) {
        event.preventDefault();
        $('#feedback').html('');
        setTimeout(function () {
            // Get data
            var data = {
                'entry.2005620554': $('#form-name').val(),
                'entry.1045781291': $('#form-email').val(),
                'entry.839337160': $('#form-message').val()
            };

            // Validate form
            var formSuccess = true;
            Object.keys(data).forEach(function (key, index) {
                if (!data[key]) {
                    formSuccess = false;
                    $('#feedback').html('<label class="text-danger">Please complete all fields</label>');
                }
            });

            if (formSuccess) {
                // Send request
                $.ajax({
                    url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScOF3Q0pAZ4PwGva37az1S4j0ssAOSqs1VPUotmTKgxTc_W_Q/formResponse',
                    type: 'POST',
                    crossDomain: true,
                    dataType: "xml",
                    data: data,
                    success: function (jqXHR, textStatus, errorThrown) {
                        console.log('Enter on success');
                        $('#feedback').html('<label class="text-success">Message sent!</label>');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Enter on error');
                        $('#feedback').html('<label class="text-success">Message sent!</label>');
                    }
                });
            }
        }, 300);
    });

})(jQuery);