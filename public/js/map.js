mapboxgl.accessToken =
  "pk.eyJ1IjoiaWh1cnRodXJ0IiwiYSI6ImNrODcwNWVuNjBuY2kza3JxaWQ2ZmhhZzUifQ.uFx4_U4AKBCphMAzAZWbYQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/ihurthurt/ck872it0k0tet1jl7rfugnkap",

  zoom: 9,
  center: [-97.73333, 30.266666]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

getStores();
