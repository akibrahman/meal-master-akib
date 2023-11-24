import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { app } from "./firebase.config";
// import { app } from "../../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const un = onAuthStateChanged(auth, (cUser) => {
      if (cUser) {
        console.log("C-", cUser);
        setUser(cUser);
      } else {
        setUser(null);
      }
      setLoading(false);
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
        updateUserProfile,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
