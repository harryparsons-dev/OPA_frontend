import { React, useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./Styles/App.css";
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;


const App = () => {
  const [change, setChange] = useState("false");
  const [navbarOpen, setNavbarOpen] = useState(false);


  const [project, setProject] = useState();
  const [gallery, setGallery] = useState();

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${api}/api/catagories?sort=rank:asc`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProject(data.data[0].attributes.UID);
    }catch(error) {
      console.log(error);
    }

  };

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${api}/api/years?sort=rank:asc`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setGallery(data.data[0].attributes.year);
    }catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchGallery()
  }, []);

  const handleToggle = () => {
    setChange(!change);
    if (change) {
      handleClick();
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
            projectUrl={project}
            galleryUrl={gallery}
          />
        )}
      </div>
    </div>
  );
};

export default App;
