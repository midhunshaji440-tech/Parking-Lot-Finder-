import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import FilterBar from "../../components/FilterBar/FilterBar";

const parkingLots = [
  {
    id: 1,
    name: "City Center Parking",
    location: "Near Central Mall",
    price: 30,
    available: 18,
    total: 50,
    distance: 0.5,
  },
  {
    id: 2,
    name: "Railway Station Parking",
    location: "Near Railway Station",
    price: 40,
    available: 7,
    total: 30,
    distance: 1.2,
  },
  {
    id: 3,
    name: "Metro Point Parking",
    location: "Near Metro Station",
    price: 25,
    available: 22,
    total: 40,
    distance: 1.8,
  },
];

function Home() {
  const availability = JSON.parse(
    localStorage.getItem("parkingAvailability") || "{}"
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Location request timed out.");
        } else {
          setLocationError("Unable to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Search + filter
  const filteredParking = parkingLots
    .filter((parking) => {
      const searchText =
        `${parking.name} ${parking.location}`.toLowerCase();

      return searchText.includes(search.toLowerCase());
    })

    .filter((parking) => {
      if (filter === "available") {
        return (
          availability[parking.id] ?? parking.available
        ) > 0;
      }

      if (filter === "price") {
        return parking.price <= 30;
      }

      return true;
    })

    .sort((a, b) => {
      if (filter === "nearest") {
        return a.distance - b.distance;
      }

      return 0;
    });

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">

          <p className="hero-small-text">
            🚗 SMART PARKING FINDER
          </p>

          <h1>
            Find a parking spot
            <br />
            <span>before you arrive.</span>
          </h1>

          <p className="hero-description">
            Find available parking spaces near your destination,
            compare prices and book your spot easily.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search area, landmark or parking..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>
              Search
            </button>
          </div>

          {/* CURRENT LOCATION */}
          <div className="location-container">

            <button
              className="location-button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
            >
              {locationLoading
                ? "📍 Getting Location..."
                : "📍 Use My Location"}
            </button>

            {location && (
              <p className="location-success">
                📍 Location detected successfully
              </p>
            )}

            {locationError && (
              <p className="location-error">
                {locationError}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* PARKING SECTION */}
      <section className="parking-section">

        <div className="section-header">

          <div>
            <p className="section-label">
              PARKING NEAR YOU
            </p>

            <h2>
              Available Parking Lots
            </h2>
          </div>

          <Link
            to="/map"
            className="map-button"
          >
            🗺️ View Map
          </Link>

        </div>

        {/* FILTER BAR */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />

        {/* PARKING CARDS */}
        <div className="parking-grid">

          {filteredParking.length > 0 ? (

            filteredParking.map((parking) => (

              <div
                className="parking-card"
                key={parking.id}
              >

                <div className="parking-card-top">

                  <div>
                    <h3>{parking.name}</h3>

                    <p>
                      📍 {parking.location}
                    </p>
                  </div>

                  <span className="status-badge">
                    {availability[parking.id] ??
                      parking.available} spots
                  </span>

                </div>

                <div className="parking-info">

                  <div>
                    <small>Price</small>

                    <strong>
                      ₹{parking.price}/hr
                    </strong>
                  </div>

                  <div>
                    <small>Distance</small>

                    <strong>
                      {parking.distance} km
                    </strong>
                  </div>

                  <div>
                    <small>Capacity</small>

                    <strong>
                      {availability[parking.id] ??
                        parking.available}
                      /{parking.total}
                    </strong>
                  </div>

                </div>

                <Link
                  to={`/parking/${parking.id}`}
                  className="details-button"
                >
                  View Details
                </Link>

              </div>

            ))

          ) : (

            <div className="no-results">

              <h3>
                No parking found
              </h3>

              <p>
                Try another area or filter.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Home;