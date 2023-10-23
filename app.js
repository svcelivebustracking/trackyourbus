const firebaseConfig = {
  apiKey: "AIzaSyD3Cl5s1E5VduZ5u1pg52-gWmJ4lA85-9c",
  authDomain: "bus-live--location.firebaseapp.com",
  databaseURL: "https://bus-live--location-default-rtdb.firebaseio.com",
  projectId: "bus-live--location",
  storageBucket: "bus-live--location.appspot.com",
  messagingSenderId: "783576863521",
  appId: "1:783576863521:web:66d867caa3c5256aa1e460",
  measurementId: "G-ZRME8PEXMJ"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function initMap() {
  const map = L.map("map").setView([13.003065, 79.970555], 10);

  // Create a custom marker icon
  const customIcon = L.icon({
    iconUrl: 'bus-marker.png', // Replace with the actual path to your custom marker image
    iconSize: [32, 32], // Set the size of your custom marker image
    iconAnchor: [16, 32], // Set the anchor point for the icon (usually half of the iconSize)
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const markers = {};

  db.ref("BusLocations").on("value", (snapshot) => {
    mapMarkers(snapshot.val());
  });

  function mapMarkers(locations) {
    for (const busNumber in markers) {
      map.removeLayer(markers[busNumber]);
    }

    if (locations) {
      for (const busNumber in locations) {
        const location = locations[busNumber].Location;
        const { latitude, longitude } = location;
        markers[busNumber] = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
        markers[busNumber].bindPopup(`Bus ${busNumber}`).openPopup();
      }
    }
  }
}
