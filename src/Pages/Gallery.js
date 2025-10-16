import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Gallery.css";
import ImageSliderComponent from "../components/imageSliderComponet";
const imagesapi = process.env.REACT_APP_IMAGEURL;
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;


const Gallery = () => {
  const { yearid } = useParams();

  const [years, setsYears] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedPosts, setLoadedPosts] = useState(0);

  // loading
  const [isLoading, setIsLoading] = useState(true)

  // errors
  const [postsError, setPostsError] = useState(false)


  const fetchYears = async () => {
    const resYear = await fetch(`${api}/api/years?populate=?sort=rank:asc*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataYear = await resYear.json();
    setsYears(dataYear.data);
  };

  const fetchPosts = async () => {
    try{
    const response  =await fetch(`${api}/api/posts?populate=*&sort=createdAt:desc&filters[year][year][$eq]=${yearid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      const data = await response.json();
      setPosts(data.data);
      if(data.data.length === 0){
        setIsLoading(false)
      }
    }catch(err){
    console.log(err)
    setPostsError(true)
  } 
  }

  useEffect(() => {
    const loadData = async () => {
      try {
         await Promise.all([fetchYears(), fetchPosts()]);
        // handle data here
      } catch (err) {
        setPostsError(true);
      }
    };

    loadData();
  }, [yearid]);



  const onLoad = () => {
    setLoadedPosts((prev) => {
      const updatedCount = prev + 1;
      if (updatedCount === posts.length) {
        setIsLoading(false);
      }
      return updatedCount;
    });
  };


  if (postsError) return <p>Error :( Please refresh page</p>;


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
        <div>
          {( isLoading) && (
              <div className="loading" style={{ textAlign: "center" }}>
                Loading
              </div>
          )}

              <div style={!isLoading ? {} : { display: "none" }}>
                <div className="years">
                  {years.map((year, id) => (
                      <div className="year" key={id}>
                        <Link to={`/gallery/${year.attributes.year}`}>
                          <div
                              style={
                                year.attributes.year !== yearid
                                    ? {}
                                    : { fontWeight: "bold" }
                              }
                          >
                            {year.attributes.year}
                          </div>
                        </Link>
                      </div>
                  ))}
                </div>
                {posts.length === 0 &&   <div className="noPost">No content added yet, come back later!</div>}
                {posts.length > 0 && <div className="gal-content">
                  <div className="heading">{yearid}</div>

                  <div className="content-gallery">
                    {posts?.map((post) => (
                        <div className="post" key={post.id}>
                          {post.attributes.media.data.map((image) => {
                            const ext = image.attributes.url.split(".").pop();
                            const isJpg = ext === "jpg";

                            if (isJpg) {
                              return (
                                  <div
                                      key={`jpg-${image.id}`}
                                      onClick={() => openImageSlider(post.id)}
                                      className="imgcontainer"
                                  >
                                    <img
                                        src={imagesapi + image.attributes.url}
                                        alt={image.attributes.formats.small || ""}
                                        loading="eager"
                                        onLoad={onLoad}
                                        onError={onLoad}
                                    />
                                  </div>
                              );
                            }

                            return (
                                <div
                                    key={`video-${image.id}`}
                                    className="imgcontainer"
                                >
                                  <video className="video" controls>
                                    <source
                                        src={
                                            imagesapi +
                                            post.attributes.media.data[0].attributes.url +
                                            "#t=0.001"
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
                }
              </div>

        </div>

        <ImageSliderComponent
            posts={posts}
            postId={currentImage}
            isOpen={isImageSliderOpen}
            handleClose={() => setIsImageSliderOpen(false)}
        />
      </motion.div>
  )

};

export default Gallery;
