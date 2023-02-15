import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import "../Styles/projectView.css";
const api = process.env.REACT_APP_IMAGEURL;
const API_URL = process.env.REACT_APP_APIURL + "/api/catagories";

const POSTS = gql`
  query getPosts($name: String!) {
    posts(
      filters: { catagory: { UID: { eq: $name } } }
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
  const [categories, setcategories] = useState([]);

  const raw_data = async () => {
    const projects = await fetch(`${API_URL}`);
    const projects_data = await projects.json();

    setcategories(projects_data.data);
  };

  useEffect(() => {
    raw_data();
  }, []);

  let { projectUID } = useParams();
  // let _projectID = 0;

  const { loading, error, data } = useQuery(POSTS, {
    variables: { name: projectUID },
  });
  if (loading) return <></>;

  if (error) return <p>Error :(</p>;

  // if (data === null || data.posts === null || data.posts.data.length === 0) {
  //   return <div className="noPost">No content added yet, come back later!</div>;
  // }
  let dirty = "";
  let clean = "";
  if (data.posts.data.length > 0) {
    dirty = data.posts.data[0].attributes.catagory.data.attributes.Projecttext;
  }
  clean = sanitizeHtml(dirty);
  // const current = data.posts.data[0].id;
  // const index = data.posts.data.indexOf(current - 1);
  // const newdata = data.posts.data.splice(index, 1);

  // console.log(current);
  // console.log(data);
  // console.log(newdata);

  //console.log((data.posts.data).length);

  return (
    <motion.div
      className="projectView"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="projects">
        {categories.map((category, id) => (
          <div className="project" key={id}>
            <Link to={"/Projects/" + category.attributes.UID}>
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
      {data.posts.data.length === 0 ? (
        <div className="noPost">No content added yet, come back later!</div>
      ) : (
        <div className="p-container">
          <div className="p-heading">
            {
              data.posts.data[0].attributes.catagory.data.attributes
                .project_name
            }
          </div>
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: clean }}
          ></div>

          <div className="p-content">
            {data.posts.data.map((post, id) => (
              <div className="p-post" key={id}>
                {post.attributes.media.data.map((image, id2) => {
                  if (image.attributes.url.split(".").pop() === "jpg")
                    return (
                      <div key={id2}>
                        <div className="p-imagecontainer">
                          <Link
                            to={
                              "/Projects/view/" +
                              data.posts.data[0].attributes.catagory.data.id +
                              "/" +
                              id
                            }
                          >
                            <img
                              src={api + image.attributes.url}
                              alt={image.attributes.formats.small.url}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  else
                    return (
                      <div key={id}>
                        <div className="imgcontainer" key={id2}>
                          <Link
                            to={
                              "/Projects/view/" +
                              data.posts.data[0].attributes.catagory.data.id +
                              "/" +
                              id
                            }
                          >
                            <video
                              className="video"
                              controls="controls autoplay"
                            >
                              <source
                                src={api + image.attributes.url + "#t=0.001"}
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
}

export default ProjectView;
