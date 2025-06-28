// jQuery(function() {
//     ParallaxScroll.init();
// });

var ParallaxScroll = {
    /* PUBLIC VARIABLES */
    showLogs: false,
    round: 1000,

    /* PUBLIC FUNCTIONS */
    init: function() {
        this._log("init");
        if (this._inited) {
            this._log("Already Inited");
            this._inited = true;
            return;
        }
        this._requestAnimationFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                      window.setTimeout(callback, 1000 / 60);
                  };
        })();
        this._onScroll(true);
    },

    /* PRIVATE VARIABLES */
    _inited: false,
    _properties: ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'],
    _requestAnimationFrame:null,

    /* PRIVATE FUNCTIONS */
    _log: function(message) {
        if (this.showLogs) console.log("Parallax Scroll / " + message);
    },
    _onScroll: function(noSmooth) {
        var scroll = jQuery(document).scrollTop();
        var windowHeight = jQuery(window).height();
        this._log("onScroll " + scroll);
        jQuery("[data-parallax]").each(jQuery.proxy(function(index, el) {
            var jQueryel = jQuery(el);
            var properties = [];
            var applyProperties = false;
            var style = jQueryel.data("style");
            if (style == undefined) {
                style = jQueryel.attr("style") || "";
                jQueryel.data("style", style);
            }
            var datas = [jQueryel.data("parallax")];
            var iData;
            for(iData = 2; ; iData++) {
                if(jQueryel.data("parallax"+iData)) {
                    datas.push(jQueryel.data("parallax-"+iData));
                }
                else {
                    break;
                }
            }
            var datasLength = datas.length;
            for(iData = 0; iData < datasLength; iData ++) {
                var data = datas[iData];
                var scrollFrom = data["from-scroll"];
                if (scrollFrom == undefined) scrollFrom = Math.max(0, jQuery(el).offset().top - windowHeight);
                scrollFrom = scrollFrom | 0;
                var scrollDistance = data["distance"];
                var scrollTo = data["to-scroll"];
                if (scrollDistance == undefined && scrollTo == undefined) scrollDistance = windowHeight;
                scrollDistance = Math.max(scrollDistance | 0, 1);
                var easing = data["easing"];
                var easingReturn = data["easing-return"];
                if (easing == undefined || !jQuery.easing|| !jQuery.easing[easing]) easing = null;
                if (easingReturn == undefined || !jQuery.easing|| !jQuery.easing[easingReturn]) easingReturn = easing;
                if (easing) {
                    var totalTime = data["duration"];
                    if (totalTime == undefined) totalTime = scrollDistance;
                    totalTime = Math.max(totalTime | 0, 1);
                    var totalTimeReturn = data["duration-return"];
                    if (totalTimeReturn == undefined) totalTimeReturn = totalTime;
                    scrollDistance = 1;
                    var currentTime = jQueryel.data("current-time");
                    if(currentTime == undefined) currentTime = 0;
                }
                if (scrollTo == undefined) scrollTo = scrollFrom + scrollDistance;
                scrollTo = scrollTo | 0;
                var smoothness = data["smoothness"];
                if (smoothness == undefined) smoothness = 30;
                smoothness = smoothness | 0;
                if (noSmooth || smoothness == 0) smoothness = 1;
                smoothness = smoothness | 0;
                var scrollCurrent = scroll;
                scrollCurrent = Math.max(scrollCurrent, scrollFrom);
                scrollCurrent = Math.min(scrollCurrent, scrollTo);
                if(easing) {
                    if(jQueryel.data("sens") == undefined) jQueryel.data("sens", "back");
                    if(scrollCurrent>scrollFrom) {
                        if(jQueryel.data("sens") == "back") {
                            currentTime = 1;
                            jQueryel.data("sens", "go");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(scrollCurrent<scrollTo) {
                        if(jQueryel.data("sens") == "go") {
                            currentTime = 1;
                            jQueryel.data("sens", "back");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(noSmooth) currentTime = totalTime;
                    jQueryel.data("current-time", currentTime);
                }
                this._properties.map(jQuery.proxy(function(prop) {
                    var defaultProp = 0;
                    var to = data[prop];
                    if (to == undefined) return;
                    if(prop=="scale" || prop=="scaleX" || prop=="scaleY" || prop=="scaleZ" ) {
                        defaultProp = 1;
                    }
                    else {
                        to = to | 0;
                    }
                    var prev = jQueryel.data("_" + prop);
                    if (prev == undefined) prev = defaultProp;
                    var next = ((to-defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom))) + defaultProp;
                    var val = prev + (next - prev) / smoothness;
                    if(easing && currentTime>0 && currentTime<=totalTime) {
                        var from = defaultProp;
                        if(jQueryel.data("sens") == "back") {
                            from = to;
                            to = -to;
                            easing = easingReturn;
                            totalTime = totalTimeReturn;
                        }
                        val = jQuery.easing[easing](null, currentTime, from, to, totalTime);
                    }
                    val = Math.ceil(val * this.round) / this.round;
                    if(val==prev&&next==to) val = to;
                    if(!properties[prop]) properties[prop] = 0;
                    properties[prop] += val;
                    if (prev != properties[prop]) {
                        jQueryel.data("_" + prop, properties[prop]);
                        applyProperties = true;
                    }
                }, this));
            }
            if (applyProperties) {
                if (properties["z"] != undefined) {
                    var perspective = data["perspective"];
                    if (perspective == undefined) perspective = 800;
                    var jQueryparent = jQueryel.parent();
                    if(!jQueryparent.data("style")) jQueryparent.data("style", jQueryparent.attr("style") || "");
                    jQueryparent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; "+ jQueryparent.data("style"));
                }
                if(properties["scaleX"] == undefined) properties["scaleX"] = 1;
                if(properties["scaleY"] == undefined) properties["scaleY"] = 1;
                if(properties["scaleZ"] == undefined) properties["scaleZ"] = 1;
                if (properties["scale"] != undefined) {
                    properties["scaleX"] *= properties["scale"];
                    properties["scaleY"] *= properties["scale"];
                    properties["scaleZ"] *= properties["scale"];
                }
                var translate3d = "translate3d(" + (properties["x"] ? properties["x"] : 0) + "px, " + (properties["y"] ? properties["y"] : 0) + "px, " + (properties["z"] ? properties["z"] : 0) + "px)";
                var rotate3d = "rotateX(" + (properties["rotateX"] ? properties["rotateX"] : 0) + "deg) rotateY(" + (properties["rotateY"] ? properties["rotateY"] : 0) + "deg) rotateZ(" + (properties["rotateZ"] ? properties["rotateZ"] : 0) + "deg)";
                var scale3d = "scaleX(" + properties["scaleX"] + ") scaleY(" + properties["scaleY"] + ") scaleZ(" + properties["scaleZ"] + ")";
                var cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
                this._log(cssTransform);
                jQueryel.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style);
            }
        }, this));
        if(window.requestAnimationFrame) {
            window.requestAnimationFrame(jQuery.proxy(this._onScroll, this, false));
        }
        else {
            this._requestAnimationFrame(jQuery.proxy(this._onScroll, this, false));
        }
    }
};

/* <![CDATA[ */
    var qodefGlobal = {
        vars: {
            adminBarHeight: 0,
            iconArrowLeft:
            '<svg class="qodef-svg--slider-arrow-left" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" viewBox="0 0 26 50.9" xml:space="preserve"><polyline points="25.6,0.4 0.7,25.5 25.6,50.6 " \/><\/svg>',
            iconArrowRight:
            '<svg class="qodef-svg--slider-arrow-right" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" viewBox="0 0 26 50.9" xml:space="preserve"><polyline points="0.4,50.6 25.3,25.5 0.4,0.4 " \/><\/svg>',
            iconClose:
            '<svg class="qodef-svg--close" xmlns="http:\/\/www.w3.org\/2000\/svg" width="26px" height="26px"\n     viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve"><line x1="25" y1="1" x2="1" y2="25"\/><line x1="1" y1="1" x2="25" y2="25"\/><\/svg>',
            qodefStickyHeaderScrollAmount: 1100,
            topAreaHeight: 40,
            restUrl: ".\/wp-json\/",
            restNonce: "1e35ba01ce",
            paginationRestRoute: "courtroom\/v1\/get-posts",
            iconSearch:
            '<svg class="qodef-svg--search" xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" width="17.33" height="17.33" viewBox="3.32 3.27 17.33 17.33" xml:space="preserve"><g><path d="M11.11,4c3.93,0,7.11,3.18,7.11,7.11c0,3.93-3.19,7.11-7.11,7.11C7.18,18.22,4,15.04,4,11.11 C4,7.18,7.18,4,11.11,4z"\/><line x1="20" y1="20" x2="16.13" y2="16.13"\/><\/g><\/svg>',
            headerHeight: 92,
            mobileHeaderHeight: 70,
        },
    };

    var qodefQiAddonsGlobal = {
        vars: {
            adminBarHeight: 0,
            iconArrowLeft:
            '<svg  xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" viewBox="0 0 34.2 32.3" xml:space="preserve" style="stroke-width: 2;"><line x1="0.5" y1="16" x2="33.5" y2="16"\/><line x1="0.3" y1="16.5" x2="16.2" y2="0.7"\/><line x1="0" y1="15.4" x2="16.2" y2="31.6"\/><\/svg>',
            iconArrowRight:
            '<svg  xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" viewBox="0 0 34.2 32.3" xml:space="preserve" style="stroke-width: 2;"><line x1="0" y1="16" x2="33" y2="16"\/><line x1="17.3" y1="0.7" x2="33.2" y2="16.5"\/><line x1="17.3" y1="31.6" x2="33.5" y2="15.4"\/><\/svg>',
            iconClose:
            '<svg  xmlns="http:\/\/www.w3.org\/2000\/svg" xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink" x="0px" y="0px" viewBox="0 0 9.1 9.1" xml:space="preserve"><g><path d="M8.5,0L9,0.6L5.1,4.5L9,8.5L8.5,9L4.5,5.1L0.6,9L0,8.5L4,4.5L0,0.6L0.6,0L4.5,4L8.5,0z"\/><\/g><\/svg>',
        },
    };

    var qiBlocks = {
        vars: {
            arrowLeftIcon:
            '<svg xmlns="http:\/\/www.w3.org\/2000\/svg" x="0px" y="0px" viewBox="0 0 34.2 32.3" xml:space="preserve" style="stroke-width: 2;"><line x1="0.5" y1="16" x2="33.5" y2="16"\/><line x1="0.3" y1="16.5" x2="16.2" y2="0.7"\/><line x1="0" y1="15.4" x2="16.2" y2="31.6"\/><\/svg>',
            arrowRightIcon:
            '<svg xmlns="http:\/\/www.w3.org\/2000\/svg" x="0px" y="0px" viewBox="0 0 34.2 32.3" xml:space="preserve" style="stroke-width: 2;"><line x1="0" y1="16" x2="33" y2="16"\/><line x1="17.3" y1="0.7" x2="33.2" y2="16.5"\/><line x1="17.3" y1="31.6" x2="33.5" y2="15.4"\/><\/svg>',
            closeIcon:
            '<svg xmlns="http:\/\/www.w3.org\/2000\/svg" x="0px" y="0px" viewBox="0 0 9.1 9.1" xml:space="preserve"><g><path d="M8.5,0L9,0.6L5.1,4.5L9,8.5L8.5,9L4.5,5.1L0.6,9L0,8.5L4,4.5L0,0.6L0.6,0L4.5,4L8.5,0z"\/><\/g><\/svg>',
        },
    };