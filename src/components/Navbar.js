import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

function Navbar({ navbarOpen, setNavbarOpen, handleToggle }) {
  const [proj, setProj] = useState();
  const raw_data = async () => {
    const response = await fetch(`${api}/api/catagories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProj(data.data[0].attributes.UID);
  };
  useEffect(() => {
    try {
      raw_data();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <motion.ul
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <li>
        <Link
          to="/"
          onClick={() => {
            setNavbarOpen(false);
            handleToggle();
          }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/Gallery/2023"
          onClick={() => {
            setNavbarOpen(false);
            handleToggle();
          }}
        >
          Artwork
        </Link>
      </li>
      <li>
        <Link
          to={`/Projects/${proj}`}
          onClick={() => {
            setNavbarOpen(false);
            handleToggle();
          }}
        >
          Projects & Shows
        </Link>
      </li>
      <li>
        <Link
          to="/About"
          onClick={() => {
            setNavbarOpen(false);
            handleToggle();
          }}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="/Contact"
          onClick={() => {
            setNavbarOpen(false);
            handleToggle();
          }}
        >
          Contact
        </Link>
      </li>
    </motion.ul>
  );
}

export default Navbar;
