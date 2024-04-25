import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useFirebaseAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [signedInUser, setSignedInUser] = useState();

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

  // Sign Up with Email
  const signUpWithEmail = (signUpData) => {
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

  return (
    <AuthContext.Provider
      value={{
        signedInUser,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOutHandle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
