var map;
function initMap() {
    // Create an array of styles.
    var styles = [{
        stylers: [{
            hue: "#00ffe6"
        }, {
            saturation: -20
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            lightness: 100
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(41.724598, 44.760428),
        scrollwheel: false,
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}