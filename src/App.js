import { React, useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./Styles/App.css";

const App = () => {
  const [change, setChange] = useState("false");
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setChange(!change);
    if (change) {
      handleClick();
    }
  };

  const handleScrollPosition = () => {
    const scrollPos = sessionStorage.getItem("scrollPosition");
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
      sessionStorage.removeItem("scrollPosition");
    }
  };
  const handleClick = (e) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  };

  return (
    <div className="App">
      <div className="content">
        <div className="title">
          <div
            className={`${change ? "ham" : "change"}`}
            onClick={() => {
              handleToggle();
              setNavbarOpen(!navbarOpen);
            }}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className="name">Olivia Parsons</div>

          <a
            href="https://www.instagram.com/olivia_parsons_art/?hl=en-gb"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="instagram" />{" "}
          </a>
        </div>

        {!navbarOpen ? (
          <Main />
        ) : (
          <Navbar
            navbarOpen={navbarOpen}
            setNavbarOpen={setNavbarOpen}
            handleToggle={handleToggle}
          />
        )}
      </div>
    </div>
  );
};

export default App;
