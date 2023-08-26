mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10", // stylesheet location
  center: JSON.parse(campground).geometry.coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(JSON.parse(campground).geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div style="padding:5px 10px"><h5>${
        JSON.parse(campground).title
      }</h5><p style="margin-bottom: 0px">${JSON.parse(campground).location}</p>
            </div>`
    )
  )
  .addTo(map);
