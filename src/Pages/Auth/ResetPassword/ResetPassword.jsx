import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { saveNewPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const oobCode = location.state?.oobCode || query.get("oobCode");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    if (!oobCode) {
      toast("Invalid or missing password reset code.");
      return;
    }

    try {
      await saveNewPassword(oobCode, data.password);
      toast("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast("Password reset failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg  bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Reset Password</h2>
      <p className="text-sm mb-6">
        Enter your new password. Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password */}
        <label className="label">New Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="input w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                message:
                  "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character",
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
        {errors.password && (
          <p className="text-red-500 mb-2">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <label className="label">Confirm Password</label>
        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="input w-full"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
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
        {errors.confirmPassword && (
          <p className="text-red-500 mb-2">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
