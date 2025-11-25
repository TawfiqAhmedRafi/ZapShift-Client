import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import {
  FaAngleDown,
  FaBell,
  FaBox,
  FaMotorcycle,
  FaRegCreditCard,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";

const DashBoardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast("logged out succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNavLinkClass = ({ isActive }) => {
    return `
      flex items-center gap-2 px-4 py-2 rounded
      is-drawer-close:tooltip is-drawer-close:tooltip-right
      ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"}
    `;
  };
  return (
    <div className="drawer max-w-7xl mx-auto lg:drawer-open bg-base-300">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Drawer content */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 px-4">
          {/* Left side: sidebar toggle */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          {/* Right side: user info */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="btn rounded-full">
              <FaBell />
            </button>

            <img
              src={user.photoURL}
              className="rounded-full w-10 h-10"
              alt={user.displayName || "User"}
            />
            <div>
              <p>{user.displayName}</p>
              <p className="text-[12px] text-gray-500">{user.email}</p>
            </div>
            <details className="dropdown">
              <summary className=" btn  btn-ghost ">
                <FaAngleDown />
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 -ml-10  p-2 shadow-sm">
                <li>
                  <button
                    className="btn hover:btn-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </nav>

        {/* Page content */}
        <div className="bg-base-100 m-8 p-4 md:p-8 rounded-2xl ">
          <Outlet />
        </div>
      </div>

      {/* Drawer sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Logo in sidebar */}
          <div className="p-4 w-full flex justify-center is-drawer-close:hidden">
            <Logo />
          </div>

          {/* Menu items */}
          <ul className="menu w-full grow">
            {/* Homepage */}
            <li>
              <NavLink to="/" className={getNavLinkClass} data-tip="Homepage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* My Parcels */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className={getNavLinkClass}
                data-tip="My Parcel"
              >
                <span>
                  <FaBox />
                </span>
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={getNavLinkClass}
                data-tip="Payment History"
              >
                <span>
                  <FaRegCreditCard></FaRegCreditCard>
                </span>
                <span className="is-drawer-close:hidden"> Payment History</span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className={getNavLinkClass}
                    data-tip="Approve Riders"
                  >
                    <span>
                      <FaMotorcycle></FaMotorcycle>
                    </span>
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Approve Riders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={getNavLinkClass}
                    data-tip="Users Management"
                  >
                    <span>
                      <FaUsers></FaUsers>
                    </span>
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
