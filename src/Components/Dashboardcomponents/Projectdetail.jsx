import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [subprojects, setSubprojects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subproject, setSubproject] = useState({
    TaskName: "",
    TaskDescription: "",
    Assignedby: sessionStorage.getItem("empId"),
    Assignedto: [],
    DueDate: "",
    CreatedDate: new Date().toISOString().split("T")[0],
    Status: "Pending",
    review: "",
    projectId: sessionStorage.getItem("projectId"),
  });

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const projectResponse = await axios.get(
          `http://localhost:8000/projects/${projectId}`
        );
        setProject(projectResponse.data);
      } catch (err) {
        setError("Error fetching project details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSubprojects = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/subprojects?projectId=${projectId}`
        );
        setSubprojects(data);
      } catch (err) {
        setError("Error fetching subprojects. Please try again later.");
      }
    };

    if (projectId) {
      fetchProjectDetails();
      fetchSubprojects();
    }
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubproject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignedToChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSubproject((prev) => ({ ...prev, Assignedto: selectedOptions }));
  };

  const handleStatusChange = async (subprojectId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/subprojects/${subprojectId}`,
        { Status: newStatus }
      );
      setSubprojects((prevSubprojects) =>
        prevSubprojects.map((sub) =>
          sub._id === subprojectId ? { ...sub, Status: newStatus } : sub
        )
      );
    } catch (err) {
      setError("Error updating status. Please try again.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subproject.Assignedto.length === 0) {
      alert("Please select at least one employee to assign the task.");
      return;
    }
  
    try {
     await axios.post("http://localhost:8000/subprojects", {
        ...subproject,
        projectId,
      });
  
      setShowForm(false);
  
      
      const updatedSubprojects = await axios.get(
        `http://localhost:8000/subprojects?projectId=${projectId}`
      );
      setSubprojects(updatedSubprojects.data);
    } catch (err) {
      setError("Error adding subproject. Please try again.");
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-pink-200 min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 ">
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6 w-96 ml-20">
          <h1 className="text-2xl font-bold mb-4">Project Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <strong>Project Name:</strong>
              <p className="text-gray-700">{project.ProjectName}</p>
            </div>
            <div>
              <strong>Assigned By:</strong>
              <p className="text-gray-700">
                {project.Assignedby?.Empname || "N/A"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <strong>Assigned To:</strong>
              <p className="text-gray-700">
                {project.Assignedto?.map((emp) => emp.Empname).join(", ") ||
                  "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-20"> 
          <h2 className="text-xl font-bold mb-4">Subprojects</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mb-4"
          >
            Add Subproject
          </button>
          {subprojects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-4 border-b">Task Name</th>
                    <th className="text-left p-4 border-b">Assigned by</th>
                    <th className="text-left p-4 border-b">Assigned To</th>
                    <th className="text-left p-4 border-b">Status</th>
                    <th className="text-left p-4 border-b">Due Date</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subprojects.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-50">
                      <td className="p-4 border-b">{sub.TaskName}</td>
                      <td className="p-4 border-b">
                        {sub.Assignedby?.Empname}
                      </td>
                      <td className="p-4 border-b">
                        {sub.Assignedto?.map((emp) => emp.Empname).join(", ") ||
                          "N/A"}
                      </td>
                      <td className="p-4 border-b">{sub.Status}</td>
                      <td className="p-4 border-b">{sub.DueDate.slice(0, 10)}</td>
                      <td className="px-4 py-2 border">
                        <select
                          value={sub.Status}
                          onChange={(e) =>
                            handleStatusChange(sub._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded"
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
          ) : (
            <p className="text-gray-700">No subprojects available for this project.</p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-bold mb-4">Add Subproject</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Task Name:
                </label>
                <input
                  type="text"
                  name="TaskName"
                  value={subproject.TaskName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Task Description:
                </label>
                <textarea
                  name="TaskDescription"
                  value={subproject.TaskDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Assigned To:
                </label>
                <select
                  name="Assignedto"
                  multiple
                  value={subproject.Assignedto}
                  onChange={handleAssignedToChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  {project.Assignedto?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.Empname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Due Date:
                </label>
                <input
                  type="date"
                  name="DueDate"
                  value={subproject.DueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;


