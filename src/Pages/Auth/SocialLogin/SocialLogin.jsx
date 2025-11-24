import React from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogle = () => {
    return googleSignIn()
      .then((result) => {
        toast.success("Google sign-in successful!");

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data stored", res.data);
          navigate(location?.state || "/");
        });
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
