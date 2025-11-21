import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";


const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-3xl font-medium ${
      isActive ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-200"
    }`;
  const { user, logOut, loading } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(()=>{
        toast("logged out succesfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li className="mr-2">
        <NavLink to="" className={getLinkClass}>
          Services
        </NavLink>
      </li>

      <li className="mr-2">
        <NavLink to="/aboutUs" className={getLinkClass}>
          About Us
        </NavLink>
      </li>
      <li className="mr-2">
        <NavLink className={getLinkClass} to="/send-parcel">
          Send Parcel
        </NavLink>
      </li>
      <li className="mr-2">
        <NavLink className={getLinkClass} to="/coverage">
          Coverage
        </NavLink>
      </li>
      {
        user &&  <li className="mr-2">
        <NavLink className={getLinkClass} to="/dashboard/my-parcels">
          My Parcels
        </NavLink>
      </li>
      }
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
        <div className="hidden md:flex gap-5 ">
          {loading ? (
            <span className="loading loading-bars text-primary loading-xl"></span>
          ) : user ? (
            <>
              <div
                className="tooltip tooltip-bottom tooltip-secondary font-semibold "
                data-tip={user.displayName}
              >
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </div>
              <button onClick={handleLogOut} className="btn ">
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn ">
                Register
              </Link>
            </div>
          )}
          <Link to="/rider" className="btn mx-1 btn-primary text-black">
            Be a Rider
          </Link>
        </div>
        {/* Mobile Dropdown */}

        <div className="dropdown md:hidden fredoka-font">
          <label tabIndex={0} className="btn btn-primary outline-0 shadow-none">
            Menu
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-0 shadow bg-base-100 rounded-box mt-2 min-w-max -ml-8"
          >
            {loading ? (
              <span className="loading loading-bars text-primary loading-xl"></span>
            ) : user ? (
              <>
                {" "}
                <div className="flex flex-col justify-center items-center gap-3">
                  <div
                    className="tooltip tooltip-left tooltip-secondary font-semibold fredoka-font "
                    data-tip={user.displayName}
                  >
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="  w-10 h-10 rounded-full cursor-pointer "
                    />
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="btn m-0.5 outline-0 shadow-none"
                  >
                    Logout
                  </button>
                  <Link
                    to="/rider"
                    className="btn mx-1 btn-primary text-black mb-2"
                  >
                    Be a Rider
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn  outline-0 shadow-none"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn  outline-0 shadow-none"
                >
                  Register
                </NavLink>
                <Link
                  to="/rider"
                  className="btn mx-1 btn-primary text-black mb-2"
                >
                  Be a Rider
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
