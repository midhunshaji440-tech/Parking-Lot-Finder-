import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          🅿️ ParkFinder
        </Link>

        <div className="navbar-links">
         <Link to="/home">Home</Link>
          <Link to="/map">Map</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;