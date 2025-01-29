import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState([]);

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

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Our Departments</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {departments.map((dept) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={dept._id}>
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
                    onClick={() => {
                      navigate(`/deptmember/${dept._id}`);
                    }}
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
