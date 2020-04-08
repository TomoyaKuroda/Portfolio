import React from "react";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";
import { NavLink } from "react-router-dom";
export default function Banner() {
  return (
    <section className="main">
      <div className="container">
        <div className="row">
          <h2>
            <div className="line">
              <span>Support my clients</span>
            </div>
            <div className="line">
              <span>toward achieving their goals.</span>
            </div>
          </h2>
          <div className="btn-row">
            <NavLink to="/about">
              More about me
              <RightArrow />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
