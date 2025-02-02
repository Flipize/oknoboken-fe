import { useState } from "react";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import Menu from "./components/Menu/Menu";
import Banner from "./components/Banner/Banner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe";
import Home from "./components/Home/Home";
import ContactMe from "./components/ContactMe/ContactMe";
import Gallery from "./components/Gallery/Gallery";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <Router>
      <Banner />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-me" element={<AboutMe />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<ContactMe />} />
      </Routes>
    </Router>
  );
}

export default App;
