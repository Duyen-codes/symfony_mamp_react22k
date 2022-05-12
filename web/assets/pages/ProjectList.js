import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function ProjectList() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    axios
      .get("/api/project")
      .then(function (response) {
        setProjectList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default ProjectList;
