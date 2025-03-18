import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar(){
  
  const navigate = useNavigate()
    return(
      <div>
              <div className="bg-white w-16 p-3 pt-4 rounded-2xl shadow-md position-fixed top-0 left-1 h-[100vh] ">
              <div  className="pointer">
                <img src={require('../../Assest/png-01 2 2.png')} alt="" />
               </div>
              <div className="mt-4  p-1  hover:bg-violet-950 rounded-xl">
                <img className="w-10" src={require('../../Assest/Fill 2.png')} alt="" />
               </div>
               <div className="mt-4  p-1 hover:bg-violet-950 rounded-xl">
                <img className="w-20" src={require('../../Assest/calendar favorite.png')} alt="" />
               </div>
               <div className="mt-4  p-1 hover:bg-violet-950 rounded-xl">
                <img className="w-20" src={require('../../Assest/businessman.png')} alt="" />
               </div>
               <div className="mt-4  p-1 hover:bg-violet-950 rounded-xl">
                <img className="w-20" src={require('../../Assest/cogwheel.png')} alt="" />
               </div>
               <div className="mt-3  p-1 hover:bg-violet-950 rounded-xl">
                <img className="w-20" src={require('../../Assest/task.png')} alt="" />
               </div>
               <div className="mt-4  p-1 hover:bg-violet-950 rounded-xl   ">
                <img onClick={()=>navigate('/')} className="w-20" src={require('../../Assest/power-sign.png')} alt="" />
               </div> 
               <hr className="mt-4" />
              </div>
        </div>
    )
}

export default Sidebar