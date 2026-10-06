import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Booking.css";

const parkingLots = [
  {
    id: 1,
    name: "City Center Parking",
    location: "Near Central Mall",
    price: 30,
    available: 18,
  },
  {
    id: 2,
    name: "Railway Station Parking",
    location: "Near Railway Station",
    price: 40,
    available: 7,
  },
  {
    id: 3,
    name: "Metro Point Parking",
    location: "Near Metro Station",
    price: 25,
    available: 22,
  },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const parking = parkingLots.find(
    (item) => item.id === Number(id)
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const currentTime = new Date()
    .toTimeString()
    .slice(0, 5);

  const minimumTime =
    date === today ? currentTime : "00:00";

  if (!parking) {
    return (
      <div className="booking-page">
        <h1>Parking lot not found</h1>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    );
  }

  const totalPrice = parking.price * duration;

  return (
    <div className="booking-page">

      <div className="booking-card">

        <Link
          to={`/parking/${parking.id}`}
          className="back-link"
        >
          ← Back to Parking Details
        </Link>

        <div className="booking-header">

          <p className="booking-label">
            RESERVE YOUR SPOT
          </p>

          <h1>Book Parking</h1>

          <p>
            {parking.name}
          </p>

          <span>
            📍 {parking.location}
          </span>

        </div>

        {/* Parking Date */}

        <div className="form-group">

          <label>Parking Date</label>

          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrorMessage("");
            }}
          />

        </div>

        {/* Start Time */}

        <div className="form-group">

          <label>Start Time</label>

          <input
            type="time"
            min={minimumTime}
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setErrorMessage("");
            }}
          />

        </div>

        {/* Duration */}

        <div className="form-group">

          <label>Duration</label>

          <select
            value={duration}
            onChange={(e) =>
              setDuration(Number(e.target.value))
            }
          >
            <option value={1}>1 Hour</option>
            <option value={2}>2 Hours</option>
            <option value={3}>3 Hours</option>
            <option value={4}>4 Hours</option>
            <option value={5}>5 Hours</option>
            <option value={6}>6 Hours</option>
          </select>

        </div>

        {/* Price Summary */}

        <div className="price-summary">

          <div>
            <span>Parking rate</span>

            <strong>
              ₹{parking.price}/hr
            </strong>
          </div>

          <div>
            <span>Duration</span>

            <strong>
              {duration} hour
              {duration > 1 ? "s" : ""}
            </strong>
          </div>

          <div className="total-row">

            <span>Total</span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

        </div>

        {/* Error Card */}

        {errorMessage && (
          <div className="error-card">

            <div className="error-icon">
              ⚠️
            </div>

            <div className="error-content">

              <h3>
                Invalid Booking Time
              </h3>

              <p>
                {errorMessage}
              </p>

              <button
                className="error-ok-button"
                onClick={() =>
                  setErrorMessage("")
                }
              >
                OK
              </button>

            </div>

          </div>
        )}

        {/* Success Card */}

        {successMessage && (
          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <div className="success-content">

              <h3>
                Booking Successful!
              </h3>

              <p>
                {successMessage}
              </p>

              <span>
                Redirecting to the map...
              </span>

            </div>

          </div>
        )}

        {/* Confirm Button */}

        <button
          className="confirm-button"
          onClick={() => {

            if (!date || !time) {
              setErrorMessage(
                "Please select a parking date and time."
              );
              return;
            }

            const now = new Date();

            const selectedDateTime =
              new Date(`${date}T${time}`);

            if (selectedDateTime < now) {

              setErrorMessage(
                "The selected time has already passed. Please choose a future time."
              );

              return;
            }

            const existingBookings =
              JSON.parse(
                localStorage.getItem(
                  "parkingBookings"
                ) || "[]"
              );

            const availability =
              JSON.parse(
                localStorage.getItem(
                  "parkingAvailability"
                ) || "{}"
              );

            const currentAvailable =
              availability[parking.id] ??
              parking.available;

            if (currentAvailable <= 0) {

              setErrorMessage(
                "Sorry, this parking is currently full."
              );

              return;
            }

            availability[parking.id] =
              currentAvailable - 1;

            localStorage.setItem(
              "parkingAvailability",
              JSON.stringify(availability)
            );

            const newBooking = {
              id: Date.now(),
              parkingId: parking.id,
              parkingName: parking.name,
              date: date,
              time: time,
              duration: duration,
              total: totalPrice,
            };

            localStorage.setItem(
              "parkingBookings",
              JSON.stringify([
                ...existingBookings,
                newBooking,
              ])
            );

            setSuccessMessage(
              "Your parking spot has been booked successfully!"
            );

            setTimeout(() => {
              navigate("/map");
            }, 1500);

          }}
        >
          Confirm Booking
        </button>

      </div>

    </div>
  );
}

export default Booking;