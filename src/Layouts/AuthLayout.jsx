import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      
      <div className="flex  h-full">
        
        
        <div className="flex-1 relative">
         
          <div className="absolute top-6 left-6">
            <Logo />
          </div>

          
          <div className="h-full flex justify-center items-center  ">
            <Outlet />
          </div>
        </div>

        
        <div className="flex-1 hidden md:flex justify-center items-center  bg-[#FAFDF0]">
          <img src={authImg} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
