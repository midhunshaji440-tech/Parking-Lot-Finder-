import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

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

  const availability =
    JSON.parse(localStorage.getItem("parkingAvailability") || "{}");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredParking = parkingLots



  
    .filter((parking) => {
      const searchText =
        `${parking.name} ${parking.location}`.toLowerCase();

      return searchText.includes(search.toLowerCase());
    })
    .filter((parking) => {
      if (filter === "available") {
  return (availability[parking.id] ?? parking.available) > 0;
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

        </div>
      </section>

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

       <Link to="/map" className="map-button">
      🗺️ View Map
      </Link>
        </div>

        <div className="filter-buttons">

          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "available" ? "active-filter" : ""}
            onClick={() => setFilter("available")}
          >
            Available
          </button>

          <button
            className={filter === "price" ? "active-filter" : ""}
            onClick={() => setFilter("price")}
          >
            Under ₹30
          </button>

          <button
            className={filter === "nearest" ? "active-filter" : ""}
            onClick={() => setFilter("nearest")}
          >
            Nearest
          </button>

        </div>
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
             {availability[parking.id] ?? parking.available} spots
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
                     {availability[parking.id] ?? parking.available}/{parking.total}
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
              <h3>No parking found</h3>

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