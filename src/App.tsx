import Navbar from "./components/Navbar/Navbar"; // ✅ updated name
import Banner from "./components/Banner/Banner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe";
import Home from "./components/Home/Home";
import ContactMe from "./components/ContactMe/ContactMe";
import Gallery from "./components/Gallery/Gallery";
import "./App.css";
import NotFound from "./components/NotFound/NotFound";
import Order from "./components/Order/Order";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Banner />
        <div id="banner-end" />
        <Navbar /> {/* ✅ renamed */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<AboutMe />} />
            <Route path="contact" element={<ContactMe />} />
            <Route path="order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
