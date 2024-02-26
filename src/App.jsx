import React, { createContext, useEffect, useState } from "react";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import { auth } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import Success from "./components/home/Success";
import Home from "./components/home/Home";
import GoogleLogin from "./components/google/GoogleLogin";

export const AuthContext = createContext();

const App = () => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [signedInUser, setSignedInUser] = useState();
  // Sign Up with Email
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

  // Sign In with Email
  const signInWithEmail = (signInData) => {
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userInfo) => {
        console.log(userInfo.user, "Successfully signed in");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Sign In & Up with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Signed In with Google");
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

  // Checking if the user is signed in or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.auth.currentUser);
        setSignedInUser(user.auth.currentUser);
        navigate("/success");
      } else {
        navigate("/");
      }
    });
  }, []);

  // Update user profile
  const updateUserProfile = (updatedData) => {
    updateProfile(auth.currentUser, {
      displayName: updatedData.newName,
      photoURL: updatedData.newPhoto,
    })
      .then(() => {
        console.log("Successfully updated user profile");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        signUpwithEmail,
        signInWithGoogle,
        signedInUser,
        updateUserProfile,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signupGoogle" element={<GoogleLogin />} />
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
