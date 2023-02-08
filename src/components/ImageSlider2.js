import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/ImageSlider.css";
const api = process.env.REACT_APP_IMAGEURL;

const POST = gql`
  query getPosts($id: ID!) {
    posts(
      filters: { catagory: { id: { eq: $id } } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          title
          caption
          media {
            data {
              attributes {
                formats
                url
              }
            }
          }

          catagory {
            data {
              id
              attributes {
                project_name
                Projecttext
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
  const { projectID, id } = useParams();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(POST, {
    variables: { id: projectID },
  });

  const [current, setCurrent] = useState(parseInt(id));
  var list = [];

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;
  data.posts.data.map((post2, id3) => (list[id3] = post2.id));

  let count = 0;
  let arrCount = 0;

  // while (arrCount < data.posts.data.length) {
  //   if (data.posts.data[arrCount].attributes.media.data.length > 0) {
  //     list[count] = data.posts.data[arrCount].id;
  //     arrCount = +1;
  //     count = +1;
  //   } else {
  //     arrCount = +1;
  //   }
  // }

  // console.log(data.posts);
  const length = list.length;
  // console.log(list);

  const nextSlide = () => {
    // console.log(current);
    if (current === parseInt(length - 1)) {
      // console.log("Setting current to index 0");
      setCurrent(0);
    } else {
      // console.log("Setting current to index +1: " + parseInt(current + 1));

      setCurrent(parseInt(current + 1));
    }
  };
  const prevSlide = () => {
    if (current === 0) {
      setCurrent(parseInt(length - 1));
    } else {
      setCurrent(parseInt(current - 1));
    }

    //setCurrent((current) === 0 ? list[length - 1] : list[(current) - 1])
  };
  // console.log(list);
  // console.log(current);
  //console.log(data.posts.data);

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
          {data.posts.data.map((post, id) => (
            <div key={id}>
              {post.attributes.media.data.map((image, id2) => {
                return (
                  <>
                    <div
                      className={
                        post.id === list[current] &&
                        image.attributes.url.split(".").pop() === "jpg"
                          ? "slide active"
                          : "slide"
                      }
                      key={id}
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
                      key={id2}
                    >
                      {post.id === list[current] &&
                        image.attributes.url.split(".").pop() !== "jpg" && (
                          <video className="video" controls="controls autoplay">
                            <source src={api + image.attributes.url} />
                          </video>
                        )}
                    </div>
                  </>
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
