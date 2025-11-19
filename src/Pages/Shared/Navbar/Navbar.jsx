import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-3xl font-medium ${
      isActive ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-200"
    }`;
  const links = (
    <>
      <li className="mr-2">
        <NavLink to="" className={getLinkClass}>Services</NavLink>
      </li>

      <li className="mr-2">
        <NavLink  to="/aboutUs" className={getLinkClass}>About Us</NavLink>
      </li>
      <li className="mr-2">
        <NavLink className={getLinkClass} to="/coverage">Coverage</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost  text-xl">
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
