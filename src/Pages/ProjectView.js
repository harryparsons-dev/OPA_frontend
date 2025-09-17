import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import "../Styles/projectView.css";
import ImageSliderComponent from "../components/imageSliderComponet";
const api = process.env.REACT_APP_IMAGEURL;
const API_URL = process.env.REACT_APP_APIURL + "/api/catagories?sort=rank:asc";
const token = process.env.REACT_APP_TOKEN;

const POSTS = gql`
  query getPosts($name: String!) {
    posts(
      filters: { catagory: { UID: { eq: $name } } }
       sort: "createdAt:desc"
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
                UID
              }
            }
          }
        }
      }
    }
  }
`;

function ProjectView() {
  const [categories, setCategories] = useState([]);
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [dots, setDots] = useState("");


  const raw_data = async () => {
    const projects = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const projects_data = await projects.json();
    setCategories(projects_data.data);
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

  let { projectUID } = useParams();

  const { loading, error, data } = useQuery(POSTS, {
    variables: { name: projectUID },
  });

  if (loading)
    return (
      <div className="loading" style={{ textAlign: "center" }}>
        Loading{dots}
      </div>
    );

  if (error) return <p>Error :(</p>;

  let dirty = "";
  let clean = "";
  if (data.posts.data.length > 0) {
    dirty = data.posts.data[0].attributes.catagory.data.attributes.Projecttext;
    clean = sanitizeHtml(dirty);
  }

  function openImageSlider(id) {
    setIsImageSliderOpen(true);
    setCurrentImage(id);
  }

  return (
    <motion.div

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="projectView">
      <div className="projects">
        {categories.map((category, id) => (
          <div className="project" key={id}>
            <Link to={"/projects/" + category.attributes.UID}>
              <div
                style={
                  category.attributes.UID !== projectUID
                    ? {}
                    : { fontWeight: "bold" }
                }
              >
                {category.attributes.project_name}
              </div>
            </Link>
          </div>
        ))}
      </div>
        <div className="p-container">
          <div className="p-heading">
            {data.posts.data &&data.posts.data.length > 0 ?
                data.posts.data[0].attributes.catagory.data.attributes.project_name
                : ""}
          </div>
          <div
            className="p-text"
            dangerouslySetInnerHTML={{ __html: clean }}
          ></div>

          <div className="p-content">
            {data.posts.data.length === 0 ? (
                <div>Add some content!</div>
            ) : (
           <> {data.posts.data.map((post, id) => (
              <div className="p-post" key={post.id}>
                {post.attributes.media.data.map((image, id2) => {
                  if (image.attributes.url.split(".").pop() === "jpg")
                    return (
                      <div key={id} className="p-imagecontainer" onClick={() => openImageSlider(post.id)}>
                            <img
                              src={api + image.attributes.url}
                              alt={image.attributes.url}
                            />
                          </div>
                    );
                  else
                    return (
                      <div key={id} className="p-imgcontainer"   onClick={() => openImageSlider(post.id)}>
                            <video
                              className="video"
                              controls="controls autoplay"
                            >
                              <source
                                src={api + image.attributes.url + "#t=0.001"}
                              />
                            </video>
                        </div>
                    );
                })}
                <div className="cap">{post.attributes.caption}</div>
              </div>
            ))}</>
            )
                }

          </div>
        </div>
      </div>
      <ImageSliderComponent posts={data.posts.data} postId={currentImage} isOpen={isImageSliderOpen}  handleClose={() => setIsImageSliderOpen(false)} />
    </motion.div>
  );
}

export default ProjectView;
