import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import logo from "./assets/dr-logo-for-light-bg.svg";
import smallLogo from "/favicon.png";

axios.defaults.baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.BASE_URL
    : "http://localhost:8080";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching deployments:", error));
  }, []);

  return (
    <>
      <div className="container">
        <img src={smallLogo} width="24" height="24" alt="Logo" />
        <h1>Custom application with Node.js and React as the frontend.</h1>
        <ul>
          {projects?.map((project) => (
            <li>
              <div>
                <a target="_blank" href={`/projects/${project.id}`}>
                  {project.projectName}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <img src={logo} alt="Logo" />
    </>
  );
};

export default App;
