import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import "../Styles/projectView.css";
const api = process.env.REACT_APP_IMAGEURL;
const API_URL = process.env.REACT_APP_APIURL + "/api/catagories";

const POSTS = gql`
  query getPosts($name: String!) {
    posts(filters: { catagory: { UID: { eq: $name } } }) {
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
  const [posts, setPosts] = useState([]);
  const [categories, setcategories] = useState([]);

  const raw_data = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setPosts(data.data);

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
              {category.attributes.project_name}
            </Link>
          </div>
        ))}
      </div>
      <div className="p-container">
        <div className="p-heading">
          {" "}
          {data.posts.data[0].attributes.catagory.data.attributes.project_name}
        </div>
        <div className="text">
          <ReactMarkdown>
            {data.posts.data[0].attributes.catagory.data.attributes.Projecttext}
          </ReactMarkdown>
        </div>

        <div className="p-content">
          {data.posts.data.map((post, id) => (
            <div className="p-post" key={id}>
              {post.attributes.media.data.map((image, id2) => {
                return (
                  <div key={id2}>
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
                      />{" "}
                    </Link>

                    <div className="cap">{post.attributes.caption}</div>
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

export default ProjectView;
