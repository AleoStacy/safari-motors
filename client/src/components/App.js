import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import LandingPage from "./Pages/LandingPage";
import Booking from "./Pages/Booking";
import Contacts from "./Pages/Contacts";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/booking" component={Booking} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/home" component={Home} />
        <Route path="/reviews" component={Reviews} />
      </Switch>
    </Router>
  );
}

export default App;
