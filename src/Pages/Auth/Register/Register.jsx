import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
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
    <div>
      <h2 className="text-3xl font-bold text-secondary">
        Register Your Account
      </h2>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
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

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              password must have atleast 1 uppercase , 1 lowercase , 1 number
              and 1 special character{" "}
            </p>
          )}
          
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>{" "}
        </p>
      </form>
      <p className="text-center my-1 text-gray-500">Or</p>
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

export default Register;
