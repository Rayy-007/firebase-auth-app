import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { Home, Success, GoogleLogin, SignIn, SignUp } from "./components";
import { useFirebaseAuth } from "./firebase/AuthContext";
import { FetchDataProvider } from "./firebase/FetchContext";

export const AuthContext = createContext();

const App = () => {
  const COLLECTION_NAME = "posts";
  const { signedInUser } = useFirebaseAuth();

  const navigate = useNavigate();

  // Update user profile
  const updateUserProfile = (updatedData) => {
    const updateName = updatedData.newName
      ? updatedData.newName
      : auth?.currentUser.displayName;
    const updatePhoto = updatedData.newPhoto
      ? updatedData.newPhoto
      : auth?.currentUser.photoURL;

    updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: updatePhoto,
    })
      .then(() => {
        alert("Successfully updated user profile");
        navigate("/success");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  // Add data to Firebase
  const addDataToFirebase = async (dataMessage) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        message: dataMessage,
        userId: signedInUser.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        updateUserProfile,
        addDataToFirebase,
      }}
    >
      <FetchDataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signupGoogle" element={<GoogleLogin />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </FetchDataProvider>
    </AuthContext.Provider>
  );
};

export default App;
