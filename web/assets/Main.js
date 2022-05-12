import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectShow from "./pages/ProjectShow";
import Layout from "./components/Layout";

function Main() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<ProjectList />} />
          <Route path="/create" element={<ProjectCreate />} />

          <Route path="/edit/:id" element={<ProjectEdit />} />

          <Route path="/show/:id" element={<ProjectShow />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Main;

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
