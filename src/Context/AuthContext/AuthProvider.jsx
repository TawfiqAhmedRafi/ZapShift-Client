import React from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // register User
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
//   signIn user
const SignInUser=(email, password)=>{
return signInWithEmailAndPassword(auth ,email, password)
}
//google signIn
  const googleSignIn = () => {
    
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    registerUser,
    SignInUser,
    googleSignIn
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
