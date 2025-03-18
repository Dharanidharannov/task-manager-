import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(null);
  const [newDeptName, setNewDeptName] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    const access = sessionStorage.getItem("adminId");
    setAdmin(access);
  }, []);

  const fetchDepartments = async () => {
    setError("");
    try {
      const response = await axios.get("http://localhost:8000/departments");
      setDepartments(response.data);
    } catch (err) {
      setError("Error fetching departments.");
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/departments", {
        DeptName: newDeptName,
      });

      setMessage(response.data.message);
      setDepartments([...departments, response.data.department]);
      setNewDeptName("");
      setError("");
      setShowModal(false); 
    } catch (err) {
      setError("Error adding department.");
    }
  };

  return (
    <div className="container">
    <div className="flex justify-between">
    <h2 className=" mb-4">Our Departments</h2>

{message && <div className="alert alert-success">{message}</div>}
{error && <div className="alert alert-danger">{error}</div>}


{admin && (
  <button
    className="btn btn-success mb-4"
    onClick={() => setShowModal(true)} 
  >
    Add  Department
  </button>
)}

    </div>
      
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Department</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)} 
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddDepartment}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter department name"
                      value={newDeptName}
                      onChange={(e) => setNewDeptName(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100">
                    Add Department
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department List */}
      <div className="row">
        {departments.map((dept) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={dept._id}>
            <div className="card shadow-sm h-100">
              <img
                src={require("../Assest/Photo (1).png")}
                alt="department"
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{dept.DeptName}</h5>
                {admin && (
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => navigate(`/deptmember/${dept._id}`)}
                  >
                    View Members
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!departments.length && (
        <p className="text-center mt-5">No departments found.</p>
      )}
    </div>
  );
};

export default Departments;


