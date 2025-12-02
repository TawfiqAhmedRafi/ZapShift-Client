import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const ForgotPassword = () => {
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const { loading, setLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-md mx-auto mt-16 p-6 rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Forgot Password</h2>
      <p className="text-sm mb-6">
        Enter your email address and we'll send you an OTP to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="label mb-1 font-medium">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full mb-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full py-2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
