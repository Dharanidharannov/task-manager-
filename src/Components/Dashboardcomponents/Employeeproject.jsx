import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

function EmployeeProject() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const employeeId = sessionStorage.getItem("empId");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProjects = async () => {
      if (!employeeId) {
        setError("Employee ID is missing.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/employees/${employeeId}/projects`);
        console.log("Fetched Projects:", response.data.projects);
        setProjects(response.data.projects);
      } catch (error) {
        setError("Error fetching projects.");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [employeeId]);

  const handleStatusUpdate = async (projectId, status) => {
    try {
      setLoading(true);

      const response = await axios.put(`http://localhost:8000/projects/${projectId}`, { Status: status });

      if (response.data && response.data.project) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.projectId === projectId ? { ...project, Status: status } : project
          )
        );
        alert("Status updated successfully!");
      } else {
        setError("Error updating project status.");
      }
    } catch (error) {
      setError("Error updating project status.");
      console.error("Error updating project status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project-detail/${projectId}`); 
  };

  return (
    <div className="p-5 lg:mx-20 mx-4">
      <h1 className="text-3xl font-bold mb-6">Employee Project</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading && <div className="text-blue-600">Loading projects...</div>}

      {projects.length === 0 && !loading && !error && (
        <div>No projects found for this employee.</div>
      )}

      <div className="border rounded-lg shadow-lg overflow-x-auto">
        <div className="min-w-max">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">S.NO</th>
                <th className="px-4 py-2 border">Project Name</th>
                <th className="px-4 py-2 border">Assigned By</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.projectId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td
                    className="px-4 py-2 border text-blue-500 cursor-pointer"
                    onClick={() => handleProjectClick(project.projectId)} 
                  >
                    {project.projectName}
                  </td>
                  <td className="px-4 py-2 border">{project.assignedBy?.Empname}</td>
                  <td className="px-4 py-2 border">{project.Status}</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={project.Status}
                      onChange={(e) => handleStatusUpdate(project.projectId, e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProject;
