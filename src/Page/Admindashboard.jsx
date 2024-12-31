import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Adminbar from "../Components/Admindashboardcomponents/adminbar";

function Admindashboard() {
  const navigate = useNavigate();

  useEffect(() => {
     const userLoggedIn = sessionStorage.getItem("adminId");
     if (!userLoggedIn) {
       navigate("/");
     }
   }, [navigate]);

  return (
    <div className="bg-pink-200 min-h-screen flex flex-col lg:flex-row">
      <Adminbar />
    </div>
  );
}

export default Admindashboard;


