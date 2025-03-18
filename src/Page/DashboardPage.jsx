import React from "react";
import Header from "../Components/Dashboardcomponents/Header";
import Sidebar from "../Components/Dashboardcomponents/Sidebar";

import TaskManager from "../Components/Task";
import EmployeeProject from "../Components/Dashboardcomponents/Employeeproject";

function Dashboard() {
  return (
    <div className="bg-pink-200 min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 ml-10">
        <Header />
        <div className="p-6 lg:pl-20 pt-32">
          <TaskManager />
          <EmployeeProject/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
