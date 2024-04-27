import React, { createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase/config";
import { Home, Success, GoogleLogin, SignIn, SignUp } from "./components";
import { FetchPostsDataProvider } from "./hooks/FetchPostsContext";
import { ManagePostsDataProvider } from "./hooks/ManagePostsContext";

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
    <div className="max-w-[1200px] ml-auto mr-auto ">
      <AuthContext.Provider
        value={{
          updateUserProfile,
        }}
      >
        <FetchPostsDataProvider>
          <ManagePostsDataProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signupGoogle" element={<GoogleLogin />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </ManagePostsDataProvider>
        </FetchPostsDataProvider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
