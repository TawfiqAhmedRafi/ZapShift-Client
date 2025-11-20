import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
    const {register  , handleSubmit, formState:{errors}} = useForm();
    const handleRegistration=(data)=>{
console.log("register",data)
    }
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email',{required: true})} className="input" placeholder="Email" />
          {errors.email?.type==='required'&&
          <p className="text-red-500">Email is Required</p>
          }
          <label className="label">Password</label>
          <input type="password"  {...register('password',{required: true,
            minLength : 6, 
            pattern : /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6}$/
          })} className="input" placeholder="Password" />
          {errors.password?.type==='required' &&  <p className="text-red-500">Password is Required</p>}
         
          {
            errors.password?.type==='pattern' && <p className="text-red-500">password must have  atleast 1 uppercase , 1 lowercase ,  1 number and 1 special character </p>
          }
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
