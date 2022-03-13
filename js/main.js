(function () {

  console.log("Width", document.body.offsetWidth)
  console.log("Height", document.body.offsetHeight)

  // Animation when scrolling
  AOS.init({
    duration: 1000,
    once: true,
    useClassNames: true,
    initClassName: false,
    animatedClassName: 'animated',
  });

  // Selector function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
})()

//https://stackoverflow.com/questions/13840516/how-to-find-my-distance-to-a-known-location-in-javascript
function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
};

function setup_map() {
  // Setting a map
  if ('geolocation' in navigator) {
    console.log('geolocation available');

    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      acc = position.coords.accuracy;

      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      document.getElementById('accuracy').textContent = acc;

      dist = distance(lon, lat, 13.35183, 52.54561);
      document.getElementById('distance').textContent = dist;

      const mymap = L.map('mymap').setView([lat, lon], 15); //set the coordinates in the map
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);
      const marker = L.marker([lat, lon]).addTo(mymap);
    });
  } else {
    console.log('geolocation not available');
  }
}


