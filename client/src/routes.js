import App from "./App"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Booking from "./Pages/Booking";
import Contacts from "./Pages/Contacts";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";




const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {path:"/", element:<LandingPage/>}, 
        {path:"/home", element:<Home/>},
        {path:"/booking", element:<Booking/>},
        {path:"/contacts", element:<Contacts/>},
        {path:"/gallery", element:<Gallery/>},
        {path:"/reviews", element:<Reviews/>},
        
      ],
    
    },

]

export default routes;