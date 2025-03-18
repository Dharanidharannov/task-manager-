import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Header() {
  return (
    <div className=" ml-10 sticky top-0 bg-white rounded-2xl"> 
      <Row className="justify-between px-4">
        <Col lg={1} xs={12} className="text-center text-lg-left d-flex align-items-lg-center">
          <h5 className="font-bold text-violet-950">Dashboard</h5>
        </Col>
        
        <Col lg={9} xs={12} className="d-flex align-items-center">
          <div className="flex flex-wrap justify-center lg:justify-end items-center mt-3 lg:mt-0 gap-4 ">
           
            <div className="relative lg:mr-4 mb-2 ml-96 lg:mb-0">
              <img 
                src={require('../../Assest/Search Icon.png')} 
                alt="Search Icon" 
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input 
                type="search" 
                name="search" 
                placeholder="Search" 
                className="pl-10 w-60 lg:w-72 h-10 rounded-3xl border border-violet-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            
            <img 
              src={require('../../Assest/Group 13.png')} 
              alt="Group Icon" 
              className="w-6 h-6 lg:w-[35px] lg:h-[35px] ml-1"
            />
            <p className="text-violet-950 font-bold">Super Ad</p>
            <img 
              src={require('../../Assest/app notification.png')} 
              alt="Notification Icon" 
              className="w-7 h-7 lg:w-[28px] lg:h-[30px]"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
