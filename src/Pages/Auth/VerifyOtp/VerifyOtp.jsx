import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const VerifyOtp = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuth();
  const [otp, setOtp] = useState("");

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/verify-otp", { email, otp });
      toast.success("OTP verified successfully!");
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Verify OTP</h2>
      <p className="text-sm mb-6">
        Enter the 6-digit OTP sent to your email.
      </p>

      <form onSubmit={handleVerify}>
        <label className="label mb-1 font-medium">OTP Code</label>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input w-full mb-4 border border-gray-300 rounded-md p-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full py-2"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
