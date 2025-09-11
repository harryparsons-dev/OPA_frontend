import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Gallery from "../Pages/Gallery";
import Home from "../Pages/Home";
import ProjectView from "../Pages/ProjectView";
import ImageSlider from "./ImageSlider";
import ImageSlider2 from "./ImageSlider2";
import AvailableArtwork from "../Pages/AvailableArtwork";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path="*" element={<Home />}></Route>
          <Route path="/gallery/:yearid" element={<Gallery />}></Route>
          <Route path="/projects/:projectUID" element={<ProjectView />}></Route>
          <Route
            path="/projects/view/:projectID/:id"
            element={<ImageSlider2 />}
          ></Route>
          <Route
            path="/gallery/:yearid/view/:id"
            element={<ImageSlider />}
          ></Route>
          <Route path="/available-artwork" element={<AvailableArtwork />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
