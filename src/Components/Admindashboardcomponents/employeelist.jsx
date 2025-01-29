import axios from "axios";
import React, { useEffect, useState } from "react";

function Employeelist() {
  const [formData, setFormData] = useState({
    Empname: "",
    EmpId: "",
    Dob: "",
    Phoneno: "",
    Email: "",
    Password: "",
    Department: "",
    Role: "",
    Reportingto: "",
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get("http://localhost:8000/departments");
        const roleResponse = await axios.get("http://localhost:8000/roles");
        const empResponse = await axios.get("http://localhost:8000/employees");

        setDepartments(deptResponse.data);
        setRoles(roleResponse.data);
        setEmployees(empResponse.data);
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

      alert("Employee added successfully!");
      setEmployees([...employees, response.data]);
      setFormData({
        Empname: "",
        EmpId: "",
        Dob: "",
        Phoneno: "",
        Email: "",
        Password: "",
        Department: "",
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee. Please try again.");
    }
  };



  return (
     <div className="p-4 lg:mx-24 mx-4 absolute top-3 left-20">
    <div className="flex flex-wrap justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Employee List</h1>
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add Employee
      </button>
    </div>

    <div className="border rounded-lg shadow-lg overflow-x-auto">
      <div className="min-w-max overflow-y-scroll">
        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">S.NO</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id} className="hover:bg-gray-100 ">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{emp.Empname}</td>
                <td className="px-4 py-2 border">{emp.Email}</td>
                <td className="px-4 py-2 border">{emp.Department ? emp.Department.DeptName : "N/A"}</td>
                <td className="px-4 py-2 border">{emp.Role ? emp.Role.RoleName : "N/A"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

export default Employeelist;


