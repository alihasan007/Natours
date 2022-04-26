export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxpaGFzYW4tMDA3IiwiYSI6ImNsMXF0bnlycTFvNXoza28ycGtkNWQybWQifQ.7CUPZC44qDn9I12NxElHiA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/alihasan-007/cl1qv4ic7001715plwksb2bic', // style URL,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // add marker
    const el = document.createElement('div');
    el.className = 'marker';
    // add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // add popup
    new mapboxgl.Popup({
      offset: 30,
    })

      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)

      .addTo(map);

    // extends the map bound to adjust current locaton
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
