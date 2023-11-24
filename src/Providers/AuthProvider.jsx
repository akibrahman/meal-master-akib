import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { app } from "./firebase.config";
// import { app } from "../../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const axiosInstance = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Providers
  const GoogleProvider = new GoogleAuthProvider();
  //! Registration
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //! Login
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! Google Login
  const GoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };
  //! Update
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  //! Logout
  const logOut = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };
  useEffect(() => {
    const un = onAuthStateChanged(auth, async (cUser) => {
      if (cUser) {
        console.log("C-", cUser);
        setUser(cUser);
        const userData = {
          name: cUser.name,
          email: cUser.email,
          role: "general",
          badge: "bronze",
          about: "",
        };
        await axiosInstance.put(`/all-users/${cUser.email}`, userData);
        setLoading(false);
      } else {
        setUser(null);
        console.log("Logged Out");
        setLoading(false);
      }
    });
    return () => un();
  });
  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        setUser,
        loading,
        setLoading,
        registration,
        logIn,
        GoogleLogin,
        updateUserProfile,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
