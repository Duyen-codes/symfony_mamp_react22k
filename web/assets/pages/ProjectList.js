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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, please delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/project/${id}`).then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Project deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Symfony Project Manager App</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/create">
              Create New Project
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectList;
