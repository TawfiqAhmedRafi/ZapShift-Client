import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { googleSignIn ,SignInUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    SignInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogle = () => {
    return googleSignIn()
      .then(async () => {
        toast.success("Google sign-up successful!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };
  return (
    <div className=" ">
      <h2 className="text-3xl font-bold text-secondary">Login Your Account</h2>
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
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
          <p>
            Don't Have an account?
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>{" "}
          </p>
        </fieldset>
      </form>
      <p className="text-center my-1  text-gray-500">Or</p>
      <button
        type="button"
        onClick={handleGoogle}
        className="btn btn-primary btn-outline w-full "
      >
        <FcGoogle size={24} /> Sign Up with Google
      </button>
    </div>
  );
};

export default Login;
