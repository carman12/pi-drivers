import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar/index";

function Navbar() {
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={Close} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f2/New_era_F1_logo.png"
              alt=""
              srcset=""
              style={{ width: "150px", height: "auto" }} // Cambia el tamaño ajustando el valor de width
            />
          </NavLink>
          <SearchBar />
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/home"
                className="nav-links"
                activeClassName="active"
                onClick={handleClick}
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/createDriver"
                className="nav-links"
                activeclassname="active"
                onClick={handleClick}
              >
                CREATE
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;