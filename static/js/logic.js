// Creating map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(earthquakesURL, function(data) {
console.log(data)
L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      var mag = feature.properties.mag;
      var colormag = "";
      switch (true) {
        case mag * 3 > 5:
        colormag = "#002B33";
        break;
        case mag * 3 > 4:
        colormag ="#00B1E3";
        break;     
        case mag * 3 > 3:
        colormag ="#00D7E3";
        break;
        case mag * 3 > 2:
        colormag ="#00E3DE";
        break;
        case mag * 3 > 1:
        colormag ="#00E3BF";
        break; 
        default:
        colormag ="#409487";
        }

  var geojsonMarkerOptions = {
    radius: mag * 3,
    fillColor: colormag,
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
        return L.circleMarker(latlng,geojsonMarkerOptions);
    }
}).addTo(myMap);
});
