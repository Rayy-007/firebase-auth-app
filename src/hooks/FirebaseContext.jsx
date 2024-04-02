import { createContext, useContext } from "react";
import { AddDataToFirebase } from "../firebase/AddDataToFirebase";
import { useFirebaseAuth } from "./AuthContext";

const FirebaseFnContext = createContext();

export const useFirebaseFnContext = () => useContext(FirebaseFnContext);

export const FirebaseFnProvider = ({ children }) => {
  const { signedInUser } = useFirebaseAuth();

  const addPostToFirebase = (postDataMessage) => {
    AddDataToFirebase(postDataMessage, signedInUser);
  };

  return (
    <FirebaseFnContext.Provider value={{ addPostToFirebase }}>
      {children}
    </FirebaseFnContext.Provider>
  );
};
