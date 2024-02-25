import React, { createContext, useEffect } from "react";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import { auth } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import Success from "./components/home/Success";
import Home from "./components/home/Home";

export const AuthContext = createContext();

const App = () => {
  const navigate = useNavigate();

  // Sign Up
  const signUpwithEmail = (signUpData) => {
    console.log(signUpData);
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((userInfo) => {
        console.log(userInfo.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Sign In
  const signInWithEmail = (signInData) => {
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userInfo) => {
        console.log(userInfo.user, "Successfully signed in");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Sign Out
  const signOutHandle = () => {
    signOut(auth)
      .then(() => {
        alert("Sign out successfully!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/success");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithEmail, signUpwithEmail }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/success"
          element={<Success signOutHandle={signOutHandle} />}
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

{
  /* <div className="formbg">
<Form />
</div> */
}
