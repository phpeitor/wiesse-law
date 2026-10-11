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

    // ------- Calendify URL from server environment ------- //
    var calendifyLinks = document.querySelectorAll('[data-calendify-link]');
    var whatsappLinks = document.querySelectorAll('[data-config-whatsapp]');
    var phoneLabels = document.querySelectorAll('[data-config-phone]');
    if (calendifyLinks.length || whatsappLinks.length || phoneLabels.length) {
        fetch('./api/config.php')
            .then(function(response) {
                if (!response.ok) throw new Error('No se pudo cargar la configuración de Calendify');
                return response.json();
            })
            .then(function(config) {
                if (!config.calendifyUrl) throw new Error('CALENDIFY_URL no está configurada');
                calendifyLinks.forEach(function(link) {
                    link.href = config.calendifyUrl;
                });
                whatsappLinks.forEach(function(link) {
                    link.href = config.whatsapp;
                });
                phoneLabels.forEach(function(label) {
                    label.textContent = config.phone;
                });
            })
            .catch(function(error) {
                console.error(error.message);
                Array.prototype.slice.call(calendifyLinks).concat(Array.prototype.slice.call(whatsappLinks)).forEach(function(link) {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                    });
                });
            });
    }
    // ------- Calendify URL End ------- //

    // ------- Contact and newsletter forms ------- //
    document.querySelectorAll('.js-lead-form').forEach(function(form) {
        var feedback = form.querySelector('.form-feedback');

        function setFieldValidity(field) {
            var valid = field.checkValidity() && field.value.trim() !== '';
            field.classList.toggle('is-invalid', !valid);
            if (valid) {
                field.removeAttribute('aria-invalid');
            } else {
                field.setAttribute('aria-invalid', 'true');
            }
            return valid;
        }

        form.addEventListener('input', function(event) {
            if (event.target.matches('input, textarea')) {
                setFieldValidity(event.target);
                if (feedback) feedback.textContent = '';
                if (feedback) feedback.className = 'form-feedback';
            }
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var fields = Array.prototype.slice.call(form.querySelectorAll('input[required], textarea[required]'));
            var invalidFields = fields.filter(function(field) {
                return !setFieldValidity(field);
            });

            if (invalidFields.length) {
                invalidFields[0].focus();
                if (feedback) {
                    feedback.textContent = 'Revisa los campos marcados en rojo.';
                    feedback.className = 'form-feedback is-error';
                }
                return;
            }

            var submitButton = form.querySelector('[type="submit"]');
            var payload = Object.fromEntries(new FormData(form).entries());
            payload.type = form.dataset.formType;
            if (submitButton) submitButton.disabled = true;
            if (feedback) {
                feedback.textContent = 'Enviando…';
                feedback.className = 'form-feedback';
            }

            fetch('./api/save-form.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(function(response) {
                    return response.json().then(function(data) {
                        if (!response.ok) throw new Error(data.error || 'No se pudo guardar el formulario.');
                        return data;
                    });
                })
                .then(function(data) {
                    form.reset();
                    fields.forEach(function(field) {
                        field.classList.remove('is-invalid');
                        field.removeAttribute('aria-invalid');
                    });
                    if (feedback) {
                        feedback.textContent = data.message || 'Información enviada correctamente.';
                        feedback.className = 'form-feedback is-success';
                    }
                })
                .catch(function(error) {
                    if (feedback) {
                        feedback.textContent = error.message || 'Ocurrió un error al enviar el formulario.';
                        feedback.className = 'form-feedback is-error';
                    }
                })
                .finally(function() {
                    if (submitButton) submitButton.disabled = false;
                });
        });
    });
    // ------- Contact and newsletter forms End ------- //

    // ------- Active navigation item ------- //
    var $siteNav = $('.h3-navbar .navbar-nav');
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var currentHash = window.location.hash;

    function setActiveNavigation() {
        var activeHash = window.location.hash;
        $siteNav.children('li').removeClass('active');
        $siteNav.children('li').each(function() {
            var $link = $(this).children('a').first();
            var href = $link.attr('href') || '';
            // El enlace # del desplegable apunta a la página actual, pero no representa una sección activa.
            if (href === '#' || href.indexOf('javascript:') === 0) return;
            var linkUrl;
            try {
                linkUrl = new URL(href, window.location.href);
            } catch (error) {
                return;
            }
            if (linkUrl.origin === window.location.origin &&
                linkUrl.pathname === window.location.pathname &&
                ((activeHash && linkUrl.hash === activeHash) || (!activeHash && !linkUrl.hash))) {
                $(this).addClass('active');
            }
        });
        if (currentPage === 'contacto.html' && !activeHash) {
            $siteNav.children('li').filter(function() {
                return $(this).children('a').attr('href') === 'contacto.html';
            }).addClass('active');
        }
    }

    setActiveNavigation();
    $(window).on('hashchange', setActiveNavigation);
    // Enlaces a secciones desde otra página también actualizan la selección.
    $siteNav.on('click', 'a', function() {
        var href = $(this).attr('href') || '';
        if (href.indexOf('#') !== -1) {
            var hash = href.substring(href.indexOf('#'));
            if (window.location.pathname.endsWith(currentPage)) {
                setTimeout(function() {
                    $siteNav.children('li').removeClass('active');
                    $(this).closest('li').addClass('active');
                }.bind(this), 0);
            }
        }
    });
    // ------- Active navigation item End ------- //

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
    var $legalVideoPlayer = $('#legal-video-player');
    var $legalVideoRetry = $('.legal-video-retry');
    function replayLegalVideo() {
        if (!$legalVideoPlayer.length) return;
        $legalVideoPlayer[0].currentTime = 0;
        var playback = $legalVideoPlayer[0].play();
        if (playback && typeof playback.catch === 'function') playback.catch(function() {});
    }
    if ($legalVideoModal.length && $legalVideoPlayer.length) {
        $legalVideoModal.on('shown.bs.modal', function() {
            var playback = $legalVideoPlayer[0].play();
            if (playback && typeof playback.catch === 'function') playback.catch(function() {});
        });
        $legalVideoModal.on('hidden.bs.modal', function() {
            $legalVideoPlayer[0].pause();
            $legalVideoPlayer[0].currentTime = 0;
        });
        $legalVideoRetry.on('click', replayLegalVideo);
    }

    // ------- Service detail modal ------- //
    var $serviceModal = $('#servicio-detalle');
    var $serviceData = $('#servicio-datos');
    var $serviceBody = $('#servicio-detalle-body');
    var $serviceTitle = $('#servicio-detalle-title');

    if ($serviceModal.length && $serviceData.length) {
        $serviceModal.on('show.bs.modal', function(event) {
            var $trigger = event.relatedTarget ? $(event.relatedTarget) : $();
            var serviceKey = $trigger.attr('data-servicio') || '';
            var $serviceBlock = $serviceData.find('[data-servicio="' + serviceKey + '"]');
            var $card = $trigger.closest('.deprt-icon-box');
            var cardTitle = ($card.find('h6 a').text() || '').trim();
            var cardIcon = ($serviceBlock.attr('data-modal-image') || $card.find('img').attr('src'));
            var cardDetailHtml = $serviceBlock.length ? $serviceBlock.html() : '';

            $serviceTitle.text(cardTitle || 'Servicio');
            $serviceBody.empty();

            if (cardIcon) {
                var isServicePhoto = !!$serviceBlock.attr('data-modal-image');
                $serviceBody.append($('<img>', {
                    'class': 'servicio-detalle-icon' + (isServicePhoto ? ' servicio-detalle-photo' : ''),
                    src: cardIcon,
                    alt: isServicePhoto ? 'Asesoría en propiedad intelectual' : ''
                }));
            }
            if (cardDetailHtml && cardDetailHtml.trim()) {
                $serviceBody.append(cardDetailHtml);
            }
        });
    }

    // Some plugins (Revolution Slider) cache the viewport width while Bootstrap
    // hides the scrollbar with a modal open. Re-announce the size once closed.
    $(document).on('hidden.bs.modal', function() {
        window.dispatchEvent(new Event('resize'));
    });

    // ------- Mission / Vision word reveal ------- //
    var $revealTexts = $('.news-details blockquote > p');
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ($revealTexts.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
        try {
            $revealTexts.each(function() {
                splitWordsIntoSpans(this);
                this.classList.add('rw-pending');
            });

            var revealObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.remove('rw-pending');
                    entry.target.classList.add('rw-in');
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.3 });

            $revealTexts.each(function() {
                revealObserver.observe(this);
            });
        } catch (error) {
            $revealTexts.each(function() {
                this.classList.remove('rw-pending');
            });
        }
    }

    function splitWordsIntoSpans(element) {
        Array.prototype.slice.call(element.childNodes).forEach(function(node) {
            if (node.nodeType === 3) {
                if (!node.nodeValue.trim()) return;
                var fragment = document.createDocumentFragment();
                node.nodeValue.split(/(\s+)/).forEach(function(part) {
                    if (!part) return;
                    if (/^\s+$/.test(part)) {
                        fragment.appendChild(document.createTextNode(part));
                        return;
                    }
                    var word = document.createElement('span');
                    word.className = 'rw-word';
                    word.textContent = part;
                    fragment.appendChild(word);
                });
                element.replaceChild(fragment, node);
            } else if (node.nodeType === 1) {
                var wrapper = document.createElement('span');
                wrapper.className = 'rw-word';
                element.insertBefore(wrapper, node);
                wrapper.appendChild(node);
            }
        });

        Array.prototype.slice.call(element.querySelectorAll('.rw-word')).forEach(function(word, index) {
            word.style.setProperty('--rw-delay', (index * 0.05).toFixed(2) + 's');
        });
    }
    // ------- Mission / Vision word reveal End ------- //

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
