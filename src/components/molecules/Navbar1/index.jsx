import NavItem from "../../atoms/NavItem";
import MyImage from "../../atoms/Image";
import SearchBar from "../../atoms/SearchBar";
import Button from "../../atoms/Button";
import React, { useState } from "react";
import "./Navbar1.css";

import ProfileDrop from "../../atoms/ProfileDrop";
import AutoRotatableCard from "../rotate";

const Navbar1 = ({ cart }) => {
  return (
    <div style={{}}>
      <nav
        style={{ margin: "10px", backgroundColor: 'transparent' }} 
        id="d"
        className="navbar navbar-expand-lg navbar fixed-top bg-body-tertiary custom-navbar"
      >
        <div id="bar" className="container-fluid">
          <a className="navbar-brand" href="/">
            <MyImage />
          </a>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <ProfileDrop/>
              <NavItem id={"home"} name={"Dr.pet"} path={"/"} />
              <NavItem id={"nav"} name={"Dog"} path={"/Dog"} />
              <NavItem id={"nav"} name={"Cat"} path={"/Cat"} />
              <NavItem id={"nav"} name={"Bird"} path={"/Bird"} />
              <u>
                <NavItem id={"reg"} name={"Sign In"} path={"/SignIn "} />
                
              </u>
              <u>
                <NavItem id={"reg"} name={"Log In"} path={"/LogIn "} />
                </u>
            </ul>
            <AutoRotatableCard/>
            <a href="/Noti">
              <button
                style={{
                  width: "150px",
                  height: "35px",
                  marginTop: "8px",
                  marginBottom: "8px",
                  fontSize: "15px",
                  backgroundColor: "#000080",
                  borderColor: "white",
                  marginRight:"10px"
                }}
                id="noti"
                type="button"
                className="btn btn-primary"
              >
                

                Notifications{" "}
                <span className="badge text-bg-secondary">1</span>
              </button>
            </a>
            
            <form className="d-flex" role="search">
              <SearchBar />
              <Button id={"b1"} />
              
            </form>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar1;

