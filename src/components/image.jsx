import React, { useState, useRef } from "react";
import { motion, useDomEvent } from "framer-motion";

export const Image = ({ src, alt }) => {
  const [isOpen, setOpen] = useState(false);

  useDomEvent(useRef(window), "scroll", () => isOpen && setOpen(false));

  return (
    <div className={`image-container ${isOpen ? "open" : ""}`}>
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        className="shade"
        onClick={() => {
          console.log("called");
          setOpen(false);
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        onClick={() => {
          console.log("called");
          setOpen(!isOpen);
        }}
        layoutTransition
      />
    </div>
  );
};
