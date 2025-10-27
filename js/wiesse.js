/* <![CDATA[ */
var mejsL10n = {
language: "en",
strings: {
    "mejs.download-file": "Download File",
    "mejs.install-flash":
    "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https:\/\/get.adobe.com\/flashplayer\/",
    "mejs.fullscreen": "Fullscreen",
    "mejs.play": "Play",
    "mejs.pause": "Pause",
    "mejs.time-slider": "Time Slider",
    "mejs.time-help-text":
    "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds.",
    "mejs.live-broadcast": "Live Broadcast",
    "mejs.volume-help-text":
    "Use Up\/Down Arrow keys to increase or decrease volume.",
    "mejs.unmute": "Unmute",
    "mejs.mute": "Mute",
    "mejs.volume-slider": "Volume Slider",
    "mejs.video-player": "Video Player",
    "mejs.audio-player": "Audio Player",
    "mejs.captions-subtitles": "Captions\/Subtitles",
    "mejs.captions-chapters": "Chapters",
    "mejs.none": "None",
    "mejs.afrikaans": "Afrikaans",
    "mejs.albanian": "Albanian",
    "mejs.arabic": "Arabic",
    "mejs.belarusian": "Belarusian",
    "mejs.bulgarian": "Bulgarian",
    "mejs.catalan": "Catalan",
    "mejs.chinese": "Chinese",
    "mejs.chinese-simplified": "Chinese (Simplified)",
    "mejs.chinese-traditional": "Chinese (Traditional)",
    "mejs.croatian": "Croatian",
    "mejs.czech": "Czech",
    "mejs.danish": "Danish",
    "mejs.dutch": "Dutch",
    "mejs.english": "English",
    "mejs.estonian": "Estonian",
    "mejs.filipino": "Filipino",
    "mejs.finnish": "Finnish",
    "mejs.french": "French",
    "mejs.galician": "Galician",
    "mejs.german": "German",
    "mejs.greek": "Greek",
    "mejs.haitian-creole": "Haitian Creole",
    "mejs.hebrew": "Hebrew",
    "mejs.hindi": "Hindi",
    "mejs.hungarian": "Hungarian",
    "mejs.icelandic": "Icelandic",
    "mejs.indonesian": "Indonesian",
    "mejs.irish": "Irish",
    "mejs.italian": "Italian",
    "mejs.japanese": "Japanese",
    "mejs.korean": "Korean",
    "mejs.latvian": "Latvian",
    "mejs.lithuanian": "Lithuanian",
    "mejs.macedonian": "Macedonian",
    "mejs.malay": "Malay",
    "mejs.maltese": "Maltese",
    "mejs.norwegian": "Norwegian",
    "mejs.persian": "Persian",
    "mejs.polish": "Polish",
    "mejs.portuguese": "Portuguese",
    "mejs.romanian": "Romanian",
    "mejs.russian": "Russian",
    "mejs.serbian": "Serbian",
    "mejs.slovak": "Slovak",
    "mejs.slovenian": "Slovenian",
    "mejs.spanish": "Spanish",
    "mejs.swahili": "Swahili",
    "mejs.swedish": "Swedish",
    "mejs.tagalog": "Tagalog",
    "mejs.thai": "Thai",
    "mejs.turkish": "Turkish",
    "mejs.ukrainian": "Ukrainian",
    "mejs.vietnamese": "Vietnamese",
    "mejs.welsh": "Welsh",
    "mejs.yiddish": "Yiddish",
    },
};

var elementorFrontendConfig = {
    environmentMode: {
        edit: false,
        wpPreview: false,
        isScriptDebug: false,
    },
    i18n: {
        shareOnFacebook: "Share on Facebook",
        shareOnTwitter: "Share on Twitter",
        pinIt: "Pin it",
        download: "Download",
        downloadImage: "Download image",
        fullscreen: "Fullscreen",
        zoom: "Zoom",
        share: "Share",
        playVideo: "Play Video",
        previous: "Previous",
        next: "Next",
        close: "Close",
        a11yCarouselWrapperAriaLabel:
        "Carousel | Horizontal scrolling: Arrow Left & Right",
        a11yCarouselPrevSlideMessage: "Previous slide",
        a11yCarouselNextSlideMessage: "Next slide",
        a11yCarouselFirstSlideMessage: "This is the first slide",
        a11yCarouselLastSlideMessage: "This is the last slide",
        a11yCarouselPaginationBulletMessage: "Go to slide",
    },
    is_rtl: false,
    breakpoints: { xs: 0, sm: 480, md: 768, lg: 1025, xl: 1440, xxl: 1600 },
    responsive: {
        breakpoints: {
        mobile: {
            label: "Mobile Portrait",
            value: 767,
            default_value: 767,
            direction: "max",
            is_enabled: true,
        },
        mobile_extra: {
            label: "Mobile Landscape",
            value: 880,
            default_value: 880,
            direction: "max",
            is_enabled: true,
        },
        tablet: {
            label: "Tablet Portrait",
            value: 1024,
            default_value: 1024,
            direction: "max",
            is_enabled: true,
        },
        tablet_extra: {
            label: "Tablet Landscape",
            value: 1200,
            default_value: 1200,
            direction: "max",
            is_enabled: true,
        },
        laptop: {
            label: "Laptop",
            value: 1512,
            default_value: 1366,
            direction: "max",
            is_enabled: true,
        },
        widescreen: {
            label: "Widescreen",
            value: 1950,
            default_value: 2400,
            direction: "min",
            is_enabled: true,
        },
        },
    },
    version: "3.16.5",
    is_static: false,
    experimentalFeatures: {
        e_dom_optimization: true,
        e_optimized_assets_loading: true,
        e_optimized_css_loading: true,
        additional_custom_breakpoints: true,
        container: true,
        e_swiper_latest: true,
        "landing-pages": true,
        e_global_styleguide: true,
    },
    urls: {
        assets:
        ".\/",
    },
    swiperClass: "swiper",
    settings: { page: [], editorPreferences: [] },
    kit: {
        active_breakpoints: [
        "viewport_mobile",
        "viewport_mobile_extra",
        "viewport_tablet",
        "viewport_tablet_extra",
        "viewport_laptop",
        "viewport_widescreen",
        ],
        viewport_mobile: 767,
        viewport_mobile_extra: 880,
        viewport_tablet: 1024,
        viewport_tablet_extra: 1200,
        viewport_laptop: 1512,
        viewport_widescreen: 1950,
        lightbox_enable_counter: "yes",
        lightbox_enable_fullscreen: "yes",
        lightbox_enable_zoom: "yes",
        lightbox_enable_share: "yes",
        lightbox_title_src: "title",
        lightbox_description_src: "description",
    },
    post: {
        id: 113,
        title: "Courtroom%20%E2%80%93%20Lawyer%20and%20Law%20Firm%20Theme",
        excerpt: "",
        featuredImage:
        ".\/img\/opengraph-1024x538.png",
    },
};

var qodefElementorGlobal = {
    vars: { elementorSectionHandler: [], elementorColumnHandler: [] },
};
var qodefElementorContainerGlobal = {
    vars: {
        elementorContainerHandler: {
        "6c53248": [
            {
            parallax_type: "parallax",
            parallax_image: {
                url: "./img/main-home-img-1.jpg",
                id: 324,
                size: "",
                alt: "",
                source: "library",
            },
            },
        ],
        },
    },
};

var tpj = jQuery;
var revapi1;

if (window.RS_MODULES === undefined) window.RS_MODULES = {};
if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};
RS_MODULES.modules["revslider11"] = {
once:
    RS_MODULES.modules["revslider11"] !== undefined
    ? RS_MODULES.modules["revslider11"].once
    : undefined,
init: function () {
    window.revapi1 =
    window.revapi1 === undefined ||
    window.revapi1 === null ||
    window.revapi1.length === 0
        ? document.getElementById("rev_slider_1_1")
        : window.revapi1;
    if (
    window.revapi1 === null ||
    window.revapi1 === undefined ||
    window.revapi1.length == 0
    ) {
    window.revapi1initTry =
        window.revapi1initTry === undefined
        ? 0
        : window.revapi1initTry + 1;
    if (window.revapi1initTry < 20)
        requestAnimationFrame(function () {
        RS_MODULES.modules["revslider11"].init();
        });
    return;
    }
    window.revapi1 = jQuery(window.revapi1);
    if (window.revapi1.revolution == undefined) {
    revslider_showDoubleJqueryError("rev_slider_1_1");
    return;
    }
    revapi1.revolutionInit({
        revapi: "revapi1",
        DPR: "dpr",
        sliderLayout: "fullscreen",
        duration: "3800ms",
        visibilityLevels: "1920,1700,1200,690",
        gridwidth: "1240,1024,778,480",
        gridheight: "900,768,960,720",
        lazyType: "smart",
        perspective: 600,
        perspectiveType: "global",
        editorheight: "900,768,960,720",
        responsiveLevels: "1920,1700,1200,690",
        progressBar: { disableProgressBar: true },
        navigation: {
            wheelCallDelay: 1000,
            onHoverStop: false,
            touch: {
            touchenabled: true,
            },
            arrows: {
            enable: true,
            tmp: '<svg class="qodef-svg--slider-arrow-left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 50.9" xml:space="preserve">	<polyline points="25.6,0.4 0.7,25.5 25.6,50.6 " /></svg><svg class="qodef-svg--slider-arrow-right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 50.9" xml:space="preserve">	<polyline points="0.4,50.6 25.3,25.5 0.4,0.4 " /></svg>',
            style: "qodef-rev--navigation",
            hide_onmobile: true,
            hide_under: "1026px",
            animDelay: "1ms",
            left: {
                h_offset: 60,
                v_offset: 40,
            },
            right: {
                h_offset: 95,
                v_offset: 40,
            },
            },
            bullets: {
            enable: true,
            tmp: "",
            style: "qodef--bullets",
            animDelay: "1ms",
            v_offset: 50,
            space: 30,
            },
        },
        viewPort: {
            global: true,
            globalDist: "-200px",
            enable: false,
        },
        fallbacks: {
            allowHTML5AutoPlayOnAndroid: true,
        },
    }); 
 },
};

if (window.RS_MODULES.checkMinimal !== undefined) {
    window.RS_MODULES.checkMinimal();
}


document.getElementById("currentYear").textContent = new Date().getFullYear();

jQuery("#menu-item-6320, .menu-item-6320").on("click", function () {
    jQuery("body").toggleClass(
        "qodef-side-area--opened qodef-side-area-animate--in"
    );
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("s");

    if (searchTerm) {
        highlightText(document.body, searchTerm);
    }
});

function highlightText(element, searchTerm) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach((child) =>
        highlightText(child, searchTerm)
        );
    } else if (element.nodeType === Text.TEXT_NODE) {
        const regex = new RegExp(searchTerm, "gi");
        if (regex.test(element.textContent)) {
        const newHTML = element.textContent.replace(
            regex,
            (match) =>
            `<mark style="background-color: yellow; color: black;">${match}</mark>`
        );
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = newHTML;

        while (tempDiv.firstChild) {
            element.parentNode.insertBefore(tempDiv.firstChild, element);
        }
        element.remove();
        }
    }
}