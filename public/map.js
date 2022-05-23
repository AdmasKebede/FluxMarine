var map;

function initMap() {
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true,
    center: new google.maps.LatLng(42.360081, -71.058884),
    zoom: 13,
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var paths = [];

  paths["1_to_2"] = new google.maps.Polyline({
    path: paths,
    strokeColor: "#FF0000",
  });
  drawDirections();
  function drawDirections() {
    paths["1_to_2"].setOptions({ map: map });
  }
}

function renderMap() {
  google.maps.event.addDomListener(window, "load", initMap);
}

function updateOnMap(data) {
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true,

    center: new google.maps.LatLng(
      data.features[0].geometry.coordinates[0][1],
      data.features[0].geometry.coordinates[0][0]
    ),
    zoom: 4,
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var paths = [];

  data.features[0].geometry.coordinates.map((m) => {
    paths.push(new google.maps.LatLng(m[1], m[0]));
  });
  paths.map((m) => console.log(m[0] + " " + m[1]));

  paths["final"] = new google.maps.Polyline({
    path: paths,
    strokeColor: "#000000",
  });

  new google.maps.Marker({
    position: {
      lat: data.features[0].geometry.coordinates[0][1],
      lng: data.features[0].geometry.coordinates[0][0],
    },
    map,
    title: "from",
    icon: "./from.png",
  });

  new google.maps.Marker({
    position: {
      lat: data.features[0].geometry.coordinates[
        data.features[0].geometry.coordinates.length - 1
      ][1],
      lng: data.features[0].geometry.coordinates[
        data.features[0].geometry.coordinates.length - 1
      ][0],
    },
    map,
    title: "to",
    animation: google.maps.Animation.DROP,
  });
  drawDirections();

  function drawDirections() {
    paths["final"].setOptions({ map: map });
  }
}
