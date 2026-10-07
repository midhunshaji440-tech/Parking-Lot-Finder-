import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import ParkingDetails from "./pages/ParkingDetails/ParkingDetails";
import Booking from "./pages/Booking/Booking";
import Navbar from "./components/Navbar/Navbar";
import MyBookings from "./pages/MyBookings/MyBookings";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Sign In - First Page */}
        <Route path="/" element={<SignIn />} />

        {/* Authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main Website */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/map"
          element={
            <>
              <Navbar />
              <Map />
            </>
          }
        />

        <Route
          path="/parking/:id"
          element={
            <>
              <Navbar />
              <ParkingDetails />
            </>
          }
        />

        <Route
          path="/booking/:id"
          element={
            <>
              <Navbar />
              <Booking />
            </>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <>
              <Navbar />
              <MyBookings />
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;