import React, { useEffect, useState } from "react";
import gsap from "gsap";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.scss";

import Header from "./components/header";
import Home from "./pages/home";
import Projects from "./pages/projects";
import Approach from "./pages/approach";
import Services from "./pages/services";
import About from "./pages/about";
import { Switch, useLocation, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Contact from "./pages/contact";
import Project from "./pages/project";
import { CSSTransition } from "react-transition-group";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/projects", name: "Projects", Component: Projects },
  { path: "/projects/:id", name: "Project", Component: Project },
  { path: "/approach", name: "Approach", Component: Approach },
  { path: "/services", name: "Services", Component: Services },
  { path: "/about", name: "About Us", Component: About },
  { path: "/contact", name: "About Us", Component: Contact },
];

// const transitionRoutes = [
//   { path: "/projects", name: "Projects", Component: Projects },
//   { path: "/projects/:id", name: "Project", Component: Project },
//   { path: "/approach", name: "Approach", Component: Approach },
//   { path: "/services", name: "Services", Component: Services },
//   { path: "/about", name: "About Us", Component: About },
//   { path: "/contact", name: "About Us", Component: Contact },
// ];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {
  const location = useLocation();

  gsap.to("body", 0, { css: { visibility: "visible" } });
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    let vh = dimensions.height * 0.01;
    let vw = dimensions.width * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  return (
    <>
      <Header dimensions={dimensions} />
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path} exact>
            <div className="animation-page">
              <Component dimensions={dimensions} />
            </div>
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  );
}

export default App;
