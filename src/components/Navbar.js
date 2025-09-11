import {AnimatePresence, motion} from "framer-motion";
import { React, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../Styles/Navbar.css";


function Navbar({ navbarOpen, setNavbarOpen, handleToggle, galleryUrl, projectUrl }) {
    const navigate = useNavigate();

    const handleLinkClick = (url) => {
        navigate(url);
        setTimeout(() => {
            setNavbarOpen(false);
            handleToggle();
        }, 200);
    };

    useEffect(() => {
        document.body.style.overflow = navbarOpen ? "hidden" : "unset";
    }, [navbarOpen]);

    return (
      <>

      {navbarOpen && (

          <motion.ul
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
              <li>
                  <Link
                      to="/"
                      onClick={(e) => {
                          e.preventDefault(); // Prevent default navigation
                          handleLinkClick("/");
                      }}
                  >
                      Home
                  </Link>
              </li>
              <li>
                  <Link
                      to={`/gallery/${galleryUrl}`}
                      onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(`/gallery/${galleryUrl}`);
                      }}
                  >
                      Gallery
                  </Link>
              </li>
              <li>
                  <Link
                      to={`/projects/${projectUrl}`}
                      onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(`/projects/${projectUrl}`);
                      }}
                  >
                      Projects & Exhibitions
                  </Link>
              </li>
              <li>
                  <Link
                      to={"/available-artwork"}
                      onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick("/available-artwork");
                      }}
                  >
                      Available Artwork
                  </Link>
              </li>
              <li>
                  <Link
                      to="/about"
                      onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick("/about");
                      }}
                  >
                      About
                  </Link>
              </li>
              <li>
                  <Link
                      to="/contact"
                      onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick("/contact");
                      }}
                  >
                      Contact
                  </Link>
              </li>

          </motion.ul>
  )}
      </>
  );
}

export default Navbar;
