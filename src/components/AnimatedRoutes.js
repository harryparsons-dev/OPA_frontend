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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="*" element={<Home />}></Route>
          <Route path="/Gallery/:yearid" element={<Gallery />}></Route>
          <Route path="/Projects/:projectUID" element={<ProjectView />}></Route>
          <Route
            path="/Projects/view/:projectID/:id"
            element={<ImageSlider2 />}
          ></Route>
          <Route
            path="/Gallery/:yearid/view/:id"
            element={<ImageSlider />}
          ></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
