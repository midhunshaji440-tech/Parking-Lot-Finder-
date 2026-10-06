import { Link } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  const bookings = JSON.parse(
    localStorage.getItem("parkingBookings") || "[]"
  );

  return (
    <div className="bookings-page">

      <div className="bookings-container">

        <div className="bookings-header">
          <p>BOOKING HISTORY</p>
          <h1>My Bookings</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-bookings">

            <div className="empty-icon">
              🅿️
            </div>

            <h2>No bookings yet</h2>

            <p>
              Your confirmed parking bookings
              will appear here.
            </p>

            <Link to="/" className="find-parking-button">
              Find Parking
            </Link>

          </div>
        ) : (
          <div className="booking-list">

            {bookings.map((booking) => (
              <div
                className="booking-item"
                key={booking.id}
              >

                <div>
                  <span className="booking-status">
                    CONFIRMED
                  </span>

                  <h2>
                    {booking.parkingName}
                  </h2>

                  <p>
                    📅 {booking.date}
                  </p>

                  <p>
                    🕐 {booking.time}
                  </p>

                  <p>
                    ⏱️ {booking.duration} hour
                    {booking.duration > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="booking-price">
  <small>Total</small>

  <strong>
    ₹{booking.total}
  </strong>

  <button
    className="cancel-button"
    onClick={() => {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );

      if (!confirmCancel) {
        return;
      }
      
      const updatedBookings = bookings.filter(
        (item) => item.id !== booking.id
      );

      localStorage.setItem(
        "parkingBookings",
        JSON.stringify(updatedBookings)
      );

      const availability = JSON.parse(
        localStorage.getItem("parkingAvailability") || "{}"
      );

      availability[booking.parkingId] =
        (availability[booking.parkingId] ?? 0) + 1;

      localStorage.setItem(
        "parkingAvailability",
        JSON.stringify(availability)
      );

      window.location.reload();
    }}
  >
    Cancel Booking
  </button>
</div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyBookings;