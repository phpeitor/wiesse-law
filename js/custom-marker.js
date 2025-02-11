(function ($) {
    "use strict";

    function CustomMarker ( options ) {
        this.latlng = new google.maps.LatLng({lat: options.position.lat, lng: options.position.lng});
        this.setMap(options.map);
        this.templateData = options.templateData;
        this.markerData = {
            pin : options.markerPin
        };
    }

    if (typeof google === 'object') {
        CustomMarker.prototype = new google.maps.OverlayView();
    }

    CustomMarker.prototype.draw = function() {
        var self = this;
        var div = this.div;

        if (!div) {
            div = this.div = document.createElement('div');
            var id = this.templateData.itemId;
            div.className = 'qodef-map-marker-holder';
            div.setAttribute("id", id);
            div.setAttribute("data-latlng", this.latlng);

            var markerInfoTemplate = _.template( $('.qodef-info-window-template').html() );
            markerInfoTemplate = markerInfoTemplate( self.templateData );

            var markerTemplate = _.template( $('.qodef-marker-template').html() );
            markerTemplate = markerTemplate( self.markerData );

            $(div).append(markerInfoTemplate);
            $(div).append(markerTemplate);

            div.style.position = 'absolute';
            div.style.cursor = 'pointer';

            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }

        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
            div.style.left = (point.x) + 'px';
            div.style.top = (point.y) + 'px';
        }
    };

    CustomMarker.prototype.remove = function() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };

    CustomMarker.prototype.getPosition = function() {
        return this.latlng;
    };
    
    window.qodefCustomMarker = CustomMarker;

})(jQuery);