document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the exact 12-day itinerary
  const routeStops = [
    {
      day: "Days 1 – 4",
      title: "Sigiriya",
      coords: [7.9570, 80.7603],
      desc: "Airport pick-up and transfer to Sigiriya. Hiriwadunna village experience, Polonnaruwa Ancient City, Sigiriya Lion Rock, Ayurvedic massage, Dambulla Cave Temple and a cultural dance show."
    },
    {
      day: "Day 5",
      title: "Kandy",
      coords: [7.2906, 80.6337],
      desc: "Matale Spice Garden, Temple of the Sacred Tooth Relic and a relaxing walk around Kandy Lake."
    },
    {
      day: "Day 6",
      title: "Nuwara Eliya",
      coords: [6.9497, 80.7891],
      desc: "Scenic drive via a tea plantation, tea factory and Ramboda Falls."
    },
    {
      day: "Days 7 – 8",
      title: "Ella",
      coords: [6.8667, 81.0467],
      desc: "Scenic train journey from Nanu Oya to Ella, then Nine Arch Bridge and Little Adam's Peak."
    },
    {
      day: "Day 9",
      title: "Yala",
      coords: [6.3117, 81.3433],
      desc: "Travel from Ella via Ravana Falls to Yala, followed by an afternoon wildlife safari in Yala National Park."
    },
    {
      day: "Days 10 – 11",
      title: "Hikkaduwa & Galle",
      coords: [6.1395, 80.1063],
      desc: "Beach and pool relaxation, Madu River boat safari, sea turtle hatchery and an evening at Galle Fort."
    },
    {
      day: "Day 12",
      title: "Airport Departure",
      coords: [7.1808, 79.8841],
      desc: "After breakfast, check out and transfer to Bandaranaike International Airport for your departure flight."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});