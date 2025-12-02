import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const email = location.state?.email;
  const otp = location.state?.otp;

  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const password = useWatch({ control, name: "password" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/reset-password", {
        email,
        otp,
        newPassword: data.password,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Reset Password</h2>
      <p className="text-sm mb-6">
        Enter your new password. Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">New Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="input w-full"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                message: "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 mb-2">{errors.password.message}</p>}

        <label className="label">Confirm Password</label>
        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="input w-full"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 mb-2">{errors.confirmPassword.message}</p>}

        <button type="submit" className="btn btn-primary w-full">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
