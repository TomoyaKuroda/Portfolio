import React, { useEffect } from 'react';
import TitleAnimation from '../lib/titleAnimation';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { fadeInUp } from '../components/framerMotionAnimations';
import Model from '../components/model';
const About = () => {
  let tl = gsap.timeline();

  useEffect(() => {
    tl.to('.model', {
      // scale: 0.8,
      duration: 1,
      delay: 0.3,
      // height: '100%',
      y: 50,
      opacity: 1,
      ease: 'power3.inOut',
    }).to(
      '.description',
      {
        y: 50,
        duration: 0.5,
        opacity: 1,
      },
      0.9
    );
  });
  return (
    <div className='page'>
      <div className='container'>
        <div className='row'>
          <TitleAnimation text={'ABOUT ME'} />
          <div className='content-wrapper'>
            <div className='model'>
              {/* <img src={require('../assets/coding.jpg')} alt='coding' /> */}
              <Model />
            </div>
            <div className='description'>
              <p>
                I'm a Full Stack Developer and a graduate from Georgian College
                in Barrie, Ontario. I enjoy working with people and help clients
                achieve their goals.
                <br /> I have experience developing websites with React, Vue.js
                and WordPress, and mobile apps with Swift, Flutter and React
                Native.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
