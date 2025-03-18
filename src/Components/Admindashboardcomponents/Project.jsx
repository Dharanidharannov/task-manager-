import axios from "axios";
import React, { useEffect, useState } from "react";

function Project() {
  const [formData, setFormData] = useState({
    ProjectName: "",
    ProjectDescription: "",
    Assignedby: "",
    Assignedto: [],
    DueDate: "",
    Status: "",
  });

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get("http://localhost:8000/employees");
        const projectResponse = await axios.get("http://localhost:8000/projects");

        setEmployees(employeeResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignedToChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, Assignedto: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:8000/projects", formData);
  
      alert("Project added successfully!");
  
      setProjects([response.data.project, ...projects]);
  
      setFormData({
        ProjectName: "",
        ProjectDescription: "",
        Assignedby: "",
        Assignedto: [],
        DueDate: "",
        Status: "",
      });
      setShowForm(false);
    } catch (error) {
      setError(error.response?.data?.error || "Error adding project. Please try again.");
      console.error("Error during project creation:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="  items-center mb-6">
      <h1 className="text-3xl font-bold mb-6">Project List</h1>
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>

      <div className="border rounded-lg shadow-lg overflow-x-auto">
        <div className="min-w-max overflow-y-scroll">
          <table className="w-full text-left bg-white shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">S.NO</th>
                <th className="px-4 py-2 border">Project Name</th>
                <th className="px-4 py-2 border">Assigned By</th>
                <th className="px-4 py-2 border">Assigned To</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{project.ProjectName}</td>
                  <td className="px-4 py-2 border">{project.Assignedby.Empname}</td>
                  <td className="px-4 py-2 border">
                    {project.Assignedto.map((emp) => emp.Empname).join(", ")}
                  </td>
                  <td className="px-4 py-2 border">{project.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 p-4 overflow-y-scroll">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Add Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="ProjectName"
                placeholder="Project Name"
                value={formData.ProjectName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <textarea
                name="ProjectDescription"
                placeholder="Project Description"
                value={formData.ProjectDescription}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <select
                name="Assignedby"
                value={formData.Assignedby}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Assigned By</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.Empname}
                  </option>
                ))}
              </select>
              <select
                name="Assignedto"
                multiple
                value={formData.Assignedto}
                onChange={handleAssignedToChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Assigned To</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.Empname}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="DueDate"
                value={formData.DueDate}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <select
                name="Status"
                value={formData.Status}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Project"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full py-2 mt-4 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Project;
