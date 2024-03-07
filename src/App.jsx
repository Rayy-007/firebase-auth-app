import React, { createContext, useEffect, useState } from "react";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import { auth, db } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { Routes, Route, useNavigate } from "react-router-dom";
import Success from "./components/home/Success";
import Home from "./components/home/Home";
import GoogleLogin from "./components/google/GoogleLogin";
import { FetchOnceData, FetchRealTimeData } from "./firebase/FetchData";

export const AuthContext = createContext();

const App = () => {
  const COLLECTION_NAME = "posts";

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [signedInUser, setSignedInUser] = useState();
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sign Up with Email
  const signUpwithEmail = (signUpData) => {
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((userInfo) => {
        alert("Created account successfully");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Sign In with Email
  const signInWithEmail = (signInData) => {
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userInfo) => {
        alert("Successfully signed in");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Sign In & Up with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        alert("Signed In with Google");
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedInUser(user.auth.currentUser);
        navigate("/success");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

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

  // Real time fetching data from Firebase
  useEffect(() => {
    setIsLoading(true);
    const fetchRealTimeData = async () => {
      try {
        FetchRealTimeData(signedInUser?.uid, setPostsData);
        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error fetching data Real Time Ho Ho: ", error);
        setIsLoading(false);
        setErrorMessage(
          "Opps! Something went wrong! Please refresh Post Lists!"
        );
      }
    };
    fetchRealTimeData();
  }, [signedInUser]);

  // Manually Refresh the Fetch Data
  const refreshPostsData = async () => {
    setIsLoading(true);
    try {
      const data = await FetchOnceData(signedInUser?.uid);
      setPostsData(data);
      setIsLoading(false);
      setErrorMessage(null);
      console.log("🚀 ~ refreshPostsData ~ data:", data);
    } catch (error) {
      console.error("Error fetching Once  data:", error);
      setIsLoading(false);
      setErrorMessage("Opps! Something went wrong! Please refresh Post Lists!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        signUpwithEmail,
        signInWithGoogle,
        signedInUser,
        updateUserProfile,
        addDataToFirebase,
        postsData,
        refreshPostsData,
        isLoading,
        errorMessage,
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
