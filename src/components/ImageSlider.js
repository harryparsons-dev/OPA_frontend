import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import "../Styles/ImageSlider.css";
const api = process.env.REACT_APP_IMAGEURL;

const POSTS = gql`
  query getPosts($year: String!) {
    posts(
      sort: "createdAt:desc"
      filters: { year: { year: { eq: $year } } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          title
          UID
          media {
            data {
              attributes {
                formats
                url
              }
            }
          }
          year {
            data {
              attributes {
                year
              }
            }
          }
        }
      }
    }
  }
`;

function ImageSlider() {
  const { yearid, id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(POSTS, {
    variables: { year: yearid },
  });

  const [current, setCurrent] = useState(parseInt(id));

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const nextSlide = () => {
    console.log(current);
    if (current === parseInt(length - 1)) {
      // console.log("Setting current to index 0");
      setCurrent(0);
    } else {
      // console.log("Setting current to index +1: " + parseInt(current));
      setCurrent(parseInt(current + 1));
    }
  };
  const prevSlide = () => {
    if (current === 0) {
      setCurrent(parseInt(length - 1));
    } else {
      setCurrent(parseInt(current - 1));
    }
  };
  var list = [];
  data.posts.data.map((post2, id3) => {
    list[id3] = post2.id;
    return 0;
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //     console.log("next slide");
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  let length = data.posts.data.length;
  // console.log(data.posts.data);

  if (!Array.isArray(data.posts.data) || length <= 0) {
    return null;
  }
  return (
    <motion.div
      className="ImageSlider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <button className="close" onClick={() => navigate(-1)}>
        <AiOutlineClose />
      </button>
      <div className="slider">
        <FaLessThan className="left-arrow" onClick={prevSlide} />
        <FaGreaterThan className="right-arrow" onClick={nextSlide} />

        <div className="i-content">
          {data.posts.data.map((post) => (
            <div key={post.id}>
              {post.attributes.media.data.map((image) => {
                return (
                  <div key={`media-${image.id}`}>
                    <div
                      className={
                        post.id === list[current] &&
                        image.attributes.url.split(".").pop() === "jpg"
                          ? "slide active"
                          : "slide"
                      }
                    >
                      {post.id === list[current] &&
                        image.attributes.url.split(".").pop() === "jpg" && (
                          <img
                            src={api + image.attributes.url}
                            className="image"
                            alt={image.attributes.formats.large.url}
                          />
                        )}
                    </div>
                    <div
                      className={
                        post.id === list[current] &&
                        image.attributes.url.split(".").pop() !== "jpg"
                          ? "slide active"
                          : "slide"
                      }
                    >
                      {post.id === list[current] &&
                        image.attributes.url.split(".").pop() !== "jpg" && (
                          <video className="video" controls="controls autoplay">
                            <source src={api + image.attributes.url} />
                          </video>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ImageSlider;
