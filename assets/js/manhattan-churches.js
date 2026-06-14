/* Manhattan Church Services — data + map
 * Standalone page. Uses Leaflet (vendored in /assets/leaflet) and a CARTO
 * dark basemap so the map renders in the visitor's browser.
 *
 * Data: Manhattan church services the week of June 14–21, 2026 that explicitly
 * advertise a social / coffee-hour component (coffee hour, fellowship, a meal,
 * an ice cream social, a picnic, etc.). Each event carries its own start time
 * so the "Open now" filter can show only services currently in progress.
 *
 * All start times are New York local time (EDT, UTC−04:00 in June), encoded in
 * the ISO string so the open-now check is correct in any visitor's timezone.
 */

const CHURCHES = [
  {
    name: "Church of the Epiphany",
    tradition: "Roman Catholic",
    address: "239 E 21st St (22nd St & 2nd Ave), Gramercy",
    lat: 40.7371, lng: -73.9817,
    events: [
      {
        date: "Sun Jun 14", time: "7:30 PM",
        start: "2026-06-14T19:30:00-04:00", durationMin: 150,
        service: "Young Adults Mass",
        note: "After-Mass fellowship — coffee, donuts, light snacks, or pizza and beer.",
        links: [{ label: "fellowship", url: "https://www.epiphanychurch.nyc/fellowship-1" }]
      },
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sunday Mass",
        note: "After-Mass fellowship with coffee, donuts, light snacks, and other food.",
        links: [{ label: "fellowship", url: "https://www.epiphanychurch.nyc/fellowship-1" }]
      },
      {
        date: "Sun Jun 21", time: "7:30 PM",
        start: "2026-06-21T19:30:00-04:00", durationMin: 150,
        service: "Young Adults Mass",
        note: "After-Mass fellowship — pizza and beer.",
        links: [{ label: "fellowship", url: "https://www.epiphanychurch.nyc/fellowship-1" }]
      }
    ]
  },
  {
    name: "Christ Church NYC",
    tradition: "United Methodist",
    address: "524 Park Ave (E 60th St), Lenox Hill",
    lat: 40.7632, lng: -73.9700,
    events: [
      {
        date: "Wed Jun 17", time: "6:00 PM",
        start: "2026-06-17T18:00:00-04:00", durationMin: 150,
        service: "The Bridge: Wednesday Nights",
        note: "Light supper, communion service, and an ice cream social / activity after worship.",
        links: [{ label: "event", url: "https://www.christchurchnyc.online/events" }]
      },
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sunday Service",
        note: "Coffee Hour Fellowship after the 11:00 AM service every Sunday.",
        links: [{ label: "coffee hour", url: "https://www.christchurchnyc.online/coffee-hour-fellowship" }]
      }
    ]
  },
  {
    name: "St. Bartholomew's Church",
    tradition: "Episcopal",
    address: "325 Park Ave, Midtown East",
    lat: 40.7580, lng: -73.9730,
    events: [
      {
        date: "Thu Jun 18", time: "7:00 PM",
        start: "2026-06-18T19:00:00-04:00", durationMin: 150,
        service: "Imagine Worship NYC",
        note: "Food and conversation after worship, beginning around 8:00 PM.",
        links: [{ label: "event", url: "https://stbarts.org/worship/imagine-worship-nyc/" }]
      }
    ]
  },
  {
    name: "Christ Church NYC — Pride Picnic",
    tradition: "United Methodist",
    address: "Central Park, Sheep Meadow",
    lat: 40.7717, lng: -73.9756,
    events: [
      {
        date: "Sat Jun 20", time: "2:00 PM",
        start: "2026-06-20T14:00:00-04:00", durationMin: 240,
        service: "Pride Picnic",
        note: "Church social only; light food and drink provided.",
        links: [{ label: "event", url: "https://www.christchurchnyc.online/events" }]
      }
    ]
  },
  {
    name: "Grace Church",
    tradition: "Episcopal",
    address: "802 Broadway, Greenwich Village",
    lat: 40.7335, lng: -73.9924,
    events: [
      {
        date: "Sun Jun 21", time: "9:00 AM",
        start: "2026-06-21T09:00:00-04:00", durationMin: 120,
        service: "Holy Eucharist, Rite II",
        note: "Coffee hour and fellowship in Tuttle Hall after the service.",
        links: [{ label: "worship", url: "https://gracechurchnyc.org/worship/" }]
      },
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Holy Eucharist, Rite I",
        note: "Coffee hour and fellowship in Tuttle Hall after the service.",
        links: [{ label: "worship", url: "https://gracechurchnyc.org/worship/" }]
      }
    ]
  },
  {
    name: "Saint Thomas Church Fifth Avenue",
    tradition: "Episcopal",
    address: "1 W 53rd St, Midtown",
    lat: 40.7607, lng: -73.9748,
    events: [
      {
        date: "Sun Jun 21", time: "9:00 AM",
        start: "2026-06-21T09:00:00-04:00", durationMin: 120,
        service: "Rite II Sung Mass (Contemporary Language)",
        note: "Coffee hour after the 9:00 AM Sung Mass.",
        links: [{ label: "calendar", url: "https://www.saintthomaschurch.org/" }]
      },
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Festal Eucharist",
        note: "Coffee hour after the 11:00 AM Eucharist, listed at 12:30 PM.",
        links: [{ label: "calendar", url: "https://www.saintthomaschurch.org/" }]
      }
    ]
  },
  {
    name: "Brick Presbyterian Church",
    tradition: "Presbyterian (PCUSA)",
    address: "1140 Park Ave (E 91st St), Carnegie Hill",
    lat: 40.7841, lng: -73.9551,
    events: [
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sunday Worship",
        note: "Coffee hour after worship, listed at 12:15 PM.",
        links: [{ label: "calendar", url: "https://www.brickchurch.org/" }]
      }
    ]
  },
  {
    name: "Church of St. Ignatius Loyola",
    tradition: "Roman Catholic (Jesuit)",
    address: "980 Park Ave, Upper East Side",
    lat: 40.7762, lng: -73.9603,
    events: [
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "11:00 AM Mass",
        note: "Community Coffee Hour after the 11:00 AM Masses.",
        links: [{ label: "events", url: "https://ignatius.nyc/events/" }]
      }
    ]
  },
  {
    name: "Church of the Holy Trinity",
    tradition: "Episcopal",
    address: "316 E 88th St, Yorkville",
    lat: 40.7775, lng: -73.9510,
    events: [
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sung Eucharist",
        note: "Coffee hour after 11:00 AM worship in the fellowship hall.",
        links: [
          { label: "service", url: "https://www.holytrinity-nyc.org/upcoming" },
          { label: "FAQ", url: "https://www.holytrinity-nyc.org/faqs" }
        ]
      }
    ]
  },
  {
    name: "First Presbyterian Church",
    tradition: "Presbyterian (PCUSA)",
    address: "12 W 12th St, Greenwich Village",
    lat: 40.7355, lng: -73.9950,
    events: [
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sunday Worship",
        note: "Coffee fellowship directly following worship.",
        links: [
          { label: "worship", url: "https://fpcnyc.org/worship/sunday/" },
          { label: "coffee fellowship", url: "https://fpcnyc.org/events/" }
        ]
      }
    ]
  },
  {
    name: "Marble Collegiate Church",
    tradition: "Reformed (RCA)",
    address: "1 W 29th St, NoMad",
    lat: 40.7456, lng: -73.9880,
    events: [
      {
        date: "Sun Jun 21", time: "11:00 AM",
        start: "2026-06-21T11:00:00-04:00", durationMin: 120,
        service: "Sunday Worship",
        note: "Coffee hour after worship, listed at 12:15 PM.",
        links: [
          { label: "visitor info", url: "https://www.marblechurch.org/visitor-info" },
          { label: "calendar", url: "https://www.marblechurch.org/calendar" }
        ]
      }
    ]
  },
  {
    name: "All Souls NYC",
    tradition: "Unitarian Universalist",
    address: "1157 Lexington Ave (E 80th St), Upper East Side",
    lat: 40.7758, lng: -73.9584,
    events: [
      {
        date: "Sun Jun 21", time: "11:15 AM",
        start: "2026-06-21T11:15:00-04:00", durationMin: 120,
        service: "Sunday Worship Service",
        note: "Coffee Hour after the 11:15 AM service.",
        links: [{ label: "new to All Souls", url: "https://allsoulsnyc.org/new-to-all-souls/" }]
      }
    ]
  }
];

// An event is "upcoming" while it hasn't ended yet — i.e. the social/coffee
// window (start + durationMin) is still in the future. This keeps a service in
// the list while it's in progress and drops it only once it's fully over.
function eventIsUpcoming(ev, now) {
  const end = new Date(ev.start).getTime() + ev.durationMin * 60 * 1000;
  return now <= end;
}

function churchIsUpcoming(church, now) {
  return church.events.some(function (ev) { return eventIsUpcoming(ev, now); });
}

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
  const emptyEl = document.getElementById("empty-msg");
  const countEl = document.getElementById("church-count");
  const filterBtn = document.getElementById("open-filter");

  let upcomingOnly = false;

  // Build a record per church: its marker, sidebar button, and a closure to
  // refresh the open/closed visuals.
  const records = CHURCHES.map(function (c) {
    const eventsHtml = c.events
      .map(function (ev) {
        const linksHtml = ev.links
          .map(function (l) {
            return '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a>";
          })
          .join(" &middot; ");
        return (
          "<li>" +
          '<span class="ev-when">' + ev.date + " &middot; " + ev.time + "</span>" +
          '<span class="ev-service">' + ev.service + "</span>" +
          '<span class="ev-note">' + ev.note + "</span>" +
          '<span class="ev-links">' + linksHtml + "</span>" +
          "</li>"
        );
      })
      .join("");

    const popupHtml =
      '<div class="popup">' +
      '<h3>' + c.name + "</h3>" +
      '<div class="popup-tradition">' + c.tradition + "</div>" +
      '<div class="popup-addr">' + c.address + "</div>" +
      "<ul>" + eventsHtml + "</ul>" +
      "</div>";

    const marker = L.circleMarker([c.lat, c.lng], {
      radius: 7,
      color: "#ff5a7a",
      weight: 2,
      fillColor: "#ff5a7a",
      fillOpacity: 0.55
    });
    marker.bindPopup(popupHtml, { maxWidth: 300 });

    // Sidebar entry
    const item = document.createElement("button");
    item.className = "church-item";
    item.innerHTML =
      '<span class="church-name">' + c.name + "</span>" +
      '<span class="church-meta">' + c.tradition + " &middot; " + c.events.length +
      " service" + (c.events.length === 1 ? "" : "s") +
      '<span class="open-badge">UPCOMING</span></span>';
    item.addEventListener("click", function () {
      map.setView([c.lat, c.lng], 15, { animate: true });
      marker.openPopup();
      document.querySelectorAll(".church-item").forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
    });

    return { church: c, marker: marker, item: item };
  });

  // Apply the current filter: show/hide sidebar entries and markers, mark which
  // churches are open right now, and update the count.
  function render() {
    const now = Date.now();
    let visible = 0;
    let upcomingCount = 0;

    records.forEach(function (r) {
      const isUpcoming = churchIsUpcoming(r.church, now);
      if (isUpcoming) upcomingCount++;

      r.item.classList.toggle("is-open", isUpcoming);

      const show = !upcomingOnly || isUpcoming;
      r.item.style.display = show ? "" : "none";

      if (show) {
        visible++;
        if (!map.hasLayer(r.marker)) r.marker.addTo(map);
        r.marker.setStyle(
          isUpcoming
            ? { color: "#4ade80", fillColor: "#4ade80" }
            : { color: "#ff5a7a", fillColor: "#ff5a7a" }
        );
      } else if (map.hasLayer(r.marker)) {
        map.removeLayer(r.marker);
      }
    });

    countEl.textContent = upcomingOnly ? upcomingCount : records.length;
    filterBtn.classList.toggle("active", upcomingOnly);
    filterBtn.textContent = upcomingOnly
      ? "Showing upcoming (" + upcomingCount + ")"
      : "Upcoming only";
    emptyEl.style.display = upcomingOnly && visible === 0 ? "block" : "none";
  }

  filterBtn.addEventListener("click", function () {
    upcomingOnly = !upcomingOnly;
    render();
  });

  records.forEach(function (r) { listEl.appendChild(r.item); });

  const bounds = CHURCHES.map(function (c) { return [c.lat, c.lng]; });
  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  render();

  // Keep the open/closed state fresh as time passes.
  setInterval(render, 60 * 1000);
});
