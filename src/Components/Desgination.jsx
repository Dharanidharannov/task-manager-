import React, { useEffect, useState } from "react";
import axios from "axios";


function Desgination(){
    const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchDepartments();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/roles");
      setRoles(response.data);
    } catch (err) {
      setError("Error fetching roles.");
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/departments");
      setDepartments(response.data);
    } catch (err) {
      setError("Error fetching departments.");
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!roleName || !selectedDept) {
      setError("Role Name and Department are required.");
      return;
    }

    try {
      if (selectedRole) {
      
        const response = await axios.put(`http://localhost:8000/roles/${selectedRole._id}`, {
          RoleName: roleName,
          DeptName: selectedDept,
        });
        setMessage(response.data.message);
        setSelectedRole(null);
      } else {
      
        const response = await axios.post("http://localhost:8000/roles", {
          RoleName: roleName,
          DeptName: selectedDept,
        });
        setMessage(response.data.message);
      }
      setRoleName("");
      setSelectedDept("");
      setShowForm(false);
      fetchRoles();
    } catch (err) {
      setError("Error saving role.");
    }
  };

  const handleEdit = (role) => {
    setRoleName(role.RoleName);
    setSelectedDept(role.DeptName?._id || "");
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");
    try {
      await axios.delete(`http://localhost:8000/roles/${id}`);
      setMessage("Role deleted successfully.");
      fetchRoles();
    } catch (err) {
      setError("Error deleting role.");
    }
  };

  return (
    <div className="container mt-5 bg-pink-100">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Roles Management</h2>
        <button
          className="bg-white p-1 rounded-xl"
          onClick={() => {
            setSelectedRole(null);
            setRoleName("");
            setSelectedDept("");
            setShowForm(true);
          }}
        >
          + Add New
        </button>
      </div>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

     
      {showForm && (
        <form onSubmit={handleAddOrUpdate} className="mt-4">
          <div className="mb-3">
            <label htmlFor="roleName" className="form-label">
              Role Name
            </label>
            <input
              type="text"
              className="form-control"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              className="form-control"
              id="department"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.DeptName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {selectedRole ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

     
      <div className="row mt-4">
        {roles.map((role) => (
          <div className="col-md-4 col-lg-3 mb-4" key={role._id}>
            <div className="card shadow-sm">
              
              <div className="card-body text-center">
                <h5 className="card-title">{role.RoleName}</h5>
                <p className="card-text">
                  Department: {role.DeptName?.DeptName || "N/A"}
                </p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(role)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(role._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!roles.length && <p className="text-center">No roles found.</p>}
    </div>
  );
};

export default Desgination