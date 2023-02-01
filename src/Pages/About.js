import { motion } from "framer-motion";
import { React, useState } from "react";
import aboutImage from "../images/aboutpage.jpg";
import "../Styles/about.css";
function About() {
  const { loaded, setLoaded } = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="a-title">About</div>
      {loaded && (
        <div className="a-content" style={loaded ? {} : { display: "none" }}>
          <div className="img">
            <img src={aboutImage} alt="About" onLoad={setLoaded(true)} />
          </div>
          <div className="text">
            *Some text about livvy*Lorem ipsum dolor sit amet, eruditi
            dissentias per ut. Minimum liberavisse per in. His iriure iuvaret
            volutpat ad. No pro mollis abhorreant. Omittam definitiones ut has.
            Consul corrumpit elaboraret vix cu, qui no option aperiri
            adolescens, ut essent erroribus dissentiunt per. Etiam noster
            veritus ei vis, nec ei debitis alienum, et maiorum incorrupte sea.
            Amet integre usu ut. Illud percipit principes ad eos, interesset
            disputando eum ea. Sint vocibus inciderint per id. Justo deleniti
            periculis pro ei. Movet munere assentior mel ei. Ea veri ferri
            maluisset usu, ex pro duis accusam detracto. Vel at dolor
            philosophia, ad modo eros deterruisset ius. No mea copiosae
            iudicabit, mutat ludus voluptatum pri ex. Alia tation suscipit in
            vis, has viris vidisse maluisset ex. Per at porro mazim persius, in
            interesset delicatissimi mei. Nam an nisl eius. Pro autem assum
            verear ex. Alii vocibus inimicus id vim, et vix senserit intellegam
            constituam, malorum docendi ne pri. Vix agam definiebas consectetuer
            at, diam consectetuer sea ne, his ea paulo dolore putent. No esse
            inimicus conclusionemque vel, sed labore habemus detraxit ad. No sit
            suas reque commune, impedit percipitur ius eu, ei mundi dictas eos.
            Et graece aliquip eum, an pertinacia voluptatum sit. Eu sit nihil
            ridens evertitur, usu feugait definitionem te.
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default About;
