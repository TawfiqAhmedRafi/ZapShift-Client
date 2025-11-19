import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import error from "../../assets/404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
   <div className=" flex flex-col">
  <header>
    <Navbar />
  </header>

  <main className="grow flex flex-col items-center justify-center my-10 md:my-20 text-center">
    <img src={error} alt="Error" className="mb-6" />
    <Link className="btn btn-primary" to="/">Go Home</Link>
  </main>

  <footer>
    <Footer />
  </footer>
</div>
  );
};

export default ErrorPage;
