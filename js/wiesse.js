/* <![CDATA[ */
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

const playlist = [
    {
        src: "./mp3/3.mp3",
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        cover: "./img/sound.jpeg",
        coverGif: "./img/sound.gif",
    },
    {
        src: "./mp3/1.mp3",
        title: "Livin' On A Prayer",
        artist: "Bon Jovi",
        cover: "./img/sound.jpeg",
        coverGif: "./img/sound.gif",
    },
    {
        src: "./mp3/2.mp3",
        title: "Yellow",
        artist: "Coldplay",
        cover: "./img/sound.jpeg",
        coverGif: "./img/sound.gif",
    },
];

let currentTrackIndex = 0;
let sound;

function loadTrack(index) {
    if (sound) {
        sound.stop();
    }
    sound = new Howl({
        src: [playlist[index].src],
        autoplay: true,
        loop: false,
        volume: 0.9,
        onplay: () => {
        document.getElementById("play-pause-btn").textContent = "⏸";
        document.getElementById("track-cover").src =
            playlist[index].coverGif;
        },
        onpause: () => {
        document.getElementById("play-pause-btn").textContent = "▶️";
        document.getElementById("track-cover").src = playlist[index].cover;
        },
        onend: () => {
        playNextTrack();
        },
        onseek: () => {
        updateProgressBar();
        },
    });
    updateTrackInfo(index);
    resetProgressBar();
}

function updateTrackInfo(index) {
    document.getElementById("track-title").textContent =
        playlist[index].title;
    document.getElementById("track-artist").textContent =
        playlist[index].artist;
    document.getElementById("track-cover").src = playlist[index].cover;
    }

function resetProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    sound.play();
}

function playPrevTrack() {
    currentTrackIndex =
        (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    sound.play();
}

loadTrack(currentTrackIndex);

document
.getElementById("play-pause-btn")
.addEventListener("click", () => {
    if (sound.playing()) {
        sound.pause();
    } else {
        sound.play();
    }
});

document
.getElementById("next-btn")
.addEventListener("click", playNextTrack);
document
.getElementById("prev-btn")
.addEventListener("click", playPrevTrack);

const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");

progressContainer.addEventListener("click", (e) => {
    const clickPosition = e.offsetX / progressContainer.clientWidth;
    sound.seek(sound.duration() * clickPosition);
});

function updateProgressBar() {
    const progress = (sound.seek() / sound.duration()) * 100;
    progressBar.style.width = `${progress}%`;
    if (sound.playing()) {
        requestAnimationFrame(updateProgressBar);
    }
}

sound.on("play", () => {
    requestAnimationFrame(updateProgressBar);
});