import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../Styles/home.css";
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

function Home() {
  const [props, setProps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStatus, setImageLoadingStatus] = useState([]);
  // const [images, setImages] = useState([]);
  // function getImages(input) {
  //   var images = [];
  //   input.map(
  //     (props, id) => (images[id] = props.attributes.image.data.attributes.url)
  //   );
  //   return images;
  // }

  const raw_data = async () => {
    // const response = await fetch(`${api}/api/homepages?populate=*`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    axios
      .get(`${api}/api/homepages?populate=*`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        //console.log(data.data.data);
        setProps(data.data.data);
        //setImageLoadingStatus(new Array(data.data.length).fill(true));
      });
    //const data = await response.json();
    //setProps(data.data);
    //setImageLoadingStatus(new Array(data.data.length).fill(true));
  };

  useEffect(() => {
    try {
      raw_data();
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  var images = [];
  if (props) {
    //images = getImages(props);
    console.log(props);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (current === props.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [current, images.length]);
  useEffect(() => {
    const loadedImages = imageLoadingStatus.filter(
      (status) => status === false
    );
    if (loadedImages.length === imageLoadingStatus.length) {
      setLoading(false);
    }
  }, [imageLoadingStatus]);

  const handleImageLoad = (index) => {
    const updatedImageLoadingStatus = [...imageLoadingStatus];
    updatedImageLoadingStatus[index] = false;
    setImageLoadingStatus(updatedImageLoadingStatus);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="home-slider">
        <div className="h-image-container">
          {loading ? (
            <p>Loading images..</p>
          ) : (
            props.map((item, index) => (
              <div
                key={item.attributes.image.data.id}
                className={index === current ? "visible" : ""}
              >
                <img
                  src={item.attributes.image.data.attributes.url}
                  alt=""
                  onLoad={() => setLoading(false)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
