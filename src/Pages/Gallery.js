import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Gallery.css";
import ImageSliderComponent from "../components/imageSliderComponet";
const imagesapi = process.env.REACT_APP_IMAGEURL;
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

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
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [dots, setDots] = useState(".");

  const raw_data = async () => {
    const resYear = await fetch(`${api}/api/years?populate=?sort=rank:asc*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataYear = await resYear.json();
    setsYears(dataYear.data);
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

  function openImageSlider(id) {
    setIsImageSliderOpen(true);
    setCurrentImage(id);
  }
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
     
            <Link to={"/gallery/" + year.attributes.year}>
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
                        <div
                              key={`jpg-${image.id}`}
                            onClick={() => openImageSlider(post.id)}
                              className="imgcontainer"
                              style={loaded ? {} : { display: "none" }}
                          >
                            <img
                              src={imagesapi + image.attributes.url}
                              alt={image.attributes.formats.small ? image.attributes.formats.small : ""}
                              onLoad={() => checkLoad(ID)}
                            />
                          </div>
                    );
                  else
                    return (
                          <div
                              key={`video-${image.id}`}
                              className="imgcontainer"
                              onClick={() => openImageSlider(post.id)}
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
                      </div>
                    );
                })}
                <div className="cap">{post.attributes.caption}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ImageSliderComponent posts={data.posts.data} postId={currentImage} isOpen={isImageSliderOpen}  handleClose={() => setIsImageSliderOpen(false)} />
    </motion.div>
  );
};

export default Gallery;
