import React, { useContext, useEffect } from "react";
import Employeelist from "./employeelist";
import Project from "./Project";
import { useNavigate } from "react-router-dom";
import Departments from "../Department";
import { AppStorage } from "../../Context/AppStore";

function Adminbar() {
  const { active, setActive } = useContext(AppStorage);
  let navigate = useNavigate();

  useEffect(() => {
    const storedActive = sessionStorage.getItem("activeComponent");
    if (storedActive) {
      setActive(storedActive);
    }
  }, [setActive]); 
  

  const handleComponentToggle = (componentName) => {
    const newActive = active === componentName ? "" : componentName;
    setActive(newActive);
    sessionStorage.setItem("activeComponent", newActive); 
  };

  return (
    <div className="d-flex container-fluid">
    <div className="bg-white w-16 p-3 pt-4 rounded-2xl shadow-md position-fixed top-0 left-1 h-[100vh]">
        <div className="pointer">
          <img src={require("../../Assest/png-01 2 2.png")} alt="Logo" className="w-12 mx-auto" />
        </div>
        <div
          className={`mt-4 p-1 rounded-xl cursor-pointer ${active === "Department" ? "bg-violet-900" : "hover:bg-violet-500"}`}
          onClick={() => handleComponentToggle("Department")}
        >
          <img className="w-10 mx-auto" src={require("../../Assest/Fill 2.png")} alt="Icon" />
        </div>
        <div className="mt-4 p-1  rounded-xl cursor-pointer">
          <img className="w-12 mx-auto" src={require("../../Assest/calendar favorite.png")} alt="Icon" />
        </div>
        <div
          className={`mt-4 p-1 rounded-xl cursor-pointer ${active === "EmployeeList" ? "bg-violet-900" : "hover:bg-violet-500"}`}
          onClick={() => handleComponentToggle("EmployeeList")}
        >
          <img className="w-12 mx-auto" src={require("../../Assest/businessman.png")} alt="Employee List Icon" />
        </div>
        <div className="mt-4 p-1  rounded-xl">
          <img className="w-12 mx-auto" src={require("../../Assest/cogwheel.png")} alt="Settings Icon" />
        </div>
        <div
          className={`mt-3 p-1 rounded-xl cursor-pointer ${active === "Project" ? "bg-violet-900" : "hover:bg-violet-500"}`}
          onClick={() => handleComponentToggle("Project")}
        >
          <img className="w-12 mx-auto" src={require("../../Assest/task.png")} alt="Project List Icon" />
        </div>
        <div className="mt-4 p-1 rounded-xl">
          <img
            onClick={() => {
              sessionStorage.removeItem("adminId");
              setActive(null);
              localStorage.removeItem("activeComponent");
              navigate("/");
            }}
            className="w-12 mx-auto"
            src={require("../../Assest/power-sign.png")}
            alt="Logout Icon"
          />
        </div>
        <hr className="mt-4" />
      </div>

      <div className=" py-4 w-[98%] ml-16">
      
      {active === "EmployeeList" && (
        <div className="w-full p-3 ">
          <Employeelist />
        </div>
      )}
      {active === "Project" && (
        <div className="">
          <Project />
        </div>
      )}
      {active === "Department" && (
        <div className="">
          <Departments />
        </div>
      )}
      </div>
    </div>
  );
}

export default Adminbar;


