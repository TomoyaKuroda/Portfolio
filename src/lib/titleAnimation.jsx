import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const TitleAnimation = ({ text }) => {
  //   let title = [];
  //   text = text.split(" ").join("-");
  //   text = text.split("");
  //   text.forEach((element) => {
  //     if (element === "-") element = "&nbsp;";
  //     title.push(element);
  //   });
  //   useEffect(() => {
  let tl = gsap.timeline();

  tl.to(".box", 0, {
    css: { display: "block" },
  });

  console.log("title aanimation called");
  //   }, []);
  return (
    <motion.div initial="initial" animate="animate" className="box">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="line"
      ></motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {/* {title.map((element, i) => (
          <span className="letters" key={i}>
            {text}
          </span>
        ))} */}
        {text}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="line"
      ></motion.div>
    </motion.div>
  );
};

export default TitleAnimation;
