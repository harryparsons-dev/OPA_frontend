import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../Styles/about.css";
import aboutImage from "../images/aboutpage.jpg";
function About() {
  const [isLoaded, setLoaded] = useState(false);
  const [dots, setDots] = useState("");

  const handleImageLoad = () => {
    setLoaded(true);
  };
  useEffect(() => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {!isLoaded && <div className="loading">Loading...</div>}


     <div>
     {isLoaded && <div className="a-title">About</div>}

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
          <div className="a-text">
      
            <br />
            <p>

              Olivia is a multidisciplinary artist based in West Devon. Through drawing, ceramics, and installation, she explores themes of play, 
              touch, and the uncanny. In an increasingly digital and technology-driven society, she finds inspiration in her local natural surroundings, 
              producing tactile works that invite curiosity.
          </p><br/>
              <p>
                Experimentation is central to her practice, both in process and presentation. She is currently focused on creating pieces that encourage 
                sensory engagement and exhibiting in unconventional spaces.
            </p><br/>
              Her recent work explores energetic networks, both natural and human-made. She is particularly interested in the hidden infrastructures such
               as rabbit warrens, root systems, railways, and footpaths. These passages reveal patterns across species and systems, reflecting our shared 
               environments and experiences. Her artworks offer a space for reflection and playful curiosity, inviting audiences to slow down and reconnect.
              <p><br/>
                Olivia completed a Foundation Diploma in Fine Art at Exeter School of Art in 2018, before relocating to London to undertake a Bachelor 
                of Arts in Fine Art Drawing at Camberwell College of Arts, University of the Arts London, graduating in 2022. Since then, she has exhibited 
                in a range of settings, including Southwark Park Gallery in London, Studio KIND in North Devon, and Loughwood Meeting House in East Devon.
            </p><br/>
            <hr/>
            
           <p><h2><strong>Upcoming Exhibitions</strong></h2></p><br/>
           <p><strong>Devon Open Studios 2025</strong></p><br/>
           <p>
            <strong>Location:</strong> Higher Carley Farm, Lifton, Devon, PL16 0EB
           </p>
           <p>
            <strong>Studio Opening Times:</strong>
           </p>
           <br/>
           
            <strong>Sat 6 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <strong>Sun 7 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <strong>Fri 12 Sept:&nbsp;&nbsp;</strong>2pm – 6pm <br/>
            <strong>Sat 13 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <strong>Sun 14 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <strong>Fri 19 Sept:&nbsp;&nbsp;</strong>2pm – 6pm <br/>
            <strong>Sat 20 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <strong>Sun 21 Sept:&nbsp;&nbsp;</strong>10am – 4pm <br/>
            <br/>
            <a href="https://devonartistnetwork.co.uk/studio/olivia-parsons" target="_blank" rel="noopener" style={{textDecoration: 'underline'}}>More details here →</a>
          <p>
            <br/>
                   <hr/>
                   <br/>
           <p><strong>Where Are We Now?</strong></p>
           <br/>
        <p><strong>Dates:</strong> 6 September - 25 October</p>
        <p><strong>Location:</strong> Thelma Hulbert Gallery, Honiton, EX14 1LX</p>
                <p><strong>Opening Times:</strong> Tuesday – Saturday, 10am – 5pm</p>
        <p >A group exhibition with fellow artists from CAMP (Contemporary Art Membership Platform).</p>
        <p><a href="https://www.thelmahulbert.com/exhibitions/camp-wherearewenow" target="_blank" rel="noopener" style={{textDecoration: 'underline'}}>More details here →</a></p>
          </p>
          <br/>
        <hr />
          <br/>
    <p>
      <h2>Past Exhibitions</h2>
      <ul>
        <li><strong>2025</strong> – <em>Hidden Places</em>, Loughwood Meeting House, Axminster <em>(group)</em></li>
        <li><strong>2025</strong> – <em>Solo Showcase</em>, Zebediah's Art and Craft Collective, Cornwall <em>(solo)</em></li>
        <li><strong>2024</strong> – <em>Art in Shop Windows</em>, Launceston Art Weekender, Launceston, Cornwall <em>(group)</em></li>
        <li><strong>2024</strong> – <em>Summer Open</em>, Studio Kind, Barnstaple <em>(group)</em></li>
        <li><strong>2024</strong> – Carley Open Studios, Fundraiser for Farms for City Children, Devon <em>(solo)</em></li>
        <li><strong>2024</strong> – <em>Group Collective</em>, The Paxton Centre, Crystal Palace <em>(group)</em></li>
        <li><strong>2023</strong> – <em>Solo Showcase</em>, The Ninth Life, London <em>(solo)</em></li>
        <li><strong>2022</strong> – <em>Nunhead Art Exhibition</em>, Nunhead Community Centre, London <em>(group)</em></li>
        <li><strong>2022</strong> – <em>Solo Showcase</em>, Peckham Pelican, London <em>(solo)</em></li>
        <li><strong>2022</strong> – <em>Fine Art Drawing Degree Show</em>, Camberwell College of Arts, University of the Arts London <em>(group)</em></li>
        <li><strong>2022</strong> – <em>[anti]static</em>, The Golden Anchor, London <em>(group)</em></li>
        <li><strong>2022</strong> – <em>Out There</em>, Southwark Park Gallery, London <em>(group)</em></li>
        <li><strong>2021</strong> – <em>Creative Solutions</em>, Online <em>(group)</em></li>
        <li><strong>2020</strong> – <em>Derwent Art Prize 2020</em>, Online <em>(group)</em></li>
        <li><strong>2019</strong> – <em>New Camberwell Art</em>, Camberwell College of Arts, University of the Arts London <em>(group)</em></li>
        <li><strong>2019</strong> – <em>Exeter Culture Launch</em>, Exeter College of Art <em>(group)</em></li>
      </ul>
    </p>
  <br/>
    <hr />
    <br/>

    <p>
      <h2>Awards</h2>
      <ul class="list">
        <li><strong>2025</strong> – Devon Open Studios Emerging Artist Bursary</li>
        <li><strong>2020</strong> – Derwent Art Prize (Shortlisted)</li>
        <li><strong>2019</strong> – Special Selection Award, Exeter School of Art</li>
        <li><strong>2019</strong> – Artist of the Year Award and Grant, Circle Foundation for the Arts (Shortlisted)</li>
      </ul>
    </p>
  <br/>

    <hr />
  <br/>

    <p>
      <h2>Publication &amp; Press</h2>
      <p><strong>Interview:</strong> <a href="https://www.youtube.com/watch?v=-FFaLmQQj9s" target="_blank" rel="noopener" style={{textDecoration: 'underline'}}>Art in Me – Watch here</a></p>
    </p>
          </div>
        )}
      </div>

</div>
    </motion.div>
  );
}

export default About;
