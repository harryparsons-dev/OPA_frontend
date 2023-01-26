import React, { useEffect, useState } from "react";
import '../Styles/Projects.css';
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
const API_URL = process.env.REACT_APP_APIURL + "/api/catagories";



function Projects() {

    const[categories,setcategories] = useState([]);
    
    const raw_data = async() =>{
        const response =await fetch(`${API_URL}`);
        const data = await response.json();
   
        setcategories(data.data);
        console.log(data.data);
    }


    useEffect(() => {
        raw_data();
        
    },[]);
   

    return(
        <>
        <motion.div className="project"
         initial={{opacity:0}}
         animate={{opacity:1}}
         exit={{opacity:0}}
         transition={{duration: 0.18}}
         >
            <h1>Projects</h1>
             <div className="projects">
                 {categories.map((category,id)  =>(
                <div className="cats" key={id}>
              
                       
                       <div className = "list-projects"><Link to={"/Projects/" + category.id}> [ {category.attributes.project_name} ]</Link></div>
            
              </div>
            ))}
        </div>
        </motion.div>
       
        </>
    );
}

export default Projects;