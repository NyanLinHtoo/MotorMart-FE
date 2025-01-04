import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../components/errorPages/ErrorPage";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetail from "../pages/CarDetail";
import ContactUs from "../pages/ContactUs";
import Booking from "../pages/Booking";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Profile from "../pages/Profile";
import Brands from "../pages/Brands";
import ProtectedRoute from "../ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:id?" element={<Booking />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
