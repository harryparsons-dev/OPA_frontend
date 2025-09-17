import { React, useEffect,  } from "react";
import {Link} from "react-router-dom";
import "../Styles/Navbar.css";


function Navbar({ navbarOpen, galleryUrl, projectUrl }) {

    useEffect(() => {
        document.body.style.overflow = navbarOpen ? "hidden" : "unset";
    }, [navbarOpen]);

    return (
        <div className={`navbar ${navbarOpen ? "navbar-open":  "navbar-closed" }`}>
              <li>
                  <Link
                      to="/">
                      Home
                  </Link>
              </li>
              <li>
                  <Link
                      to={`/gallery/${galleryUrl}`}>
                      Gallery
                  </Link>
              </li>
              <li>
                  <Link
                      to={`/projects/${projectUrl}`}
                  >
                      Projects & Exhibitions
                  </Link>
              </li>
              <li>
                  <Link
                      to={"/available-artwork"}
                  >
                      Available Artwork
                  </Link>
              </li>
              <li>
                  <Link
                      to="/about"

                  >
                      About
                  </Link>
              </li>
              <li>
                  <Link
                      to="/contact"

                  >
                      Contact
                  </Link>
              </li>

          </div>
  );
}

export default Navbar;
