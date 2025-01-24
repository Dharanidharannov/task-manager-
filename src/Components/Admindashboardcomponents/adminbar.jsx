import React, { useState } from "react";
import Employeelist from "./employeelist";
import Project from "./Project";
import { useNavigate } from "react-router-dom";

function Adminbar() {
  const [activeComponent, setActiveComponent] = useState(true);
  let navigate = useNavigate()

  const handleComponentToggle = (componentName) => {
    setActiveComponent((prev) => (prev === componentName ? true : componentName));
  };

  return (
    <div className="absolute top-5 left-5 md:left-8 lg:left-10 xl:left-12">
      <div className="bg-white w-16 h-auto p-3 rounded-2xl shadow-md">
        <div className="pointer">
          <img src={require("../../Assest/png-01 2 2.png")} alt="Logo" className="w-12 mx-auto" />
        </div>
        <div className="mt-4 p-1 hover:bg-violet-950 rounded-xl">
          <img className="w-10 mx-auto" src={require("../../Assest/Fill 2.png")} 
          alt="Icon" />
        </div>
        <div className="mt-4 p-1 hover:bg-violet-950 rounded-xl cursor-pointer">
          <img className="w-12 mx-auto" src={require("../../Assest/calendar favorite.png")} alt="Icon" />
        </div>
        <div
          className="mt-4 p-1 hover:bg-violet-950 rounded-xl cursor-pointer"
          onClick={() => handleComponentToggle("EmployeeList")}
        >
          <img
            className="w-12 mx-auto "
            src={require("../../Assest/businessman.png")}
            alt="Employee List Icon"
          />
        </div>
        <div className="mt-4 p-1 hover:bg-violet-950 rounded-xl">
          <img className="w-12 mx-auto" src={require("../../Assest/cogwheel.png")} alt="Settings Icon" />
        </div>
        <div
          className="mt-3 p-1 hover:bg-violet-950 rounded-xl"
          onClick={() => handleComponentToggle("Project")}
        >
          <img
            className="w-12 mx-auto"
            src={require("../../Assest/task.png")}
            alt="Project List Icon"
          />
        </div>
        <div className="mt-4 p-1 hover:bg-violet-950 rounded-xl">
          <img
            onClick={() => {
              sessionStorage.removeItem("adminId")
              setActiveComponent(null)
              navigate('/')
              
            }}
            className="w-12 mx-auto"
            src={require("../../Assest/power-sign.png")}
            alt="Logout Icon"
          />
        </div>
        <hr className="mt-4" />
      </div>

      {/* Conditionally render components based on the activeComponent state */}
      {activeComponent === "EmployeeList" && (
        <div className="mt-8 ml-20">
          <Employeelist />
        </div>
      )}
      {activeComponent === "Project" && (
        <div className="mt-8 ml-20">
          <Project />
        </div>
      )}
    </div>
  );
}

export default Adminbar;


