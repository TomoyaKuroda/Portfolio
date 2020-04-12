import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stagger, fadeInUp } from "../components/framerMotionAnimations";
import { CSSTransition } from "react-transition-group";
import TitleAnimation from "../lib/titleAnimation";
let easing = [0.6, -0.05, 0.01, 0.99];

const titleFadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
      delay: 0.6,
    },
  },
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  let title = [];
  let text = "PROJECTS";
  text = text.split("");
  text.forEach((element) => {
    title.push(element);
  });

  useEffect(() => {
    (async function getInitialData() {
      const res = await fetch(
        "http://my-json-server.typicode.com/tomoyakuroda/Portfolio/projects"
      );
      const data = await res.json();
      setProjects(data);
    })();

    // let tl = gsap.timeline();

    // tl.to(".box", 0, {
    //   css: { display: "block" },
    // });

    // .from(".projects .letters", 0.9, {
    //   delay: 0.6,
    //   scale: 4,
    //   opacity: 0,
    //   ease: "expo.inOut",
    //   stagger: 0.1,
    // })
    // .from(".projects .line", 1.4, {
    //   scaleX: 0,
    //   ease: "expo.inOut",
    //   stagger: {
    //     amount: 0.4,
    //   },
    //   delay: -0.7,
    // });
  }, []);

  return (
    <motion.div initial="initial" animate="animate" className="page projects">
      <div className="container">
        <div className="row">
          <TitleAnimation text={"PROJECTS"} />

          {/* <div className="box">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="line"
            ></motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title.map((element) => (
                <span className="letters">{element}</span>
              ))}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="line"
            ></motion.div>
          </div> */}

          {/* <div className="title"> */}
          {/* <div className="box"> */}
          {/* <div className="box">
            <h2>Select a protein</h2>
          </div> */}
          {/* </div> */}
          {/* </div> */}

          <div className="container center">
            <motion.div variants={stagger} className="project-row">
              {projects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="card"
                  >
                    <span className="category">{project.category}</span>
                    <motion.img
                      src={project.image}
                      width={250}
                      transition={{ delay: 0.2 }}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    />
                    <div className="project-info">
                      <h4>{project.name}</h4>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
