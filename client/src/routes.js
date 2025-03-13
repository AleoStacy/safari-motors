import App from "./App";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Booking from "./Pages/Booking";
import Contacts from "./Pages/Contacts";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Reviews from "./components/ReviewSection";
import Safari from "./Pages/Safari";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ReviewSection from "./components/ReviewSection";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/home", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/safari", element: <Safari /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/reviewsection", element: <ReviewSection /> },
    ],
  },
];

export default routes;
