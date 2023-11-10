import { motion } from "framer-motion";
import { React, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../Styles/about.css";
import aboutImage from "../images/aboutpage.jpg";
function About() {
  const [isLoaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {!isLoaded && <div>Loading...</div>}

      <div className="a-title">About</div>

      <div className="a-content">
        <div className="img">
          <img
            src={aboutImage}
            alt="About"
            onLoad={handleImageLoad}
            style={{ display: isLoaded ? "block" : "none" }}
          />
        </div>
        {isLoaded && (
          <div className="text">
            <p>Artist Practice:</p>
            <br />
            <p>
              <i>
                With each artwork, the most important aspect is for my audience
                to feel a sense of imagination and curiosity.
                <br />
                <br />
                My practice is constantly explorative, each artwork leading to
                the next, asking new ways of seeing the world each time. I use
                drawing and sculpture as materials to learn about my
                surroundings and translate my experiences. The wonder and awe I
                feel towards nature and human life is what I wish to share with
                others.
                <br />
                <br />
                Currently, I am most interested in networks and tunnels. I study
                rabbit warrens, trees, railways, and roads – to name a few. I am
                fascinated by these passages, and how they energetically connect
                organisms. Immersive installation is where I can really play and
                experiment with these themes.
                <br />
                <br />
                The installation ‘The Warren’ is an example of this. The piece
                comprises of suspended rabbit tunnels, tactile ceramics, and
                eerie sound recordings. It is a continuous line - looping up and
                around the building - the gaps filled by our imagination. In
                this piece I engage with audiences through multiple sensory
                experiences, evoking nostalgic, childlike creativity.
                <br />
                <br />
                Drawing is foundational to my practice and research process. In
                the recent collection of drawings, ‘Wiser than us all’, I
                combine pencil rubbings of old trees with fluid mark making. I
                work the graphite into the tree’s patterns, carving out the
                surface of the tree, entwining my story within the tree’s
                history. The lines and shading constantly change, a never-ending
                network of shapes that flow from one to another.
                <br /> <br />
              </i>
            </p>
            <p>Bio:</p>
            <br />
            <p>
              Olivia grew up in rural Devon and moved to London to take up her
              arts education in 2019. Studying at Camberwell College of Arts
              UAL, she completed her BA in Fine Art Drawing in 2022. Olivia has
              shown at Southwark Park Galleries, exhibited a solo collection at
              Peckham Pelican, and most recently managed a group show of 27
              emerging artists from her university. She continues her studio
              practice from her base in Crystal Palace, south-east London.{" "}
            </p>
            <br />
            <p>Exhibitions:</p>
            <br />
            <ul>
              <li>2022 Nunhead Art Exhibition, London. (group)</li>
              <li>2022 Peckham Pelican, London. (solo)</li>
              <li>
                2022 Degree Show, Camberwell College of Arts UAL, London (group)
              </li>
              <li>2022 [anti]static, Golden Anchor, London. (group) </li>
              <li>2022 Out There, Southwark Park Gallery, London. (group)</li>
              <li>2021 Creative Solutions, Online. (group)</li>
              <li>2020 Derwent Art Prize 2020, Online. (group)</li>
              <li>
                2019 New Camberwell Art, Camberwell College of Arts, London.
                (group)
              </li>
              <li>
                2019 Exeter Culture Launch, Exeter College of Art, Exeter.
                (group)
              </li>
            </ul>
            <br />
            <p>Awards:</p>
            <br />
            <ul>
              <li>2020 Shortlisted, Derwent Art Prize. </li>
              <li>2019 Special Selection Award, Exeter School of Art</li>
              <li>
                2019 Shortlisted, Artist of the Year Award and Grant, Circle
                Foundation for the Arts.{" "}
              </li>
            </ul>
            <br />
            <p>Education:</p>
            <ul>
              <li>
                2022 BA Fine Art: Drawing. UAL: Camberwell College of the Arts,
                London.{" "}
              </li>
              <li>
                2019 Foundation Diploma in Art and Design. Exeter School of Art,
                Devon.
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default About;
