// initialize the map on the "map" div
// set the view of the map (geographical center is [51.505, -0.09] and zoom level is 13)
var map = L.map('map').setView([51.505, -0.09], 13);

// Instantiates a tile layer object with the given URL, and the following options:
// attribution information, maximum zoom level number and the information to access the tile provider's service
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'duanyang.p62co5ca',
    accessToken: 'pk.eyJ1IjoiZHVhbnlhbmciLCJhIjoiY2lrcG12MmpmMTJoNXUybTZhaWI4eXM4cCJ9.GikD77VU-5CGqW_XAazYYw'
// add this tile layer to the map
}).addTo(map);

// add a marker to the map on the coordinate [51.5, -0.09] 
var marker = L.marker([51.5, -0.09]).addTo(map);
// put a circle on the map on the coordinate [51.508, -0.11], with a radius of 500,
// and certain color, fillColor, fillOpacity 
var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
// add this cricle to the map 
}).addTo(map);
// create a polygon on the map with vertices in the given coordinates
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
// bind a popup to the marker and open it
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// bind a popup to a click on this circle
circle.bindPopup("I am a circle.");
// bind a popup to a click on this polygon
polygon.bindPopup("I am a polygon.");
// create a popup object
var popup = L.popup();
// create a event listener function
function onMapClick(e) {
    popup
    	// set the geographic location where the popup will show up
        .setLatLng(e.latlng)
        // set the content of the pop up
        .setContent("You clicked the map at " + e.latlng.toString())
        // adds the popup to the map and closes the previous one
        .openOn(map);
}
// create an event listener on the whole map that listens to "click"
// event, and execute onMapClick function when that event happens
map.on('click', onMapClick);






// create a GeoJSON feature
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
// add the GeoJSON feature to the map
L.geoJson(geojsonFeature).addTo(map);


// create an array of GeoJSON objects
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];


// style features by setting a style object and 
// style all the features the same way
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
// add the GeoJSON data myLines to the map with styles specified in myStyle
L.geoJson(myLines, {style: myStyle}).addTo(map);


// create a list of GeoJSON files represents states 
//pass a function to style features based on their properties
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];
// add GeoJSON object states to the map, with the style function
// specifying different style for different party of the states
L.geoJson(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);


// pointToLayer, draw a point feature as a circleMarker
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
// add GeoJSON object geojsonFeature to the map, with a pointToLayer function
L.geoJson(geojsonFeature, {
    pointToLayer: function (feature, latlng) {
    	// create a circleMarker object at the latlng geographic location,
    	// and property of the markers in geojsonMarkerOptions
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
// add this GeoJSON object to the map
}).addTo(map);


// onEachFeature option, attach a popup to features when they are clicked
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
    	// bind popup of the layer with popupcontent in the features properties
        layer.bindPopup(feature.properties.popupContent);
    }
}
// add a GeoJSON object to the map with an onEachFeature function
L.geoJson(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);


// filter option, the following feature Busch will not show up
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];
// add GeoJSON object someFeatures to the map, only the ones
// that has true in show_on_map in its properties
L.geoJson(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);