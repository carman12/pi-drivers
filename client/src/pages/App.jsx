import "../App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import CreateDriver from "./CreateDriver";
import Details from "./Detail";
import video  from  '../assets/Gran Premio de Sao Paulo 2022 _ Mejores momentos.mp4';

function App() {
  let location = useLocation();

  return (
    <>
      {location.pathname !== "/home" && <div className="bgvideo"><video className="video" src={video} autoPlay loop muted></video></div>}
      
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createDriver" element={<CreateDriver />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
