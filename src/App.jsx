import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import ParkingDetails from "./pages/ParkingDetails/ParkingDetails";
import Booking from "./pages/Booking/Booking";
import Navbar from "./components/Navbar/Navbar";
import MyBookings from "./pages/MyBookings/MyBookings";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/parking/:id"
          element={<ParkingDetails />}
        />
        <Route
          path="/booking/:id"
          element={<Booking />}
        />
        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;