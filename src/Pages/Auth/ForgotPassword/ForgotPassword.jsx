import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { resetEmail } = useAuth();
  const [email, setEmail] = useState("");
  const {loading, setLoading}= useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetEmail(email);
      toast("Password reset email sent!");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      console.error(error.message);
      toast("Failed to send reset email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-md mx-auto mt-16 p-6 rounded-lg  bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Forgot Password</h2>
      <p className="text-sm mb-6">
        Enter your email address and we'll send you a link to reset your password.
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
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
