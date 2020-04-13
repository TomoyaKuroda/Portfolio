import React, { useEffect, useState } from 'react';
import IntroOverlay from '../components/introOverlay';
import Banner from '../components/banner';
import Cases from '../components/cases';
import gsap from 'gsap';

const tl = gsap.timeline();
const homeAnimation = (completeAnimation) => {
  tl.to('.line span', 0, { css: { display: 'block' } })
    .from('.line span', 1.8, {
      y: 100,
      ease: 'power4.out',
      delay: 1,
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
    })
    .to('.overlay-top', 1.6, {
      height: 0,
      ease: 'expo.inOut',
      stagger: 0.4,
    })
    .to('.overlay-bottom', 1.6, {
      width: 0,
      ease: 'expo.inOut',
      delay: -0.8,
      stagger: {
        amount: 0.4,
      },
    })
    .to('.intro-overlay', 0, { css: { display: 'none' } })
    .from('.case-image img', 1.6, {
      scale: 1.4,
      ease: 'expo.inOut',
      delay: -2,
      stagger: {
        amount: 0.4,
      },
      onComplete: completeAnimation,
    });
};
const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [projects, setProjects] = useState([]);

  const completeAnimation = () => {
    setAnimationComplete(true);
  };
  useEffect(() => {
    (async function getInitialData() {
      const res = await fetch(
        'https://api.cosmicjs.com/v1/8bb2aed0-5dad-11ea-877a-db64793940c4/objects?pretty=true&hide_metafields=true&type=projects&read_key=qJJ33zcHTXv1MqylVItzyNJb5G2QLlWFc0OKbMvj3WsaJrDBCM&limit=20&props=slug,title,content,metadata,'
      );
      const data = await res.json();
      setProjects(data.objects);
      homeAnimation(completeAnimation);
    })();
  }, []);

  if (!projects) return null;
  return (
    <>
      {animationComplete === false ? <IntroOverlay /> : ''}
      <Banner />
      <Cases projects={projects} />
    </>
  );
};

export default Home;
