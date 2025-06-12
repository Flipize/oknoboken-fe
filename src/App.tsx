import Menu from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe";
import Home from "./components/Home/Home";
import ContactMe from "./components/ContactMe/ContactMe";
import Gallery from "./components/Gallery/Gallery";
import "./App.css";
import NotFound from "./components/NotFound/NotFound";
import Order from "./components/Order/Order";
import { useEffect } from "react";

const ScrollDownToComponent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const target = document.getElementById("banner-end");

    if (isMobile && target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Banner />
      <div id="banner-end" />
      <Menu />
      <ScrollDownToComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<AboutMe />} />
        <Route path="contact" element={<ContactMe />} />
        <Route path="order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
