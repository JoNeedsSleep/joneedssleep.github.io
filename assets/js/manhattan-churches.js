/* Manhattan Church Services — data + map
 * Standalone page. Uses Leaflet (loaded via CDN in the HTML) and
 * CARTO dark basemap tiles so the map renders in the visitor's browser.
 */

// Service times reflect a typical week (loosely the week of June 14–21, 2026).
// Coordinates are the churches' real-world locations in Manhattan.
const CHURCHES = [
  {
    name: "Abyssinian Baptist Church",
    tradition: "Baptist",
    address: "132 Odell Clark Pl (W 138th St), Harlem",
    lat: 40.8169, lng: -73.9416,
    services: ["Sun 9:00 AM — Worship", "Sun 11:30 AM — Worship"]
  },
  {
    name: "The Riverside Church",
    tradition: "Interdenominational",
    address: "490 Riverside Dr, Morningside Heights",
    lat: 40.8113, lng: -73.9626,
    services: ["Sun 10:45 AM — Worship"]
  },
  {
    name: "Cathedral of St. John the Divine",
    tradition: "Episcopal",
    address: "1047 Amsterdam Ave, Morningside Heights",
    lat: 40.8038, lng: -73.9620,
    services: ["Sun 8:00 AM — Holy Eucharist", "Sun 11:00 AM — Choral Eucharist", "Wed 12:15 PM — Eucharist"]
  },
  {
    name: "St. Michael's Church",
    tradition: "Episcopal",
    address: "225 W 99th St, Upper West Side",
    lat: 40.7965, lng: -73.9707,
    services: ["Sun 8:00 AM — Holy Eucharist", "Sun 10:00 AM — Choral Eucharist"]
  },
  {
    name: "Church of the City — Upper West Side",
    tradition: "Non-denominational",
    address: "Upper West Side",
    lat: 40.7883, lng: -73.9748,
    services: ["Sun 9:30 AM — Gathering", "Sun 11:30 AM — Gathering"]
  },
  {
    name: "Brick Presbyterian Church",
    tradition: "Presbyterian (PCUSA)",
    address: "62 E 92nd St, Carnegie Hill",
    lat: 40.7838, lng: -73.9555,
    services: ["Sun 11:00 AM — Worship"]
  },
  {
    name: "Church of the Holy Trinity",
    tradition: "Episcopal",
    address: "316 E 88th St, Yorkville",
    lat: 40.7775, lng: -73.9510,
    services: ["Sun 9:00 AM — Said Eucharist", "Sun 11:00 AM — Choral Eucharist"]
  },
  {
    name: "Church of St. Ignatius Loyola",
    tradition: "Roman Catholic",
    address: "980 Park Ave, Upper East Side",
    lat: 40.7762, lng: -73.9603,
    services: ["Sun 7:30, 9:30, 11:00 AM — Mass", "Sun 7:30 PM — Mass", "Daily 8:30 AM — Mass"]
  },
  {
    name: "Church of the City — Upper East Side",
    tradition: "Non-denominational",
    address: "Upper East Side",
    lat: 40.7726, lng: -73.9552,
    services: ["Sun 10:00 AM — Gathering", "Sun 5:00 PM — Gathering"]
  },
  {
    name: "St. Vincent Ferrer",
    tradition: "Roman Catholic (Dominican)",
    address: "869 Lexington Ave, Lenox Hill",
    lat: 40.7680, lng: -73.9659,
    services: ["Sun 8:00, 10:00 AM, 12:00 PM — Mass", "Daily 8:00 AM, 12:10 PM — Mass"]
  },
  {
    name: "Fifth Avenue Presbyterian Church",
    tradition: "Presbyterian (PCUSA)",
    address: "7 W 55th St, Midtown",
    lat: 40.7619, lng: -73.9745,
    services: ["Sun 11:00 AM — Worship", "Sun 4:00 PM — Evening Worship"]
  },
  {
    name: "St. Malachy's — The Actors' Chapel",
    tradition: "Roman Catholic",
    address: "239 W 49th St, Theater District",
    lat: 40.7610, lng: -73.9856,
    services: ["Sun 9:30, 11:00 AM — Mass", "Sun 5:00 PM — Theatre District Mass"]
  },
  {
    name: "St. Thomas Church Fifth Avenue",
    tradition: "Episcopal",
    address: "1 W 53rd St, Midtown",
    lat: 40.7607, lng: -73.9748,
    services: ["Sun 8:00 AM — Holy Eucharist", "Sun 11:00 AM — Choral Eucharist", "Sun 4:00 PM — Evensong"]
  },
  {
    name: "St. Patrick's Cathedral",
    tradition: "Roman Catholic",
    address: "5th Ave at 50th St, Midtown",
    lat: 40.7585, lng: -73.9761,
    services: ["Sun 7:00, 8:00, 9:00, 10:15 AM, 12:00, 1:00, 4:00, 5:30 PM — Mass", "Daily 7:00 AM–5:30 PM — Mass"]
  },
  {
    name: "Saint Peter's Church",
    tradition: "Lutheran (ELCA)",
    address: "619 Lexington Ave, Midtown East",
    lat: 40.7582, lng: -73.9710,
    services: ["Sun 11:00 AM — Worship", "Sun 5:00 PM — Jazz Vespers"]
  },
  {
    name: "St. Bartholomew's Church",
    tradition: "Episcopal",
    address: "325 Park Ave, Midtown East",
    lat: 40.7580, lng: -73.9730,
    services: ["Sun 8:00 AM — Holy Eucharist", "Sun 11:00 AM — Choral Eucharist"]
  },
  {
    name: "Hope Midtown",
    tradition: "Non-denominational",
    address: "Midtown",
    lat: 40.7549, lng: -73.9847,
    services: ["Sun 10:00 AM — Gathering", "Sun 12:00 PM — Gathering"]
  },
  {
    name: "Metropolitan Community Church of New York",
    tradition: "Ecumenical / LGBTQ+",
    address: "446 W 36th St, Hudson Yards",
    lat: 40.7545, lng: -73.9949,
    services: ["Sun 10:00 AM — Worship"]
  },
  {
    name: "Marble Collegiate Church",
    tradition: "Reformed (RCA)",
    address: "1 W 29th St, NoMad",
    lat: 40.7456, lng: -73.9880,
    services: ["Sun 11:00 AM — Worship"]
  },
  {
    name: "Calvary Church",
    tradition: "Episcopal",
    address: "277 Park Ave S, Gramercy",
    lat: 40.7380, lng: -73.9865,
    services: ["Sun 9:00 AM — Holy Eucharist", "Sun 11:00 AM — Choral Eucharist"]
  },
  {
    name: "Church of St. Francis Xavier",
    tradition: "Roman Catholic (Jesuit)",
    address: "55 W 16th St, Chelsea",
    lat: 40.7378, lng: -73.9950,
    services: ["Sun 9:00, 11:30 AM — Mass", "Sun 5:00 PM — Mass"]
  },
  {
    name: "Redeemer Downtown",
    tradition: "Presbyterian (PCA)",
    address: "W 16th St, Chelsea",
    lat: 40.7372, lng: -73.9930,
    services: ["Sun 10:30 AM — Worship", "Sun 5:00 PM — Worship"]
  },
  {
    name: "First Presbyterian Church",
    tradition: "Presbyterian (PCUSA)",
    address: "12 W 12th St, Greenwich Village",
    lat: 40.7355, lng: -73.9950,
    services: ["Sun 11:00 AM — Worship"]
  },
  {
    name: "Church of the Ascension",
    tradition: "Episcopal",
    address: "12 W 11th St (5th Ave), Greenwich Village",
    lat: 40.7345, lng: -73.9944,
    services: ["Sun 9:00 AM — Said Eucharist", "Sun 11:00 AM — Choral Eucharist"]
  },
  {
    name: "Grace Church",
    tradition: "Episcopal",
    address: "802 Broadway, Greenwich Village",
    lat: 40.7335, lng: -73.9924,
    services: ["Sun 9:00, 11:00 AM — Holy Eucharist", "Sun 6:00 PM — Evening Eucharist"]
  },
  {
    name: "Church of the City — Downtown",
    tradition: "Non-denominational",
    address: "Greenwich Village",
    lat: 40.7332, lng: -73.9905,
    services: ["Sun 9:30, 11:30 AM — Gathering", "Sun 5:00 PM — Gathering"]
  },
  {
    name: "Church of St. Joseph in Greenwich Village",
    tradition: "Roman Catholic",
    address: "371 Sixth Ave, Greenwich Village",
    lat: 40.7325, lng: -74.0009,
    services: ["Sun 9:30, 11:30 AM — Mass", "Sat 5:00 PM — Vigil Mass"]
  },
  {
    name: "Judson Memorial Church",
    tradition: "Baptist / UCC",
    address: "55 Washington Sq S, Greenwich Village",
    lat: 40.7303, lng: -73.9985,
    services: ["Sun 11:00 AM — Worship"]
  },
  {
    name: "Middle Collegiate Church",
    tradition: "Reformed (RCA)",
    address: "112 Second Ave, East Village",
    lat: 40.7280, lng: -73.9880,
    services: ["Sun 11:30 AM — Worship (online & in person)"]
  },
  {
    name: "Trinity Church Wall Street",
    tradition: "Episcopal",
    address: "89 Broadway, Financial District",
    lat: 40.7081, lng: -74.0122,
    services: ["Sun 9:00 AM — Holy Eucharist", "Sun 11:15 AM — Choral Eucharist", "Daily 12:05 PM — Eucharist"]
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map", {
    center: [40.764, -73.974],
    zoom: 12,
    zoomControl: true,
    scrollWheelZoom: true
  });

  // CARTO dark basemap — matches the page's dark theme. Falls back gracefully
  // because Leaflet retries subdomains a–d.
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      subdomains: "abcd",
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  ).addTo(map);

  const listEl = document.getElementById("church-list");
  const markers = [];
  const bounds = [];

  CHURCHES.forEach(function (c, i) {
    const servicesHtml = c.services
      .map(function (s) { return "<li>" + s + "</li>"; })
      .join("");

    const popupHtml =
      '<div class="popup">' +
      '<h3>' + c.name + "</h3>" +
      '<div class="popup-tradition">' + c.tradition + "</div>" +
      '<div class="popup-addr">' + c.address + "</div>" +
      "<ul>" + servicesHtml + "</ul>" +
      "</div>";

    const marker = L.circleMarker([c.lat, c.lng], {
      radius: 7,
      color: "#ff5a7a",
      weight: 2,
      fillColor: "#ff5a7a",
      fillOpacity: 0.55
    }).addTo(map);

    marker.bindPopup(popupHtml, { maxWidth: 280 });
    markers.push(marker);
    bounds.push([c.lat, c.lng]);

    // Sidebar entry
    const item = document.createElement("button");
    item.className = "church-item";
    item.innerHTML =
      '<span class="church-name">' + c.name + "</span>" +
      '<span class="church-meta">' + c.tradition + " &middot; " + c.services.length +
      " service" + (c.services.length === 1 ? "" : "s") + "</span>";
    item.addEventListener("click", function () {
      map.setView([c.lat, c.lng], 15, { animate: true });
      marker.openPopup();
      document.querySelectorAll(".church-item").forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
    });
    listEl.appendChild(item);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  document.getElementById("church-count").textContent = CHURCHES.length;
});
