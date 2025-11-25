import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/json/error.json"; 

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex flex-col grow items-center justify-center my-10 md:my-20 text-center px-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64 md:w-96 md:h-96 mb-6">
          <Lottie animationData={errorAnimation} loop={true} />
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Oops! Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Go Home Button */}
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 text-lg hover:scale-105 transition-transform duration-300"
        >
          Go Home
        </Link>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default ErrorPage;
