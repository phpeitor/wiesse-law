(function ( $ ) {
	'use strict';

	var qodefGoogleMap = {
		mapHolder: '',
		mapOptions: [],
		mapElement: '',
		map: {},
		markers: {},
		circleMap: {},
		init: function ( $mapHolder, options ) {
			// Set main map holder
			this.mapHolder = $mapHolder;

			if ( typeof google !== 'object' || typeof this.mapHolder === 'undefined' || typeof this.mapHolder === '' ) {
				return;
			}

			// Init map
			this.initMap( this.mapHolder, options );
		},
		getMapSettings: function () {
			return {
				styles: qodefMapsVariables.global.mapStyle,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: qodefMapsVariables.global.mapScrollable,
				draggable: qodefMapsVariables.global.mapDraggable,
				streetViewControl: qodefMapsVariables.global.streetViewControl,
				zoomControl: qodefMapsVariables.global.zoomControl,
				zoom: parseInt( qodefMapsVariables.global.mapZoom, 10 ),
				mapTypeControl: qodefMapsVariables.global.mapTypeControl,
				fullscreenControl: qodefMapsVariables.global.fullscreenControl,
			};
		},
		getMapOptions: function ( $mapHolder, forwardOptions ) {
			var options = {
				uniqueId: '',
				holderId: '',
				mapHeight: 0,
				addresses: [],
				addressesLatLng: [],
				pin: '',
				selectorIsID: false,
				multipleTrigger: false,
				geolocation: false,
			};

			options = $.extend( options, forwardOptions );

			if ( options.selectorIsID ) {
				options.uniqueId = $mapHolder[0].id;
				options.holderId = $mapHolder[0].id;
			} else if ( typeof $mapHolder.data( 'unique-id' ) !== 'undefined' && $mapHolder.data( 'unique-id' ) !== false ) {
				options.uniqueId = $mapHolder.data( 'unique-id' );
				options.holderId = 'qodef-map-id--' + $mapHolder.data( 'unique-id' );
			}

			if ( typeof $mapHolder.data( 'height' ) !== 'undefined' && $mapHolder.data( 'height' ) !== false ) {
				options.mapHeight = parseInt( $mapHolder.data( 'height' ), 10 );
			}

			if ( typeof qodefMapsVariables.multiple.addresses !== 'undefined' && qodefMapsVariables.multiple.addresses !== '' ) {
				options.addresses = qodefMapsVariables.multiple.addresses;
			} else if ( typeof $mapHolder.data( 'addresses' ) !== 'undefined' && $mapHolder.data( 'addresses' ) !== false ) {
				options.addresses = $mapHolder.data( 'addresses' );
			}

			if ( typeof $mapHolder.data( 'pin' ) !== 'undefined' && $mapHolder.data( 'pin' ) !== false ) {
				options.pin = $mapHolder.data( 'pin' );
			}

			return options;
		},
		initMap: function ( $mapHolder, options ) {
			this.mapOptions = this.getMapOptions( $mapHolder, options );
			this.mapElement = document.getElementById( this.mapOptions.holderId );
			this.map        = new google.maps.Map( this.mapElement, this.getMapSettings() );

			// Trigger geolocation
			this.triggerGeolocation();

			// Set map addresses
			this.setAddress();

			// Set map height
			this.setMapHeight();
		},
		triggerGeolocation: function () {

			//If geolocation enabled set map center to user location
			if ( navigator.geolocation && this.mapOptions.geolocation ) {
				this.centerMapToGeolocationAddress();
			}
		},
		setAddress: function () {
			for ( var index = 0; index < this.mapOptions.addresses.length; index++ ) {
				var address = this.mapOptions.addresses[index];

				if ( address === '' ) {
					return;
				}

				if ( this.mapOptions.multipleTrigger ) {
					var addressLocation = address.location;

					if ( typeof addressLocation !== 'undefined' && addressLocation !== null && addressLocation.latitude !== '' && addressLocation.longitude !== '' ) {
						this.mapOptions.addressesLatLng.push( $.extend( addressLocation, address ) );
					}

				} else {
					this.setSingleAddress( address );
				}
			}

			if ( this.mapOptions.multipleTrigger ) {

				// Center map and set borders of map
				this.centerMapMultipleAddresses( this.map, this.mapOptions );

				// Add markers to the map
				this.addMultipleMarkers();
			}
		},
		setSingleAddress: function ( address ) {
			var $infoWindow = new google.maps.InfoWindow(
				{
					content: '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' + address + '</p></div></div>',
				}
			);

			var $geocoder = new google.maps.Geocoder();

			if ( typeof $geocoder === 'object' ) {
				var $map       = this.map,
					mapOptions = this.mapOptions;

				$geocoder.geocode(
					{ 'address': address },
					function ( results, status ) {
						if ( status === google.maps.GeocoderStatus.OK && typeof results === 'object' ) {
							var $marker = new google.maps.Marker(
								{
									map: $map,
									position: results[0].geometry.location,
									icon: mapOptions.pin,
									title: address.store_title,
								}
							);

							google.maps.event.addListener(
								$marker,
								'click',
								function () {
									$infoWindow.open( $map, $marker );
								}
							);

							var addressVariables = {
								address: results[0].formatted_address,
								latitude: results[0].geometry.location.lat(),
								longitude: results[0].geometry.location.lng(),
							};

							mapOptions.addressesLatLng.push( addressVariables );

							// Center map address
							qodefGoogleMap.centerMapAddress( $map, mapOptions, results );

							//Re-init markers position on resize
							window.addEventListener(
								'resize',
								function () {
									qodefGoogleMap.centerMapAddress( $map, mapOptions, results );
								}
							);
						}
					}
				);
			}
		},
		setMapHeight: function () {
			var mapOptions = this.mapOptions;

			if ( mapOptions.mapHeight > 0 && this.mapElement !== '' ) {
				this.mapElement.style.height = mapOptions.mapHeight + 'px';
			}
		},
		centerMapAddress: function ( $map, mapOptions, results ) {

			// Different logic for single and multiple addresses
			if ( mapOptions.addresses.length === 1 ) {
				$map.setCenter( results[0].geometry.location );
			} else {
				this.centerMapMultipleAddresses( $map, mapOptions );
			}
		},
		centerMapMultipleAddresses: function ( $map, mapOptions ) {
			var $bounds         = new google.maps.LatLngBounds(),
				addressesLatLng = mapOptions.addressesLatLng;

			if ( mapOptions.multipleTrigger && addressesLatLng.length === 1 ) {
				$map.setCenter(
					{
						lat: parseFloat( addressesLatLng[0].latitude ),
						lng: parseFloat( addressesLatLng[0].longitude ),
					}
				);
			} else if ( typeof $bounds === 'object' && addressesLatLng.length ) {
				for ( var index = 0; index < addressesLatLng.length; index++ ) {
					$bounds.extend(
						{
							lat: parseFloat( addressesLatLng[index].latitude ),
							lng: parseFloat( addressesLatLng[index].longitude ),
						}
					);
				}

				$map.fitBounds( $bounds );
			}
		},
		centerMapToGeolocationAddress: function ( setInputAddressValue, placesInput, geoLocationLinkIcon, listHolder ) {

			// Try HTML5 geolocation.
			if ( navigator.geolocation ) {
				var $map = this.map;

				if ( setInputAddressValue ) {
					geoLocationLinkIcon.addClass( 'fa-spinner fa-spin' );
				}

				navigator.geolocation.getCurrentPosition(
					function ( position ) {
						var lat    = position.coords.latitude,
							lng    = position.coords.longitude,
							latlng = {
								lat: lat,
								lng: lng,
							};

						if ( setInputAddressValue ) {
							var $geocoder           = new google.maps.Geocoder(),
								cityName            = '',
								cityWithCountryName = '';

							$geocoder.geocode(
								{ 'latLng': latlng },
								function ( results, status ) {
									if ( status === google.maps.GeocoderStatus.OK && typeof results === 'object' ) {
										var resultsObject = results;

										for ( var $i = 0; $i <= resultsObject.length; $i++ ) {
											var result = resultsObject[$i];

											if ( typeof result === 'object' && result.types[0] === 'locality' ) {
												var currentAddress = result.address_components;

												cityName = currentAddress[0].long_name;

												for ( var $j = 0; $j <= currentAddress.length; $j++ ) {
													if ( typeof currentAddress[$j] === 'object' && currentAddress[$j].types[0] === 'country' ) {
														cityWithCountryName = cityName + ',' + currentAddress[$j].long_name;
													}
												}
											}
										}

										if ( typeof cityName === 'string' ) {
											geoLocationLinkIcon.removeClass( 'fa-spinner fa-spin' );

											if ( typeof cityWithCountryName === 'string' ) {
												placesInput.val( cityWithCountryName );
											} else {
												placesInput.val( cityName );
											}

											window.qodefGeoLocation.showRangeSlider( latlng, true );
											qodef.body.trigger( 'courtroom_core_trigger_after_autocomplete_places', [placesInput] );
										}
									}
								}
							);
						} else {
							$map.setCenter( latlng );
						}
					}
				);
			}
		},
		centerMapToForwardAddress: function ( addressName ) {

			if ( typeof addressName === 'string' && typeof google === 'object' ) {
				var $map        = this.map,
					mapSettings = this.getMapSettings(),
					$geocoder   = new google.maps.Geocoder();

				$geocoder.geocode(
					{ 'address': addressName },
					function ( results, status ) {
						if ( status === google.maps.GeocoderStatus.OK && typeof results[0] === 'object' ) {
							$map.setZoom( mapSettings.zoom );
							$map.setCenter( results[0].geometry.location );
						}
					}
				);
			}
		},
		addMultipleMarkers: function () {
			var markers         = [],
				addressesLatLng = this.mapOptions.addressesLatLng;

			for ( var i = 0; i < addressesLatLng.length; i++ ) {
				var latLng = {
					lat: parseFloat( addressesLatLng[i].latitude ),
					lng: parseFloat( addressesLatLng[i].longitude )
				};

				//Custom html markers
				//Insert marker data into info window template
				var templateData = {
					latLng: latLng,
				};

				$.each(
					addressesLatLng[i],
					function ( key, value ) {
						templateData[key] = value;
					}
				);

				var $customMarker = new window.qodefCustomMarker(
					{
						position: latLng,
						map: this.map,
						templateData: templateData,
						markerPin: addressesLatLng[i].markerPin,
					}
				);

				markers.push( $customMarker );
			}

			this.markers = markers;

			//Init map clusters ( Grouping map markers at small zoom values )
			this.initMarkerClusters();

			//Init marker info
			this.initMarkerInfo();
		},
		initMarkerClusters: function () {
			var markerOptions = {
				minimumClusterSize: 2,
				maxZoom: 12,
				styles: [{
					width: 50,
					height: 60,
					url: '',
					textSize: 12,
				}],
			};

			new MarkerClusterer(
				this.map,
				this.markers,
				markerOptions
			);
		},
		initMarkerInfo: function () {
			var $map = this.map;

			$( document ).off(
				'click',
				'.qodef-map-marker'
			).on(
				'click',
				'.qodef-map-marker',
				function () {
					var self             = $( this ),
						$markerHolders   = $( '.qodef-map-marker-holder' ),
						$infoWindows     = $( '.qodef-info-window' ),
						$markerHolder    = self.parent( '.qodef-map-marker-holder' ),
						markerlatlngData = $markerHolder.data( 'latlng' ),
						$infoWindow      = self.siblings( '.qodef-info-window' );

					if ( $markerHolder.hasClass( 'qodef-active qodef-map-active' ) ) {
						$markerHolder.removeClass( 'qodef-active qodef-map-active' );
						$infoWindow.fadeOut( 0 );
					} else {
						$markerHolders.removeClass( 'qodef-active qodef-map-active' );
						$infoWindows.fadeOut( 0 );
						$markerHolder.addClass( 'qodef-active qodef-map-active' );
						$infoWindow.fadeIn( 300 );

						if ( markerlatlngData.length && markerlatlngData !== undefined ) {
							var latlngStr = markerlatlngData.replace( '(', '' ).replace( ')', '' ).split( ',', 2 );

							$map.panTo( new google.maps.LatLng( parseFloat( latlngStr[0] ), parseFloat( latlngStr[1] ) ) );
						}
					}
				}
			);
		},
		setGeoLocationRadius: function ( $geoLocation, radius, isActive ) {

			if ( typeof $geoLocation === 'object' && typeof google === 'object' ) {
				var $map     = this.map,
					$markers = this.markers;

				if ( isActive ) {
					this.circleMap.setMap( null );
				}

				this.circleMap = new google.maps.Circle(
					{
						map: $map,
						center: $geoLocation,
						radius: parseInt( radius, 10 ) * 1000, // 1000 change meters to kilometers
						strokeWeight: 0,
						fillColor: '#fc475f',
						fillOpacity: 0.15,
					}
				);

				var $currentCircle = this.circleMap;

				var itemsInArea = [];
				$.each(
					$markers,
					function ( i, marker ) {
						if ( $currentCircle.getBounds().contains( marker.latlng ) ) {
							itemsInArea.push( marker.templateData.itemId );
						}
					}
				);

				window.qodefGeoLocation.disableItemsOutOfRange( itemsInArea );
			}
		},
		createAutocompletePlaces: function ( placeInputID ) {

			if ( typeof google === 'object' && typeof google.maps.places === 'object' ) {
				var autocompleteConfig = {
					types: ['(cities)']
				};

				var autocomplete = new google.maps.places.Autocomplete( placeInputID, autocompleteConfig );

				autocomplete.addListener(
					'place_changed',
					function () {
						// Enable reset icon in field
						$( placeInputID ).next().show();
						window.qodefGeoLocation.reset();
						qodef.body.trigger( 'courtroom_core_trigger_after_autocomplete_places', [placeInputID] );
					}
				);
			}
		},
	};

	window.qodefGoogleMap = qodefGoogleMap;

	var qodefGeoLocation = {
		holder: '',
		radius: '',
		slider: '',
		init: function ( $holder = '' ) {
			this.holder = $holder;

			if ( this.holder.length ) {
				this.radius = this.holder.find( '.qodef-places-geo-radius' );
				this.slider = document.getElementById( 'qodef-range-slider-id' );

				if ( this.radius.length && this.slider !== null ) {
					this.createSlider();
				}
			}
		},
		createSlider: function () {
			noUiSlider.create(
				this.slider,
				{
					connect: [true, false],
					start: 0,
					step: 1,
					tooltips: true,
					format: {
						from: function ( value ) {
							return parseInt( value );
						},
						to: function ( value ) {
							return parseInt( value );
						},
					},
					range: {
						min: 0,
						max: 100,
					}
				}
			);

			this.updateMapRadius();
		},
		updateMapRadius: function () {
			var sliderEventCount = 0;

			this.slider.noUiSlider.on(
				'set',
				function ( values ) {
					var $geoLocation = qodefGeoLocation.radius.data( 'geo-location' );

					if ( typeof $geoLocation === 'object' ) {
						window.qodefGoogleMap.setGeoLocationRadius( $geoLocation, values, sliderEventCount > 0 );
						sliderEventCount++;
					}
				}
			);
		},
		reset: function () {

			if ( this.slider !== null && this.radius.length && this.radius.is( ':visible' ) ) {
				this.setRadiusVisibility( '', false );
				this.slider.noUiSlider.reset();
			}
		},
		showRangeSlider: function ( latlng, visibility ) {

			if ( this.radius.length ) {
				this.setRadiusVisibility( latlng, visibility );
			}
		},
		setRadiusVisibility: function ( latlng, visibility ) {
			this.radius.data( 'geo-location', latlng );

			if ( visibility ) {
				this.radius.show();
			} else {
				this.radius.hide();
			}
		},
		disableItemsOutOfRange: function ( $itemsInArea ) {
			var $holder = this.holder;

			if ( $holder.length && typeof $itemsInArea === 'object' ) {
				var $items         = $holder.find( '.qodef-grid-inner article' ),
					$outOfRangeHolder,
					$outOfRangeItems,
					$inRangeHolder = $holder.find( '.qodef-grid-inner' );

				if ( ! $holder.children( '.qodef-out-of-range-holder' ).length ) {
					$holder.append( '<div class="qodef-out-of-range-holder"></div>' );
				}

				$outOfRangeHolder = $holder.children( '.qodef-out-of-range-holder' );
				$outOfRangeItems  = $outOfRangeHolder.children( 'article' );

				if ( $items.length || $outOfRangeItems.length ) {

					$items.each(
						function () {
							var $thisItem = $( this ),
								itemID    = $thisItem.data( 'id' );

							if ( itemID !== undefined && itemID !== false ) {
								var itemInRange = false;

								$.each(
									$itemsInArea,
									function ( i, id ) {
										if ( parseInt( itemID, 10 ) === id ) {
											itemInRange = true;
											return true;
										}
									}
								);

								if ( ! itemInRange ) {
									$thisItem.appendTo( $outOfRangeHolder );

									if ( $holder.hasClass( 'qodef-layout--masonry' ) ) {
										$inRangeHolder.isotope( 'layout' );
									}
								}
							}
						}
					);

					if ( $outOfRangeItems.length ) {
						$outOfRangeItems.each(
							function () {
								var $thisOutItem = $( this ),
									outItemID    = $thisOutItem.data( 'id' ),
									itemInRange  = false;

								$.each(
									$itemsInArea,
									function ( i, id ) {
										if ( parseInt( outItemID, 10 ) === id ) {
											itemInRange = true;
											return true;
										}
									}
								);

								if ( itemInRange ) {
									$thisOutItem.appendTo( $inRangeHolder );

									if ( $holder.hasClass( 'qodef-layout--masonry' ) ) {
										$inRangeHolder.isotope( 'layout' );
									}
								}
							}
						);
					}
				}
			}
		},
	};

	window.qodefGeoLocation = qodefGeoLocation;

})( jQuery );
