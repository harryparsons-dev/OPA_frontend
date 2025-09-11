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
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/homepages?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProps(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        switch (prev) {
          case ".":
            return "..";
          case "..":
            return "...";
          case "...":
            return ".";
          default:
            return ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
     // setCurrent((prevCurrent) => (prevCurrent + 1) % props.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [props]);

  if (loading)
    return (
      <div className="loading" style={{ textAlign: "center" }}>
        Loading{dots}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="home-slider">
        <div className="h-image-container">
          {props.map((item, index) => (
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
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
