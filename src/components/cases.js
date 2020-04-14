import React, { useState, useEffect, Suspense } from 'react';
import { ReactComponent as CasesNext } from '../assets/arrow-right.svg';
import { ReactComponent as CasesPrev } from '../assets/arrow-left.svg';
import Button from '@bit/react-bootstrap.react-bootstrap.button';
import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import ButtonToolbar from '@bit/react-bootstrap.react-bootstrap.button-toolbar';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import { Image } from './image';

export default function Cases({ projects }) {
  const [modalShow, setModalShow] = useState(false);
  let caseStudies = [
    {
      id: 1,
      subTitle: 'Landing Page',
      title: 'ARchemisT',
      img: 'ARchemisT-min',
    },
    {
      id: 2,
      subTitle: 'WordPress',
      title: 'assist on',
      img: 'assist-on-min',
    },
    {
      id: 3,
      subTitle: 'Full Stack Application',
      title: 'Chat App',
      img: 'lumin-min',
    },
  ];

  // const [projects, setProjects] = useState();

  // useEffect(() => {
  //   (async function getInitialData() {
  //     const res = await fetch(
  //       'https://api.cosmicjs.com/v1/8bb2aed0-5dad-11ea-877a-db64793940c4/objects?pretty=true&hide_metafields=true&type=projects&read_key=qJJ33zcHTXv1MqylVItzyNJb5G2QLlWFc0OKbMvj3WsaJrDBCM&limit=20&props=slug,title,content,metadata,'
  //     );
  //     const data = await res.json();
  //     setProjects(data.objects);
  //   })();
  // }, []);
  return (
    <section className='cases'>
      <div className='container-fluid'>
        <div className='cases-navigation'>
          <div className='cases-arrow prev disabled'>
            <CasesPrev />
          </div>
          <div className='cases-arrow next disabled'>
            <CasesNext />
          </div>
        </div>
        <div className='row'>
          {projects.map((caseItem) => (
            <div
              className='case'
              key={caseItem.title}
              onClick={() => setModalShow(true)}
            >
              <div className='case-details'>
                <span>{caseItem.metadata.category}</span>
                <h2>{caseItem.title}</h2>
              </div>
              <div className='case-image'>
                <img
                  src={caseItem.metadata.thumbnail.url}
                  alt={caseItem.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
