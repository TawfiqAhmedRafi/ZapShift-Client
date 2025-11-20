import React from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
    // register User
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
//   signIn user
const SignInUser=(email, password)=>{
return signInWithEmailAndPassword(auth ,email, password)
}


  const authInfo = {
    registerUser,
    SignInUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
