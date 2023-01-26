import React, { useState} from "react";

import Navbar from './components/Navbar';
import Main from './components/Main'
import {FaInstagram} from 'react-icons/fa'
import './Styles/App.css'





const App  = () => {


    const[change, setChange] = useState("false");

    const handleToggle = () => {
        setChange(!change);
    }

    const [navbarOpen, setNavbarOpen] = useState(false);


    return(

        <div className="App">



            <div className="content">
                <div className="title">

                            <div className={`${change ? "ham" : "change"}`} onClick={() => {handleToggle(); setNavbarOpen(!navbarOpen);}}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                             <div className="bar3"></div>
                        </div>
                        <div className="name">
                        Olivia Parsons
                        </div>


                       <a href="https://www.instagram.com/olivia_parsons_art/?hl=en-gb" target="_blank"  rel="noreferrer"><FaInstagram className="instagram"/> </a>



                    </div>
            <div className="nav">
                {navbarOpen ? <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} handleToggle={handleToggle}/> : null}

            </div>

               {!navbarOpen ? <Main/> : null}

            </div>
        </div>


    );
}

export default App;