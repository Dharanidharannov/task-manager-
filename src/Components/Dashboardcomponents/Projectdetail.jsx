import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  if (!project) return <div>Loading project details...</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <div className="mb-4">
        <strong>Project Name:</strong> {project.ProjectName}
      </div>
      <div className="mb-4">
        <strong>Assigned By:</strong> {project.Assignedby?.Empname}
      </div>
      <div className="mb-4">
        <strong>Assigned To:</strong> {project.Assignedto.map((employee) => employee.Empname).join(", ")}
      </div>
      <div className="mb-4">
        <strong>Status:</strong> {project.Status}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {project.ProjectDescription}
      </div>
      <div className="mb-4">
        <strong>Duedate:</strong> {project.DueDate}
      </div>
      <div className="mb-4">
        <strong>CreatedDate:</strong> {project.CreatedDate}
      </div>
      <button>Add Subproject</button>
    </div>
  );
}

export default ProjectDetail;
