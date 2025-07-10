if(window.listing){
const listing = window.listing;
let url = `https://api.distancematrix.ai/maps/api/geocode/json?address=${listing.location},${listing.country}&key=B28MWhfysqocS33caNLZsy60QpLFKQAWFdXwnws7GdpHJNRE2tFRV634aW0ZKiWO`;

console.log(listing);
let getLocation = async (url) => {
  let raw = await fetch(url);
  let res = await raw.json();
  if( res.result &&res.result.length) { 
    return res.result[0].geometry.location;
  }
  let location = {
    lat: 0,
    lng: 0
  }
  return location;
}
let Icon = L.icon({
    iconUrl: '/houseMarker_files/home-pin-icon-1836810-512.png',
    iconSize:     [34, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

getLocation(url).then(location => {
  console.log(location);
  let lat = location.lat;
  let lng = location.lng;
  let map = L.map('map').setView([lat, lng], 10);
  console.log(location);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  L.marker([lat, lng], {icon: Icon}).addTo(map)
    .bindPopup(`<b>${listing.title}</b><br>Exact location will be shown after booking.`)
    .openPopup();

});
}