import { Link, useParams } from "react-router-dom";
import "./ParkingDetails.css";

const parkingLots = [
  {
    id: 1,
    name: "City Center Parking",
    location: "Near Central Mall",
    price: 30,
    available: 18,
    total: 50,
    distance: 0.5,
    amenities: ["CCTV", "24/7", "Security", "EV Charging"],
  },
  {
    id: 2,
    name: "Railway Station Parking",
    location: "Near Railway Station",
    price: 40,
    available: 7,
    total: 30,
    distance: 1.2,
    amenities: ["CCTV", "Security", "Covered Parking"],
  },
  {
    id: 3,
    name: "Metro Point Parking",
    location: "Near Metro Station",
    price: 25,
    available: 22,
    total: 40,
    distance: 1.8,
    amenities: ["CCTV", "24/7", "EV Charging"],
  },
];

function ParkingDetails() {
  const { id } = useParams();

  const parking = parkingLots.find(
    (item) => item.id === Number(id)
  );

  if (!parking) {
    return (
      <div className="details-page">
        <h1>Parking lot not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="details-header">
          <div>
            <p className="details-label">
              PARKING DETAILS
            </p>

            <h1>{parking.name}</h1>

            <p className="location">
              📍 {parking.location}
            </p>
          </div>

          <span className="available-badge">
            {parking.available} spots available
          </span>
        </div>

        <div className="details-info">

          <div>
            <small>Price</small>
            <strong>₹{parking.price}/hr</strong>
          </div>

          <div>
            <small>Distance</small>
            <strong>{parking.distance} km</strong>
          </div>

          <div>
            <small>Capacity</small>
            <strong>
              {parking.available}/{parking.total}
            </strong>
          </div>

        </div>

        <div className="amenities">
          <h2>Amenities</h2>

          <div className="amenity-list">
            {parking.amenities.map((amenity) => (
              <span key={amenity}>
                ✓ {amenity}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/booking/${parking.id}`}
          className="book-button"
        >
          Book This Parking
        </Link>

      </div>
    </div>
  );
}

export default ParkingDetails;