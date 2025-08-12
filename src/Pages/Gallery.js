import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Gallery.css";
const imagesapi = process.env.REACT_APP_IMAGEURL;
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

const POSTS = gql`
  query getPosts($year: String!) {
    posts(
      sort: "year.year:desc"
      filters: { year: { year: { eq: $year } } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          title
          UID
          caption
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
              id
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

const Gallery = () => {
  const [years, setsYears] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dots, setDots] = useState(".");

  const raw_data = async () => {
    const resYear = await fetch(`${api}/api/years?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataYear = await resYear.json();
    setsYears(dataYear.data);
    handleScrollPosition();
  };

  const handleScrollPosition = () => {
    const scrollPos = sessionStorage.getItem("scrollPosition");
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
      sessionStorage.removeItem("scrollPosition");
    }
  };
  const handleClick = (e) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  };

  useEffect(() => {
    raw_data();
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

  const { yearid } = useParams();
  // const data = [];
  const { loading, error, data } = useQuery(POSTS, {
    variables: { year: yearid },
    Authorization: `Bearer ${token}`,
  });

  if (loading)
    return (
      <div className="loading" style={{ textAlign: "center" }}>
        Loading{dots}
      </div>
    );

  if (error) return <p>Error :( Please refresh page</p>;

  function checkLoad(index) {
    if (index === data.posts.data.length - 1) {
      setLoaded(true);
    }
  }
  //data = data.reverse();
  return (
    <motion.div
      className="Gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >


      <div className="years">
        {years.map((year, id) => (
          <div className="year" key={id}>
     
            <Link to={"/Gallery/" + year.attributes.year}>
              <div
                style={
                  year.attributes.year !== yearid ? {} : { fontWeight: "bold" }
                }
              >
                {year.attributes.year}
              </div>
            </Link>
            {/* ) } */}
          </div>
        ))}
      </div>
      {data.posts.data.length === 0 ? (
        <div className="noPost">No content added yet, come back later!</div>
      ) : (
        <div className="gal-content">
          <div className="heading">{yearid}</div>

          <div className="content-gallery">
            {data.posts.data?.map((post, ID) => (
              <div className="post" key={post.id}>
                {post.attributes.media.data.map((image, id2) => {
                  if (image.attributes.url.split(".").pop() === "jpg")
                    return (
                      <div key={`jpg-${image.id}`}>
                        <div
                          className="imgcontainer"
                          style={loaded ? {} : { display: "none" }}
                        >
                          <Link
                            to={
                              "/Gallery/" +
                              data.posts.data[0].attributes.year.data.attributes
                                .year +
                              "/view/" +
                              ID
                            }
                            onClick={() => handleClick()}
                          >
                            <img
                              src={imagesapi + image.attributes.url}
                              alt={image.attributes.formats.small.url}
                              onLoad={() => checkLoad(ID)}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  else
                    return (
                      <div key={`video-${image.id}`}>
                        <div className="imgcontainer">
                          <Link
                            to={
                              "/Gallery/" +
                              data.posts.data[0].attributes.year.data.attributes
                                .year +
                              "/view/" +
                              ID
                            }
                            onClick={() => handleClick()}
                          >
                            <video
                              className="video"
                              controls="controls autoplay"
                              onLoadStart={() => checkLoad(parseInt(ID))}
                            >
                              <source
                                src={
                                  imagesapi + image.attributes.url + "#t=0.001"
                                }
                              />
                            </video>
                          </Link>
                        </div>
                      </div>
                    );
                })}
                <div className="cap">{post.attributes.caption}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;
