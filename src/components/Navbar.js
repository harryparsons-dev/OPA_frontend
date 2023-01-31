import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
const api = process.env.REACT_APP_APIURL;

const PROJ = gql`
  query getPosts {
    catagories {
      data {
        attributes {
          UID
        }
      }
    }
  }
`;

function Navbar({ navbarOpen, setNavbarOpen, handleToggle, project }) {
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
          to={`/Projects/${project}`}
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
