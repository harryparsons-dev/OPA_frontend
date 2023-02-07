import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Gallery.css";
const imagesapi = process.env.REACT_APP_IMAGEURL;
const api = process.env.REACT_APP_APIURL;

const POSTS = gql`
  query getPosts($year: String!) {
    posts(sort: "year.year:desc", filters: { year: { year: { eq: $year } } }) {
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

  const raw_data = async () => {
    const resYear = await fetch(`${api + "/api/years?populate=*"}`);
    const dataYear = await resYear.json();
    setsYears(dataYear.data);
  };
  useEffect(() => {
    raw_data();
  }, []);

  const { yearid } = useParams();

  const { loading, error, data } = useQuery(POSTS, {
    variables: { year: yearid },
  });

  if (loading) return <></>;

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
      transition={{ duration: 0.18 }}
    >
      {/* <div className="heading">{yearid}</div> */}

      <div className="years">
        {years.map((year, id) => (
          <div className="year" key={id}>
            {/* {year.attributes.year !== yearid ? ( */}
            <Link to={"/Gallery/" + year.attributes.year}>
              <div
                style={
                  year.attributes.year !== yearid
                    ? {}
                    : { "font-weight": "bold" }
                }
              >
                {year.attributes.year}
              </div>
            </Link>
            {/* ) } */}
          </div>
        ))}
      </div>
      <div className="gal-content">
        <div className="heading">{yearid}</div>

        <div className="content-gallery">
          {data.posts.data.map((post, id) => (
            <div className="post" key={id}>
              {post.attributes.media.data.map((image, id2) => {
                if (image.attributes.url.split(".").pop() === "jpg")
                  return (
                    <div key={id}>
                      <div
                        className="imgcontainer"
                        style={loaded ? {} : { display: "none" }}
                        key={id2}
                      >
                        <Link
                          to={
                            "/Gallery/" +
                            data.posts.data[0].attributes.year.data.attributes
                              .year +
                            "/view/" +
                            id
                          }
                        >
                          <img
                            src={imagesapi + image.attributes.url}
                            alt={image.attributes.formats.small.url}
                            onLoad={() => checkLoad(id)}
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
                            "/Gallery/" +
                            data.posts.data[0].attributes.year.data.attributes
                              .year +
                            "/view/" +
                            id
                          }
                        >
                          <video
                            className="video"
                            controls="controls autoplay"
                            onLoadStart={() => checkLoad(parseInt(id))}
                          >
                            <source src={imagesapi + image.attributes.url} />
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
    </motion.div>
  );
};

export default Gallery;
