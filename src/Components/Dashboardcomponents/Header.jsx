import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Header() {
  return (
    <div className="p-2 relative top-0 left-0 "> 
      <Row className="align-items-center">
        <Col lg={3} xs={12} className="text-center text-lg-left">
          <h3 className="font-bold text-violet-950 mt-2 lg:mt-4 lg:ml-36">Dashboard</h3>
        </Col>
        
        <Col lg={9} xs={12}>
          <div className="flex flex-wrap justify-center lg:justify-end items-center mt-3 lg:mt-0 gap-4 ">
           
            <div className="relative lg:mr-4 mb-2 ml-96 lg:mb-0">
              <img 
                src={require('../../Assest/Search Icon.png')} 
                alt="Search Icon" 
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input 
                type="search" 
                name="search" 
                placeholder="Search" 
                className="pl-10 w-60 lg:w-72 h-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            
            <img 
              src={require('../../Assest/Group 13.png')} 
              alt="Group Icon" 
              className="w-8 h-8 lg:w-[35px] lg:h-[35px] ml-1"
            />
            <p className="text-violet-950 font-bold">Super Ad</p>
            <img 
              src={require('../../Assest/app notification.png')} 
              alt="Notification Icon" 
              className="w-9 h-9 lg:w-[38px] lg:h-[38px]"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
