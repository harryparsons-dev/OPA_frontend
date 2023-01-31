import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../Styles/home.css";
const api = process.env.REACT_APP_APIURL;

function getImages(data) {
  var images = [];
  data.map(
    (props, id) => (images[id] = props.attributes.image.data.attributes.url)
  );
  return images;
}

function Home() {
  const [props, setProps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const raw_data = async () => {
    const response = await fetch(`${api + "/api/homepages?populate=*"}`);
    const data = await response.json();
    setProps(data.data);
    // console.log(data.data);
  };

  useEffect(() => {
    raw_data();
  }, []);

  const cacheImages = async (urlArr) => {
    const promises = await urlArr.map((url) => {
      return new Promise(function (resolve, reject) {
        // console.log(url);
        const img = new Image();
        img.src = api + url;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    await Promise.all(promises);

    setLoading(false);
  };

  var images = getImages(props);
  // console.log(images.length + "length");
  cacheImages(images);
  // useEffect(() => {
  //   cacheImages(images);
  // }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === images.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="home-slider">
        <div className="h-image-container">
          {loading ? (
            <p>Loading images..</p>
          ) : (
            <img
              key={images[current]}
              className="h-image"
              src={images[current]}
              alt={images[current]}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
