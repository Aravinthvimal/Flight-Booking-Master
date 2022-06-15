import React, { useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import appCss from "./App.module.css";
import Homepage from "./pages/homepage/Homepage";
import Booking from "./pages/booking/BookTicket";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import ListBooking from "./pages/booking/ListBookings";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className={appCss.container}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list-bookings" element={<ListBooking />} />
      </Routes>
    </div>
  );
};

export default App;
