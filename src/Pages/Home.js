import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../Styles/home.css";
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

function Home() {
  const [props, setProps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [images, setImages] = useState([]);
  function getImages(data) {
    var images = [];
    data.map(
      (props, id) => (images[id] = props.attributes.image.data.attributes.url)
    );
    return images;
  }

  const raw_data = async () => {
    const response = await fetch(`${api}/api/homepages?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProps(data.data);
  };

  useEffect(() => {
    try {
      raw_data();

      // setProps(data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  var images = [];
  if (props) {
    images = getImages(props);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (current === images.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
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
