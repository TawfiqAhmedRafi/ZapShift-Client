import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser , updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()


  const handleRegistration = (data) => {
    
    const profileImg = data.photo[0] 
    registerUser(data.email, data.password)
      .then(() => {
        //console.log(result.user);
        // store the image and get photoURL
        const formData= new FormData();
        formData.append('image',profileImg)
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

        axios.post(image_API_URL, formData)
        .then(res =>{
          
             // update user profile
             const userProfile = {
                displayName  : data.name  ,
                photoURL : res.data.data.url
             }
             updateUserProfile(userProfile)
             .then(()=>{
             
                navigate(location.state || '/');
             }

             )
             .catch(error=>{
                console.log(error)
             })
        })
       

        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div>
     <h2  className="text-4xl font-bold text-secondary">Create an Account</h2>
      
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
            {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Name is Required</p>
          )}
            {/* photo */}
          <label className="label">Photo</label>
          
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input "
            placeholder="Your Photo"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Photo is Required</p>
          )}
            {/* email */}
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
          {/* password */}
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
          <Link
          state={location.state}
          to="/login" className="text-primary hover:underline">
            Login
          </Link>{" "}
        </p>
        <SocialLogin></SocialLogin>
      </form>
      
    </div>
  );
};

export default Register;
