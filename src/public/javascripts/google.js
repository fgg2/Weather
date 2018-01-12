function getgps(input) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: input,
  }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      const lat = document.getElementById('latt');
      const long = document.getElementById('long');
      lat.textContent = results[0].geometry.location.lat();
      long.textContent = results[0].geometry.location.lng();
    } else {
      alert(`Something got wrong ${status}`);
    }
  });
}

function initAutocomplete() {
  let pos;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const lat = document.getElementById('latt');
      const long = document.getElementById('long');

      lat.textContent = pos.lat;
      long.textContent = pos.lng;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: pos }, (results, status) => {
        if (status === 'OK') {
          const location = results[1].formatted_address;
          const s = document.getElementById('inner-current-loc');
          s.textContent = location;
          const address = document.getElementById('address');
          address.textContent = location;
          document.getElementById('current-container').style.transform = 'translateX(0)';
          document.getElementById('current-container').style.transition = 'transform 1s ease, color 0.5s';
        } else {
          window.alert(`Geocoder failed due to: ${status}`);
        }
      });
    }, () => {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    alert('sorry,your broswer doesnt support Geolocation');
  }

  let input = document.getElementById('pac-input');
  if (!input) {
    input = 'Reykjavik';
    console.log(input);
  }

  console.log(input);
  const searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', () => {
    const place = document.getElementById('pac-input');
    getgps(place.value);
    const address = document.getElementById('address');
    address.textContent = place.value;
  });
}

initAutocomplete();
