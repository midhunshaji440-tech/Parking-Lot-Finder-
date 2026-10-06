import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";
import { Link } from "react-router-dom";

const parkingLots = [
  {
    id: 1,
    name: "City Center Parking",
    location: "Near Central Mall",
    price: 30,
    available: 18,
    position: [10.0159, 76.3419],
  },
  {
    id: 2,
    name: "Railway Station Parking",
    location: "Near Railway Station",
    price: 40,
    available: 7,
    position: [10.0055, 76.3634],
  },
  {
    id: 3,
    name: "Metro Point Parking",
    location: "Near Metro Station",
    price: 25,
    available: 22,
    position: [10.0261, 76.3125],
  },
];

function Map() {

  const availability =
    JSON.parse(localStorage.getItem("parkingAvailability")) || {};

  return (
    <div className="map-page">

      <div className="map-header">
        <h1>Find Parking Near You</h1>

        <p>
          Explore nearby parking locations on the map.
        </p>
      </div>

      <MapContainer
        center={[10.0159, 76.3419]}
        zoom={13}
        scrollWheelZoom={true}
        className="parking-map"
      >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />

        {parkingLots.map((parking) => (
          <Marker
            key={parking.id}
            position={parking.position}
          >
            <Popup>

              <div className="popup-content">

                <h3>{parking.name}</h3>

                <p>
                  📍 {parking.location}
                </p>

                <p>
                  💰 ₹{parking.price}/hour
                </p>


   <p>
  🅿️ {
    availability[parking.id] ?? parking.available
  } spots available
     </p> 

             <Link
             to={`/parking/${parking.id}`}
              className="popup-details-button">
                      View Details
                 </Link>

              </div>

            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}

export default Map;