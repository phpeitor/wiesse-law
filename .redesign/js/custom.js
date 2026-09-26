jQuery(document).ready(function($) {
    "use strict"

    document.getElementById("current-year").textContent = new Date().getFullYear();

    // ------- Navigation ------- //
    if ($('ul.nav li.dropdown').length) {
        $('ul.nav li.dropdown').on('hover', function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    }
    // ------- Navigation End ------- //

    // ------- City Location ------- //
    $('.city-exp').on('click keydown', function(event) {
        if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        window.open('https://www.google.com/maps/search/?api=1&query=-6.783831,-79.84848', '_blank', 'noopener');
    });
    // ------- City Location End ------- //


    // ------- Home Slider Start ------- //
    if ($('#home-slider').length) {
        $('#home-slider').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            items: 1,
            autoplay: true,

        })
    }
    // ------- Home Slider End ------- //


    // ------- Home Slider Start ------- //
    if ($('#highlight-slider').length) {
        $('#highlight-slider').owlCarousel({
            loop: true,
            margin: 5,
			dots:false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    loop: false,
                },
                600: {
                    items: 2,
                    nav: true,
                    loop: false,
                },
                1000: {
                    items: 4,
                    nav: true,
                    loop: false
                }
            }
        })
    }
    // ------- Home Slider End ------- //


    // ------- Home Slider Start ------- //
    if ($('#highlight-slider-2').length) {
        $('#highlight-slider-2').owlCarousel({
            loop: true,
            margin: 0,
            dots: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    loop: false,
                },
                700: {
                    items: 2,
                    nav: true,
                    loop: false,
                },
                1000: {
                    items: 3,
                    nav: true,
                    loop: false
                }
            }
        })
    }
    // ------- Home Slider End ------- //



    // ------- Pretty Photo Start ------- //
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'normal',
        theme: 'light_square',
        slideshow: 3000,
        autoplay_slideshow: false,
        allow_expand: false,
        social_tools: false
    });
    // ------- Pretty Photo End ------- // 


   




    // ------- Event Slider Start ------- //
    if ($('.recent-event-slider').length) {
        $('.recent-event-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        });
        $('.recent-event-slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.recent-event-slider',
            dots: false,
            centerMode: false,
            focusOnSelect: true,
        });
    }
    // ------- Event Slider End ------- //	


    // ------- Home Slider Start ------- //
    if ($('#h3team-slider').length) {
        $('#h3team-slider').owlCarousel({
            loop: true,
            margin: 30,

            dots: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 2,
                    nav: true
                },
                1000: {
                    items: 2,
                    nav: true,
                    loop: false
                }
            }
        })
    }
    // ------- Home Slider End ------- //



    // ------- Close Btn ------- //
    if ($('#closebtn').length) {
        $('#closebtn').on('click', function() {
            $('#closetopbar').slideUp().empty();
        });

        $(function() {
            $('#closetopbar').slideDown();
        });
    }
    // ------- Close Btn ------- //

    var $legalVideoModal = $('#legal-video-modal');
    var $legalVideoFrame = $('#legal-video-frame');
    var $legalVideoRetry = $('.legal-video-retry');
    function loadLegalVideo() {
        var videoSrc = $legalVideoFrame.data('src');
        $legalVideoFrame.attr('src', videoSrc + (videoSrc.indexOf('?') > -1 ? '&' : '?') + 'retry=' + new Date().getTime());
    }
    if ($legalVideoModal.length && $legalVideoFrame.length) {
        $legalVideoModal.on('show.bs.modal', loadLegalVideo);
        $legalVideoModal.on('hidden.bs.modal', function() {
            $legalVideoFrame.attr('src', 'about:blank');
        });
        $legalVideoRetry.on('click', loadLegalVideo);
    }

    // Ensure Bootstrap modal cleanup is complete so the page is restored immediately
    var $volunteerModal = $('#volunteer-modal');
    var $volunteerTrigger = null;

    if ($volunteerModal.length) {
        var $volunteerForm = $('#volunteer-form');
        var $dniInput = $('#volunteer-dni');
        var $dniStatus = $('#volunteer-dni-status');
        var $birthDateInput = $('#volunteer-birth-date');

        function setBirthDateLimit() {
            var maximumBirthDate = new Date();
            maximumBirthDate.setFullYear(maximumBirthDate.getFullYear() - 16);
            var year = maximumBirthDate.getFullYear();
            var month = String(maximumBirthDate.getMonth() + 1).padStart(2, '0');
            var day = String(maximumBirthDate.getDate()).padStart(2, '0');
            $birthDateInput.attr('max', year + '-' + month + '-' + day);
        }

        setBirthDateLimit();

        function showVolunteerAlert(type, message) {
            if (window.alertify && typeof window.alertify[type] === 'function') {
                window.alertify[type](message);
            }
        }

        function markInvalidFields() {
            var isValid = true;

            $volunteerForm.find(':input[required]').each(function() {
                var $field = $(this);
                var fieldIsValid = this.checkValidity() && $.trim($field.val()) !== '';
                $field.toggleClass('is-invalid', !fieldIsValid);
                if (!fieldIsValid) {
                    isValid = false;
                }
            });

            return isValid;
        }

        $volunteerForm.on('input change', ':input', function() {
            var $field = $(this);
            if ($.trim($field.val()) !== '' && this.checkValidity()) {
                $field.removeClass('is-invalid');
            }
        });

        $volunteerForm.on('submit', function(event) {
            event.preventDefault();
            if (!markInvalidFields()) {
                showVolunteerAlert('error', 'Completa correctamente todos los campos obligatorios.');
                return;
            }

            var $submitButton = $volunteerForm.find('button[type="submit"]');
            var $formStatus = $('#volunteer-form-status');
            var formData = {};
            $volunteerForm.serializeArray().forEach(function(field) {
                formData[field.name] = field.value.trim();
            });

            $submitButton.prop('disabled', true);
            $formStatus.removeClass('is-error').text('Guardando solicitud...');

            fetch('./api/save-volunteer.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
                .then(function(response) {
                    return response.json().then(function(data) {
                        if (!response.ok) {
                            throw new Error(data.error || 'No se pudo guardar la solicitud');
                        }
                        return data;
                    });
                })
                .then(function(data) {
                    var successMessage = data.message || 'Solicitud guardada correctamente.';
                    showVolunteerAlert('success', successMessage);
                    $formStatus.text(successMessage);
                    $volunteerForm[0].reset();
                    $dniStatus.text('');
                    setTimeout(function() {
                        $volunteerModal.modal('hide');
                        $formStatus.text('');
                    }, 500);
                })
                .catch(function(error) {
                    showVolunteerAlert('error', error.message);
                    $formStatus.addClass('is-error').text(error.message);
                })
                .finally(function() {
                    $submitButton.prop('disabled', false);
                });
        });

        $dniInput.on('input blur', function() {
            var dni = this.value.replace(/\D/g, '').slice(0, 8);
            this.value = dni;
            $('#volunteer-first-name, #volunteer-last-name').val('').removeClass('is-invalid');

            if (dni.length !== 8) {
                $dniStatus.text('');
                return;
            }

            $dniStatus.text('Consultando datos...').css('color', '#555');
            fetch('./api/dni.php?dni=' + encodeURIComponent(dni))
                .then(function(response) {
                    return response.json().then(function(data) {
                        if (!response.ok) {
                            throw new Error(data.error || 'No se pudo validar el DNI');
                        }
                        return data;
                    });
                })
                .then(function(data) {
                    if (!data.nombres && !data.apellidos) {
                        throw new Error('Documento no encontrado');
                    }
                    $('#volunteer-first-name').val(data.nombres || '').removeClass('is-invalid');
                    $('#volunteer-last-name').val(data.apellidos || '').removeClass('is-invalid');
                    $dniStatus.text('Documento validado').css('color', '#238636');
                    $dniInput.removeClass('is-invalid');
                })
                .catch(function(error) {
                    showVolunteerAlert('error', error.message);
                    $dniStatus.text(error.message).css('color', '#d9363e');
                    $dniInput.addClass('is-invalid');
                });
        });

        $volunteerModal.on('show.bs.modal', function(event) {
            $volunteerTrigger = $(event.relatedTarget || document.activeElement);
            $volunteerModal.attr('aria-hidden', 'false');
            setTimeout(function() {
                $volunteerModal.find('input, textarea, button').first().focus();
            }, 0);
        });

        $volunteerModal.on('hidden.bs.modal', function() {
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('html, body').css('overflow', '');
            $volunteerModal.attr('aria-hidden', 'true');
            if ($volunteerTrigger && $volunteerTrigger.length) {
                $volunteerTrigger.blur();
            }
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
        });

        $volunteerModal.on('click', function(event) {
            if (event.target === this) {
                $volunteerModal.modal('hide');
            }
        });

        $(document).on('keydown', function(event) {
            if (event.key === 'Escape' && $volunteerModal.hasClass('in')) {
                $volunteerModal.modal('hide');
            }
        });
    }

    $(document).on('hidden.bs.modal', '.modal', function() {
        if (!$('#volunteer-modal').hasClass('in')) {
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('html, body').css('overflow', '');
        }
    });

    // ------- Events Counter ------- //
    if ($('#defaultCountdown').length) {
        var austDay = new Date();
        austDay = new Date(2021, 12, 0, 0);
        $('#defaultCountdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }


    // ------- Filter Gallery Start ------- //
    if ($('.filter-gallery').length) {
        if ($('.filter-gallery .isotope').length) {
            var $container = $('.filter-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on("resize", function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
        if ($('.filter-gallery #filters').length) {
            $('.filter-gallery #filters').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });
            });
            // change is-checked class on buttons
            $('.filter-gallery .button-group').each(function(i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'button', function() {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });

        }
    }

    // ------- Classic Gallery ------- //

    if ($('.classic-gallery').length) {
        if ($('.classic-gallery .isotope').length) {
            var $container = $('.classic-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on("resize", function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
    }


    // ------- Filter Gallery End ------- //




    // ------- Testimonials Page Slider Start ------- //
    if ($('#h3testimonials').length) {
        $('#h3testimonials').owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            autoHeight: true,
            autoplay: true,
            center: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                    loop: true,
                }
            }
        })
    }

    // ------- Testimonials 2nd Option ------- //

    if ($('#testimonials').length) {
        $('#testimonials').owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            autoHeight: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                    loop: true,
                }
            }
        })
    }
    // ------- Testimonials Page Slider End ------- //



    // ------- Counter Start ------- //
    if ($('.countdown').length) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('.countdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }
    // ------- Counter End ------- // 

    // ------- Search Overlay Start ------- //
    if ($('a[href="#search"]').length) {
        $(function() {
            $('a[href="#search"]').on('click', function(event) {
                event.preventDefault();
                $('#search').addClass('open');
                $('#search > form > input[type="search"]').focus();
            });
            $('#search, #search button.close').on('click keyup', function(event) {
                if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                }
            });
            $('form').submit(function(event) {
                event.preventDefault();
                return false;
            })
        });
    }

    // ------- Search Overlay End ------- //
	
	 if ($('#dismiss, .overlay').length) {
       $('#dismiss, .overlay').on('click', function () {
       $('#sidebar').removeClass('active');
       $('.overlay').removeClass('active');
       });

       $('#sidebarCollapse').on('click', function () {
       $('#sidebar').addClass('active');
       $('.overlay').addClass('active');
       $('.collapse.in').toggleClass('in');
       $('a[aria-expanded=true]').attr('aria-expanded', 'false');
       });
	 }

    // ------- Dynamic Weather Start ------- //
    function updateWeatherLabel() {
        var label = document.getElementById('weather');
        if (!label) return;

        var now = new Date();
        var currentDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        var currentHour = String(now.getHours()).padStart(2, '0');
        var currentTimeKey = currentDate + 'T' + currentHour + ':00';

        fetch('./api/weather.php')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Weather request failed');
                }
                return response.json();
            })
            .then(function (data) {
                var times = data && data.hourly && data.hourly.time ? data.hourly.time : [];
                var temperatures = data && data.hourly && data.hourly.temperature_2m ? data.hourly.temperature_2m : [];

                var index = times.indexOf(currentTimeKey);

                if (index === -1) {
                    var closestIndex = 0;
                    var closestDiff = Number.MAX_SAFE_INTEGER;

                    for (var i = 0; i < times.length; i++) {
                        var timeDiff = Math.abs(new Date(times[i]).getTime() - now.getTime());
                        if (timeDiff < closestDiff) {
                            closestDiff = timeDiff;
                            closestIndex = i;
                        }
                    }

                    index = closestIndex;
                }

                if (typeof temperatures[index] === 'number') {
                    var celsius = temperatures[index];
                    var fahrenheit = (celsius * 9 / 5) + 32;
                    label.textContent = celsius.toFixed(1) + '°C / ' + fahrenheit.toFixed(1) + '°F';
                } else {
                    label.textContent = 'Sin datos';
                }
            })
            .catch(function () {
                label.textContent = 'Sin datos';
            });
    }

    if ($('#weather').length) {
        updateWeatherLabel();
    }
    // ------- Dynamic Weather End ------- //


}); //End


 // ------- Site Sticky Footer Start ------- //
    if ($('#site-footer').length) {
        if ($('#site-footer').length) {
            siteFooter();
            $(window).on('resize', function() {
                siteFooter();
            });

            function siteFooter() {
                var siteContent = $('#site-footer');
                var siteContentHeight = siteContent.height();
                var siteContentWidth = siteContent.width();

                var siteFooter = $('#call-2-action');
                var siteFooterHeight = siteFooter.height();
                var siteFooterWidth = siteFooter.width();

                console.log('Content Height = ' + siteContentHeight + 'px');
                console.log('Content Width = ' + siteContentWidth + 'px');
                console.log('Footer Height = ' + siteFooterHeight + 'px');
                console.log('Footer Width = ' + siteFooterWidth + 'px');

                siteContent.css({
                    "margin-bottom": siteFooterHeight + 50
                });
            };
        }
    }
    // ------- Site Sticky Footer End ------- //
