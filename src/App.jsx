import React, { createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase/config";
import { Home, Success, GoogleLogin, SignIn, SignUp } from "./components";
import { FetchDataProvider } from "./hooks/FetchContext";
import { FirebaseFnProvider } from "./hooks/FirebaseContext";

export const AuthContext = createContext();

const App = () => {
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

  return (
    <AuthContext.Provider
      value={{
        updateUserProfile,
      }}
    >
      <FetchDataProvider>
        <FirebaseFnProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signupGoogle" element={<GoogleLogin />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </FirebaseFnProvider>
      </FetchDataProvider>
    </AuthContext.Provider>
  );
};

export default App;
