window._wpemojiSettings = {
baseUrl: "https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/72x72\/",
ext: ".png",
svgUrl: "https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/svg\/",
svgExt: ".svg",
source: {
    concatemoji:
    ".\/js\/wp-emoji-release.min.js?ver=6.7.1",
},
};
!(function (i, n) {
var o, s, e;
function c(e) {
    try {
    var t = { supportTests: e, timestamp: new Date().valueOf() };
    sessionStorage.setItem(o, JSON.stringify(t));
    } catch (e) {}
}
function p(e, t, n) {
    e.clearRect(0, 0, e.canvas.width, e.canvas.height),
    e.fillText(t, 0, 0);
    var t = new Uint32Array(
        e.getImageData(0, 0, e.canvas.width, e.canvas.height).data
    ),
    r =
        (e.clearRect(0, 0, e.canvas.width, e.canvas.height),
        e.fillText(n, 0, 0),
        new Uint32Array(
        e.getImageData(0, 0, e.canvas.width, e.canvas.height).data
        ));
    return t.every(function (e, t) {
    return e === r[t];
    });
}
function u(e, t, n) {
    switch (t) {
    case "flag":
        return n(
        e,
        "\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
        "\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f"
        )
        ? !1
        : !n(
            e,
            "\ud83c\uddfa\ud83c\uddf3",
            "\ud83c\uddfa\u200b\ud83c\uddf3"
            ) &&
            !n(
                e,
                "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",
                "\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f"
            );
    case "emoji":
        return !n(
        e,
        "\ud83d\udc26\u200d\u2b1b",
        "\ud83d\udc26\u200b\u2b1b"
        );
    }
    return !1;
}
function f(e, t, n) {
    var r =
        "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
        ? new OffscreenCanvas(300, 150)
        : i.createElement("canvas"),
    a = r.getContext("2d", { willReadFrequently: !0 }),
    o = ((a.textBaseline = "top"), (a.font = "600 32px Arial"), {});
    return (
    e.forEach(function (e) {
        o[e] = t(a, e, n);
    }),
    o
    );
}
function t(e) {
    var t = i.createElement("script");
    (t.src = e), (t.defer = !0), i.head.appendChild(t);
}
"undefined" != typeof Promise &&
    ((o = "wpEmojiSettingsSupports"),
    (s = ["flag", "emoji"]),
    (n.supports = { everything: !0, everythingExceptFlag: !0 }),
    (e = new Promise(function (e) {
    i.addEventListener("DOMContentLoaded", e, { once: !0 });
    })),
    new Promise(function (t) {
    var n = (function () {
        try {
        var e = JSON.parse(sessionStorage.getItem(o));
        if (
            "object" == typeof e &&
            "number" == typeof e.timestamp &&
            new Date().valueOf() < e.timestamp + 604800 &&
            "object" == typeof e.supportTests
        )
            return e.supportTests;
        } catch (e) {}
        return null;
    })();
    if (!n) {
        if (
        "undefined" != typeof Worker &&
        "undefined" != typeof OffscreenCanvas &&
        "undefined" != typeof URL &&
        URL.createObjectURL &&
        "undefined" != typeof Blob
        )
        try {
            var e =
                "postMessage(" +
                f.toString() +
                "(" +
                [JSON.stringify(s), u.toString(), p.toString()].join(
                ","
                ) +
                "));",
            r = new Blob([e], { type: "text/javascript" }),
            a = new Worker(URL.createObjectURL(r), {
                name: "wpTestEmojiSupports",
            });
            return void (a.onmessage = function (e) {
            c((n = e.data)), a.terminate(), t(n);
            });
        } catch (e) {}
        c((n = f(s, u, p)));
    }
    t(n);
    })
    .then(function (e) {
        for (var t in e)
        (n.supports[t] = e[t]),
            (n.supports.everything =
            n.supports.everything && n.supports[t]),
            "flag" !== t &&
            (n.supports.everythingExceptFlag =
                n.supports.everythingExceptFlag && n.supports[t]);
        (n.supports.everythingExceptFlag =
        n.supports.everythingExceptFlag && !n.supports.flag),
        (n.DOMReady = !1),
        (n.readyCallback = function () {
            n.DOMReady = !0;
        });
    })
    .then(function () {
        return e;
    })
    .then(function () {
        var e;
        n.supports.everything ||
        (n.readyCallback(),
        (e = n.source || {}).concatemoji
            ? t(e.concatemoji)
            : e.wpemoji && e.twemoji && (t(e.twemoji), t(e.wpemoji)));
    }));
})((window, document), window._wpemojiSettings);

function setREVStartSize(e) {
//window.requestAnimationFrame(function() {
window.RSIW =
    window.RSIW === undefined ? window.innerWidth : window.RSIW;
window.RSIH =
    window.RSIH === undefined ? window.innerHeight : window.RSIH;
try {
    var pw = document.getElementById(e.c).parentNode.offsetWidth,
    newh;
    pw =
    pw === 0 ||
    isNaN(pw) ||
    e.l == "fullwidth" ||
    e.layout == "fullwidth"
        ? window.RSIW
        : pw;
    e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
    e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
    e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
    e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
    e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
    e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
    e.mh =
    e.mh === undefined || e.mh == "" || e.mh === "auto"
        ? 0
        : parseInt(e.mh, 0);
    if (e.layout === "fullscreen" || e.l === "fullscreen")
    newh = Math.max(e.mh, window.RSIH);
    else {
    e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
    for (var i in e.rl)
        if (e.gw[i] === undefined || e.gw[i] === 0) e.gw[i] = e.gw[i - 1];
    e.gh =
        e.el === undefined ||
        e.el === "" ||
        (Array.isArray(e.el) && e.el.length == 0)
        ? e.gh
        : e.el;
    e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
    for (var i in e.rl)
        if (e.gh[i] === undefined || e.gh[i] === 0) e.gh[i] = e.gh[i - 1];

    var nl = new Array(e.rl.length),
        ix = 0,
        sl;
    e.tabw = e.tabhide >= pw ? 0 : e.tabw;
    e.thumbw = e.thumbhide >= pw ? 0 : e.thumbw;
    e.tabh = e.tabhide >= pw ? 0 : e.tabh;
    e.thumbh = e.thumbhide >= pw ? 0 : e.thumbh;
    for (var i in e.rl) nl[i] = e.rl[i] < window.RSIW ? 0 : e.rl[i];
    sl = nl[0];
    for (var i in nl)
        if (sl > nl[i] && nl[i] > 0) {
        sl = nl[i];
        ix = i;
        }
    var m =
        pw > e.gw[ix] + e.tabw + e.thumbw
        ? 1
        : (pw - (e.tabw + e.thumbw)) / e.gw[ix];
    newh = e.gh[ix] * m + (e.tabh + e.thumbh);
    }
    var el = document.getElementById(e.c);
    if (el !== null && el) el.style.height = newh + "px";
    el = document.getElementById(e.c + "_wrapper");
    if (el !== null && el) {
    el.style.height = newh + "px";
    el.style.display = "block";
    }
} catch (e) {
    console.log("Failure at Presize of Slider:" + e);
}
//});
}