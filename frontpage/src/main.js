function initAutocomplete() {
  var pos;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': pos}, function(results, status) {
          if (status === 'OK') {
            var location = results[1].formatted_address;
            putinFrontpage(location);
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else {
    alert('sorry,your broswer doesnt support Geolocation');
  }

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];


  searchBox.addListener('places_changed', function() {
          var input = document.getElementById('pac-input');
          getgps(input.value);
        })
    function getgps(input){
      putinFrontpage(input);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': input
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          alert("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
        } else {
          alert("Something got wrong " + status);
        }
    })
  }
}

function putinFrontpage(location){
  let container = document.querySelector('h1');

  if(container){
    container.parentNode.removeChild(container);
  }

  var header = document.createElement('h1');
  header.innerHTML = 'Your current location is ' + location;
  document.body.appendChild(header);

}
