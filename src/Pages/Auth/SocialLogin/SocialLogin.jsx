import React from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogle = () => {
    return googleSignIn()
      .then(async () => {
        toast.success("Google sign-in successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };
  return (
    <div>
      <p className="text-center my-1 text-gray-500">Or</p>
      <button
        type="button"
        onClick={handleGoogle}
        className="btn btn-primary btn-outline w-full "
      >
        <FcGoogle size={24} /> Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
