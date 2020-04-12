import React, { useState } from "react";
import { ReactComponent as CasesNext } from "../assets/arrow-right.svg";
import { ReactComponent as CasesPrev } from "../assets/arrow-left.svg";
import Button from "@bit/react-bootstrap.react-bootstrap.button";
import Modal from "@bit/react-bootstrap.react-bootstrap.modal";
import ButtonToolbar from "@bit/react-bootstrap.react-bootstrap.button-toolbar";
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import { Image } from "./image";

const caseStudies = [
  {
    id: 1,
    subTitle: "Landing Page",
    title: "ARchemisT",
    img: "ARchemisT-min",
  },
  {
    id: 2,
    subTitle: "WordPress",
    title: "assist on",
    img: "assist-on-min",
  },
  {
    id: 3,
    subTitle: "Full Stack Application",
    title: "Chat App",
    img: "lumin-min",
  },
];
export default function Cases() {
  const [modalShow, setModalShow] = useState(false);

  // function MyVerticallyCenteredModal(props) {
  //   return (
  //     <Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Modal heading
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <h4>Centered Modal</h4>
  //         <p>
  //           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
  //           ac consectetur ac, vestibulum at eros.
  //         </p>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }

  return (
    <section className="cases">
      {/* <ReactBootstrapStyle /> */}
      <div className="container-fluid">
        <div className="cases-navigation">
          <div className="cases-arrow prev disabled">
            <CasesPrev />
          </div>
          <div className="cases-arrow next">
            <CasesNext />
          </div>
        </div>
        <div className="row">
          {caseStudies.map((caseItem) => (
            <div
              className="case"
              key={caseItem.id}
              onClick={() => setModalShow(true)}
            >
              <div className="case-details">
                <span>{caseItem.subTitle}</span>
                <h2>{caseItem.title}</h2>
              </div>
              <div className="case-image">
                <img
                  src={require(`../assets/${caseItem.img}.png`)}
                  alt={caseItem.title}
                />
              </div>
            </div>
          ))}
          {/* <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          /> */}
        </div>
      </div>
    </section>
  );
}
