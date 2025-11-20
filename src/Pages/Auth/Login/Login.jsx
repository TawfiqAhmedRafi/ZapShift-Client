import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { SignInUser } = useAuth();
  const location = useLocation();
  
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    SignInUser(data.email, data.password)
      .then((result) =>  {
        console.log(result.user);
        navigate(location?.state || "/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <div className=" ">
        <h2  className="text-4xl font-bold text-secondary">Welcome Back</h2>
      <p className="text-sm">Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input"
            placeholder="Email"
          />
          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password",{
                required : true
              })}
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary focus:outline-none"
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </button>
          </div>

          <div>
            <Link to="/forgot-password" className="link link-hover hover:font-bold text-secondary">Forgot password?</Link>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
          <p>
            New to ZapShift?
            <Link state={location.state} to="/register" className="text-primary hover:underline">
              Register
            </Link>{" "}
          </p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
