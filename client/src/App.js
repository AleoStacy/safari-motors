import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Booking from "./Pages/Booking";
import Contacts from "./Pages/Contacts";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";
function App() {
  return (
   <>
   <header>
    <Navbar/>
   </header>
   <Outlet/>
   </>
  );
}
export default App;