import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stagger, fadeInUp } from '../components/framerMotionAnimations';
import { CSSTransition } from 'react-transition-group';
import TitleAnimation from '../lib/titleAnimation';
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

  useEffect(() => {
    (async function getInitialData() {
      const res = await fetch(
        'https://api.cosmicjs.com/v1/8bb2aed0-5dad-11ea-877a-db64793940c4/objects?pretty=true&hide_metafields=true&type=projects&read_key=qJJ33zcHTXv1MqylVItzyNJb5G2QLlWFc0OKbMvj3WsaJrDBCM&limit=20&props=slug,title,content,metadata,'
      );
      const data = await res.json();
      setProjects(data.objects);
    })();
  }, []);

  if (!projects) return <></>;
  return (
    <motion.div initial='initial' animate='animate' className='page projects'>
      <div className='container'>
        <div className='row'>
          <TitleAnimation text={'PROJECTS'} />
          <div className='container center'>
            <motion.div variants={stagger} className='project-row'>
              {projects.map((project, i) => (
                <Link key={project.slug} to={`/projects/${project.slug}`}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='card'
                  >
                    <span className='category'>
                      {project.metadata.category}
                    </span>
                    <motion.img
                      src={project.metadata.thumbnail.url}
                      width={250}
                      transition={{ delay: 0.2 + 0.1 * i }}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    />
                    <div className='project-info'>
                      <h4>{project.title}</h4>
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
