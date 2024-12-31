import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Deptmember() {
  const { id } = useParams();
  const [selectedDeptEmployees, setSelectedDeptEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [formData, setFormData] = useState({
    Empname: "",
    EmpId: "",
    Dob: "",
    Phoneno: "",
    Email: "",
    Password: "",
    Department: id,
    Role: "",
    Reportingto: "",
  });
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  let navigate = useNavigate();

  const fetchDepartmentMembers = async () => {
    setError("");
    setMessage("");
    setSelectedDeptEmployees([]);
    setShowForm(false);

    try {
      const response = await axios.get(
        `http://localhost:8000/departments/${id}/members`
      );

      console.log("Department Members", response.data);
      setSelectedDeptEmployees(response.data);
      setShowMembers(true);
    } catch (err) {
      setError("Error fetching department members.");
    }
  };

  const fetchDepartmentsAndRoles = async () => {
    try {
      const deptResponse = await axios.get("http://localhost:8000/departments");
      setDepartments(deptResponse.data);

      const roleResponse = await axios.get("http://localhost:8000/roles");
      setRoles(roleResponse.data);

      const empResponse = await axios.get("http://localhost:8000/employees");       
      setEmployees(empResponse.data)
    } catch (err) {
      setError("Error fetching departments or roles.");
    }
  };

  useEffect(() => {
    fetchDepartmentMembers();
    fetchDepartmentsAndRoles();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSubmit = new FormData();

      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      if (image) {
        formDataToSubmit.append("image", image);
      }

      const response = await axios.post("http://localhost:8000/employees", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Employee added successfully!");
      setEmployees([...employees, response.data]);
      setFormData({
        Empname: "",
        EmpId: "",
        Dob: "",
        Phoneno: "",
        Email: "",
        Password: "",
        Department: id, 
        Role: "",
        Reportingto: "",
      });
      setImage(null);
      setShowForm(false);
    } catch (error) {
      setError(error.response?.data?.error || "Error adding employee. Please try again.");
      console.error("Error during employee creation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {showMembers && (
        <div>
          <h3 className="text-center mb-4">Department Members</h3>
          <button className="bg-blue-700 rounded-lg p-2 mb-1" onClick={() => setShowForm(true)}>
            Add Employee
          </button>
          {selectedDeptEmployees.length > 0 ? (
            <div className="row">
              {selectedDeptEmployees.map((employee) => (
                <div key={employee._id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{employee.Empname}</h5>
                      <p className="card-text">ID: {employee.EmpId}</p>
                      <p className="card-text">Email: {employee.Email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No employees found for this department.</p>
          )}
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/profile")}>
              Back to Departments
            </button>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 p-4 overflow-y-scroll">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="Empname"
                placeholder="Employee Name"
                value={formData.Empname}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="EmpId"
                placeholder="Employee ID"
                value={formData.EmpId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="date"
                name="Dob"
                value={formData.Dob}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="Phoneno"
                placeholder="Phone Number"
                value={formData.Phoneno}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="email"
                name="Email"
                placeholder="Email Address"
                value={formData.Email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border p-2 w-full rounded"
              />
              <select
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.DeptName}
                  </option>
                ))}
              </select>
              <select
                name="Role"
                value={formData.Role}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.RoleName}
                  </option>
                ))}
              </select>
              <select
                name="Reportingto"
                value={formData.Reportingto}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Reporting To</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.Empname}
                  </option>
                ))}
              </select>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Employee"}
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
  );
}

export default Deptmember;
