import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const un = onAuthStateChanged(auth, (cUser) => {
      if (cUser) {
        setUser(cUser);
      } else {
        setUser(null);
      }
      setLoading(false);

      // console.log("C-", cUser);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
