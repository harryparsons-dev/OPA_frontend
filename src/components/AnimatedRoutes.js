import React from 'react'
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from '../Pages/Home';
import Gallery from '../Pages/Gallery';
import Projects from '../Pages/Projects'
import ProjectView from '../Pages/ProjectView';
import ImageSlider from './ImageSlider';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Slider from '../Pages/Slider';
import ImageSlider2 from './ImageSlider2';

import {AnimatePresence} from 'framer-motion';

function AnimatedRoutes(){
    const location = useLocation()
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
            <Route  exact path='/' element={<Home/>}></Route>
            <Route  path='/Gallery/:yearid' element={<Gallery/>}></Route>
            {/* <Route  path='/Projects/1' element={<ProjectView/>}></Route>   */}
            <Route  path='/Projects/:projectUID' element={<ProjectView/>}></Route>
            <Route  path='/Projects/view/:projectID/:id' element={<ImageSlider2/>}></Route>
            <Route  path='/Gallery/:yearid/view/:id' element={<ImageSlider/>}></Route>
            <Route  path='/About' element={<About/>}></Route>
            <Route  path='/Contact' element={<Contact/>}></Route>
            <Route  path='/img' element={<Slider/>}></Route>
        </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;