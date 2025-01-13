import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [subprojects, setSubprojects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subproject, setSubproject] = useState({
    TaskName: "",
    TaskDescription: "",
    Assignedby: sessionStorage.getItem("empId"),
    Assignedto: [],
    DueDate: "",
    CreatedDate: new Date().toISOString().split("T")[0],
    Status: "Pending",
    review: "",
  });
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectResponse = await axios.get(
          `http://localhost:8000/projects/${projectId}`
        );
        setProject(projectResponse.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    const fetchSubprojects = async () => {
      try {
        const subprojectsResponse = await axios.get(
          `http://localhost:8000/subprojects/${projectId}`
        );
        setSubprojects(subprojectsResponse.data);
      } catch (error) {
        console.error("Error fetching subprojects:", error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
      fetchSubprojects();
    }
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubproject({ ...subproject, [name]: value });
  };

  const handleAssignedToChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSubproject({ ...subproject, Assignedto: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subproject.Assignedto.length === 0) {
      alert("Please select at least one employee to assign the task.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/subprojects",
        subproject
      );

      setSubprojects((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding subproject:", error.response?.data || error);
    }
  };

  if (!project)
    return <div className="text-center p-10">Loading project details...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-center mb-8">Project Details</h1>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <strong>Project Name:</strong>
          <p className="text-gray-700">{project.ProjectName}</p>
        </div>
        <div>
          <strong>Assigned By:</strong>
          <p className="text-gray-700">{project.Assignedby?.Empname || "N/A"}</p>
        </div>
        <div>
          <strong>Assigned To:</strong>
          <p className="text-gray-700">
            {project.Assignedto?.map((employee) => employee.Empname).join(", ") || "N/A"}
          </p>
        </div>
        <div className="col-span-2">
          <strong>Description:</strong>
          <p className="text-gray-700">{project.ProjectDescription}</p>
        </div>
        <div>
          <strong>Due Date:</strong>
          <p className="text-gray-700">{project.DueDate}</p>
        </div>
      </div>

      {/* Subprojects Table */}
      {subprojects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Subprojects</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Task Name</th>
                <th className="p-3 border">Assigned To</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {subprojects.map((sub) => (
                <tr key={sub._id}>
                  <td className="p-3 border">{sub.TaskName}</td>
                  <td className="p-3 border">
                    {sub.Assignedto?.map((emp) => emp.Empname).join(", ") || "N/A"}
                  </td>
                  <td className="p-3 border">{sub.Status}</td>
                  <td className="p-3 border">{sub.DueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Subproject Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Add Subproject
        </button>
      </div>

      {/* Subproject Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-h-[80vh] overflow-auto">
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
                  {project.Assignedto?.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.Empname}
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
              <div className="flex justify-end space-x-4">
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

