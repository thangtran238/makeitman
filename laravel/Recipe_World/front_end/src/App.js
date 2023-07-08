import React from "react";
import "./App.css";

import "@fortawesome/fontawesome-free";
import LogRocket from "logrocket";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
function App() {
  const currentPage = window.location.href;
  const tailPage = currentPage.substring(currentPage.lastIndexOf("/") + 1);

  LogRocket.init("hjb3fu/recipe-world");

  console.log(tailPage);

  const reRenderContent = (paths) =>
    paths.map((path, index) => (
      <Route
        key={index}
        path={path.path}
        index={path.index}
        element={path.element}
      />
    ));
  return (
    <BrowserRouter className="container-fluid">
      <Routes>{reRenderContent(routes)}</Routes>
    </BrowserRouter>
  );
}

export default App;
