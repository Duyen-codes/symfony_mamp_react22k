import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function ProjectEdit() {
  const [id, setId] = useState(useParams().id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/project/${id}`)
      .then(function (response) {
        let project = response.data;
        setName(project.name);
        setDescription(project.description);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    axios
      .patch(`/api/project/${id}`, {
        name: name,
        description: description,
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Project saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Edit Project</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All Project
            </Link>
          </div>
          <div className="card-body">
            <form action="">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  value={description}
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
              >
                Update Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectEdit;
