import React, { useState, useEffect }  from "react";
import {motion} from 'framer-motion'
import { useQuery, gql } from '@apollo/client';
import '../Styles/home.css';
const api = process.env.REACT_APP_APIURL;

const PROPS = gql`
query getHome{
    homepages{
      data{
        attributes{
          image{
            data{
            attributes{
              url
            }
            }
          }
        }
      }
    }
  }
`
function getImages(data) {
    var images = [];
    data.map((props,id) => (
        images[id] =  props.attributes.image.data.attributes.url

    ));
    return images;
}



function Home() {
    const [props, setProps] = useState([]);
    const [current,setCurrent] = useState(1);


    const raw_data = async() =>{
        const response =await fetch(`${api + '/api/homepages?populate=*'}`);
        const data = await response.json();

        setProps(data.data);
        console.log(data.data);
    }



    useEffect(() => {
        raw_data();
    },[]);

     var images = getImages(props);
    console.log(images.length +  "length");

    useEffect(() => {
        const interval = setInterval(() => {
        if(current === images.length-1){
            setCurrent(0);
        }
        else{

            setCurrent(current+1);

        }
        }, 4000);
        return () => clearInterval(interval);
      }, [current]);



    return(
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration: 0.18}}





        >
           <div className="home-slider">

                <div className="h-image-container">

                        <img key={images[current]} className="h-image" src={images[current] }/>

                </div>

            </div>

        </motion.div>
    );
}

export default Home;