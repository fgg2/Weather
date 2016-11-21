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

      lat.innerHTML = pos.lat;
      long.innerHTML = pos.lng;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: pos }, (results, status) => {
        if (status === 'OK') {
          const location = results[1].formatted_address;
          const s = document.getElementById('pac-input');
          s.placeholder = location;
          const hourheader = document.getElementById('hour-head');
          hourheader.innerHTML = `TODAY IN ${location.toUpperCase()}`;
        // her gerist hlutirnir
          const address = document.getElementById('address');
          address.innerHTML = location;
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

  const input = document.getElementById('pac-input');
  const searchBox = new google.maps.places.SearchBox(input);
  const markers = [];


  searchBox.addListener('places_changed', () => {
    const input = document.getElementById('pac-input');
    getgps(input.value);
    const address = document.getElementById('address');
    address.innerHTML = input.value;
  });
  function getgps(input) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: input,
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const lat = document.getElementById('latt');
        const long = document.getElementById('long');
        lat.innerHTML = results[0].geometry.location.lat();
        long.innerHTML = results[0].geometry.location.lng();
      } else {
        alert(`Something got wrong ${status}`);
      }
    });
  }
}
