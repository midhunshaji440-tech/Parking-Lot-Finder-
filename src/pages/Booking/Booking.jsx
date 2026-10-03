import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Booking.css";
import { useNavigate } from "react-router-dom";

const parkingLots = [
  {
    id: 1,
    name: "City Center Parking",
    location: "Near Central Mall",
    price: 30,
  },
  {
    id: 2,
    name: "Railway Station Parking",
    location: "Near Railway Station",
    price: 40,
  },
  {
    id: 3,
    name: "Metro Point Parking",
    location: "Near Metro Station",
    price: 25,
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

        <div className="form-group">
          <label>Parking Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

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

        <button
          className="confirm-button"
       onClick={() => {
    if (!date || !time) {
       alert("Please select date and time.");
        return;
      }

     const existingBookings = JSON.parse(
    localStorage.getItem("parkingBookings") || "[]"
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

alert("Parking booked successfully!");
navigate("/my-bookings");
}}
        >
          Confirm Booking
        </button>

      </div>
    </div>
    
  );
}

export default Booking;