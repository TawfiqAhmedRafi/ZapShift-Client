import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-base-300 ">
      <header>
        <Navbar />
      </header>

      
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 lg:mt-10 px-4 md:px-0">
        <Outlet />
      </div>

     
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
