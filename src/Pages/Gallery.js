import { gql, useQuery } from "@apollo/client";
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
  const [dots, setDots] = useState(".");


  // loading
  const [isLoading, setIsLoading] = useState(true)
  const [isAllPostsLoaded, setIsAllPostsLoaded] = useState(false)

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
      setPosts(data.data)
  }catch(err){
    console.log(err)
    setPostsError(true)
  } 
  }


  useEffect(() => {
    fetchYears();
    fetchPosts();

    setIsLoading(false)
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




  if (isLoading)
    return (
      <div className="loading" style={{ textAlign: "center" }}>
        Loading{dots}
      </div>
    );

  if (postsError) return <p>Error :( Please refresh page</p>;

  function checkLoad(index) {

    if (index === posts.length - 1) {
      setIsAllPostsLoaded(true);
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
      {posts.length === 0 ? (
        <div className="noPost">No content added yet, come back later!</div>
      ) : (
        <div className="gal-content">
          <div className="heading">{yearid}</div>

          <div className="content-gallery">
            {posts?.map((post, ID) => (
              <div className="post" key={post.id} style={isAllPostsLoaded ? {} : { display: "none" }} >
                {post.attributes.media.data.map((image, id2) => {
                  if (image.attributes.url.split(".").pop() === "jpg")
                    return (
                        <div
                              key={`jpg-${image.id}`}
                              onClick={() => openImageSlider(post.id)}
                              className="imgcontainer"
                          >
                            <img
                              src={imagesapi + image.attributes.url}
                              alt={image.attributes.formats.small ? image.attributes.formats.small : ""}
                              onLoad={() => checkLoad(parseInt(ID))}
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
      <ImageSliderComponent posts={posts} postId={currentImage} isOpen={isImageSliderOpen}  handleClose={() => setIsImageSliderOpen(false)} />
    </motion.div>
  );
};

export default Gallery;
