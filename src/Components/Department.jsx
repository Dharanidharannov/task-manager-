import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDeptEmployees, setSelectedDeptEmployees] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [admin,setAdmin] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    fetchDepartments();
    const access = sessionStorage.getItem("adminId")
    setAdmin(access)
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
    <div className="container mt-5 bg-pink-100">
      <h2>Our Departments</h2>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="row mt-4">
        {departments.map((dept) => (
          <div className="col-md-4 col-lg-3 mb-4" key={dept._id}>
            <div className="card shadow-sm p-2">
              <img
                src={require("../Assest/Photo (1).png")}
                alt="department"
                className="w-80"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{dept.DeptName}</h5>
               {admin && (
                 <button
                 className="btn btn-primary btn-sm"
                 onClick={()=>{
                  navigate(`/deptmember/${dept._id}`)
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

      {!departments.length && <p className="text-center">No departments found.</p>}
    </div>
  );
};

export default Departments;
