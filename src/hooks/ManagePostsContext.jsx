import { createContext, useContext } from "react";
import {
  addPostToFirebase,
  deletePostFromFirebase,
} from "../firebase/managePostsData";
import { useFirebaseAuth } from "./AuthContext";

const ManagePostsContext = createContext();

/**
 * Custom hook to use the ManagePostsContext.
 * @returns {object} - The context value containing functions.
 */
export const useManagePosts = () => useContext(ManagePostsContext);

/**
 * FirebaseFunctionProvider component to provide context for Firebase functions.
 * @param {object} children - The children components to wrap.
 * @returns {JSX.Element} - The context provider component.
 */
export const ManagePostsDataProvider = ({ children }) => {
  const { signedInUser } = useFirebaseAuth();

  const addPost = (postDataMessage) => {
    try {
      addPostToFirebase(postDataMessage, signedInUser.uid);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const deletePost = (docId) => {
    try {
      deletePostFromFirebase(docId);
    } catch (error) {
      console.error("Error delete post", error);
    }
  };

  return (
    <ManagePostsContext.Provider value={{ addPost, deletePost }}>
      {children}
    </ManagePostsContext.Provider>
  );
};
