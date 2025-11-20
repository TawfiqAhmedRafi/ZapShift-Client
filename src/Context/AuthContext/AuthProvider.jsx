import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // register User
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   signIn user
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google signIn
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   update Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  // password reset
  const resetEmail = async (email) => {
    return await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:5173/reset-password",
      handleCodeInApp: true,
    });
  };
  // verifyCode

  const verifyCode = async (oobCode) => {
    return await verifyPasswordResetCode(auth, oobCode);
  };
  //   new pass
  const saveNewPassword = async (oobCode, newPassword) => {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  };

  //   observe State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    registerUser,
    SignInUser,
    googleSignIn,
    user,
    loading,
    logOut,
    updateUserProfile,
    resetEmail,
    verifyCode,
    saveNewPassword,
    setLoading
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
