import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const [formData, setFormData] = useState({
    Empname: "",
    EmpId: "",
    Dob: "",
    Phoneno: "",
    Email: "",
    Password: "",
    Department: "",
    Role: "",
  });

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false)
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get("http://localhost:8000/departments");
        const roleResponse = await axios.get("http://localhost:8000/roles");

        setDepartments(deptResponse.data);
        setRoles(roleResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

      navigate('/admin-signin')
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed. Please try again.");
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen background">
   
     
        <form onSubmit={handleSubmit} className="space-y-3 w-96 bg-pink-200 p-4 rounded ml-96 absolute left-24">
        <h3 className="text-center text-2xl font-bold  text-blue-900">
          Admin Signup
        </h3>
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
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

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
            {departments.length > 0 ? (
              departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.DeptName}
                </option>
              ))
            ) : (
              <option value="">No departments available</option>
            )}
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
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
      </div>

  );
}

export default AdminSignup;
