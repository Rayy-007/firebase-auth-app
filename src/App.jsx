import React, { createContext } from "react";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import { auth } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AuthContext = createContext();

const App = () => {
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

  const signInWithEmail = (signInData) => {
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userInfo) => {
        console.log(userInfo.user, "Successfully signed in");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ signInWithEmail, signUpwithEmail }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

{
  /* <div className="formbg">
<Form />
</div> */
}
