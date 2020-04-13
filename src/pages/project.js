import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../components/framerMotionAnimations";

//rsf
function Project() {
  const [project, setProject] = useState({});
  const params = useParams();

  useEffect(() => {
    (async function getInitialData() {
      const id = params.id;
      const res = await fetch(
        `http://my-json-server.typicode.com/tomoyakuroda/Portfolio/projects/${id}`
      );
      const project = await res.json();
      setProject(project);
    })();
  }, []);
  return (
    <motion.div initial="initial" animate="animate">
      <div className="fullscreen page">
        <div className="container">
          <div className="row">
            <div className="project">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="img"
              >
                <motion.img
                  src={project.image}
                  alt=""
                  transition={{ delay: 0.2 }}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                />
              </motion.div>
              <div className="project-details">
                <motion.div variants={stagger} className="inner">
                  <Link to="/projects">
                    <motion.div variants={fadeInUp}>
                      <a href="/" className="go-back">
                        Back to projects
                      </a>
                    </motion.div>
                  </Link>
                  <motion.div variants={fadeInUp}>
                    <span className="category">{project.category}</span>
                  </motion.div>
                  <motion.h1 variants={fadeInUp}>{project.name}</motion.h1>
                  <motion.p variants={fadeInUp}>{project.details}</motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Project;
