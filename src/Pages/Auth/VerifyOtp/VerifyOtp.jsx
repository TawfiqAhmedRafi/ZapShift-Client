import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInput, setUserInput] = useState("");
 const{loading , setLoading} = useAuth();

  const oobCode =
    location.state?.oobCode ||
    new URLSearchParams(location.search).get("oobCode");
  const fakeOtp = oobCode ? oobCode.slice(0, 6).toUpperCase() : "";

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => { // small delay to simulate loading
      if (userInput.toUpperCase() === fakeOtp) {
        navigate("/reset-password", {
          state: { oobCode },
        });
      } else {
        toast("Incorrect code");
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-lg  bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Verify OTP</h2>
      <p className="text-sm mb-6">
        Enter the 6-digit code sent to your email to continue resetting your password.
      </p>

      <form onSubmit={handleVerify}>
        <label className="label mb-1 font-medium">OTP Code</label>
        <input
          type="text"
          maxLength={6}
          placeholder="______"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="input w-full mb-4 border border-gray-300 rounded-md p-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full py-2"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
