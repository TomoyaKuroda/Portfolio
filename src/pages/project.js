import React, { useEffect, useState, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../components/framerMotionAnimations';

//rsf
function Project() {
  const initialState = null;
  const [project, setProject] = useState(initialState);
  const params = useParams();

  useEffect(() => {
    (async function getInitialData() {
      const id = params.id;
      console.log('id', id);
      const res = await fetch(
        `https://api.cosmicjs.com/v1/8bb2aed0-5dad-11ea-877a-db64793940c4/object/${id}?pretty=true&hide_metafields=true&read_key=qJJ33zcHTXv1MqylVItzyNJb5G2QLlWFc0OKbMvj3WsaJrDBCM&props=slug,title,content,metadata,`
      );
      const project = await res.json();
      console.log('project', project);
      setProject(project.object);
    })();
  }, []);

  if (project === null) return <></>;
  return (
    <motion.div initial='initial' animate='animate'>
      <div className='page'>
        <div className='container'>
          <div className='row'>
            <div className='project'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='img'
              >
                <motion.img
                  src={project.metadata.thumbnail.url}
                  alt=''
                  transition={{ delay: 0.2 }}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                />
              </motion.div>
              <div className='project-details'>
                <motion.div variants={stagger} className='inner'>
                  <Link to='/projects'>
                    <motion.div variants={fadeInUp}>
                      <a href='/' className='go-back'>
                        Back to projects
                      </a>
                    </motion.div>
                  </Link>
                  <motion.div variants={fadeInUp}>
                    <span className='category'>
                      {project.metadata.category}
                    </span>
                  </motion.div>
                  <motion.h1 variants={fadeInUp}>{project.title}</motion.h1>
                  <motion.p variants={fadeInUp}>
                    <p dangerouslySetInnerHTML={{ __html: project.content }} />
                  </motion.p>
                  <motion.div variants={fadeInUp} className='btn-row'>
                    <button className='subscribe'>
                      <a
                        href={project.metadata.url}
                        target='_blank'
                        without
                        rel='noopener noreferrer'
                      >
                        Link
                      </a>
                    </button>
                  </motion.div>
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
