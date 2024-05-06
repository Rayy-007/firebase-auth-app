import { useContext, createContext, useState, useEffect } from "react";
import {
  fetchRealTimePostsData,
  fetchPostsDataOnce,
  fetchTodayPostData,
} from "../firebase/fetchPostsData";
import { useFirebaseAuth } from "./AuthContext";

export const FetchPostsContext = createContext();

/**
 * Custom hook to use the FetchContext.
 * @returns {object} - The context value containing data and methods.
 */
export const useFetchPosts = () => useContext(FetchPostsContext);

/**
 * FetchPostsDataProvider component to provide context for fetching data.
 * @param {object} children - The children components to wrap.
 * @returns {JSX.Element} - The context provider component.
 */
export const FetchPostsDataProvider = ({ children }) => {
  const { signedInUser } = useFirebaseAuth();

  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch real-time data from Firebase
  useEffect(() => {
    if (!signedInUser) {
      return;
    }

    setIsLoading(true);

    const unsubscribe = fetchRealTimePostsData(signedInUser.uid, setPostsData);

    setIsLoading(false);
    setErrorMessage(null);

    return () => unsubscribe && unsubscribe(); // Cleanup function
  }, [signedInUser]);

  // Manually refresh posts data
  const refreshPostsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPostsDataOnce(signedInUser.uid);
      setPostsData(data);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Oops! Something went wrong. Please refresh the post lists."
      );
    }
  };

  // data Filter Today Post
  const fetchTodayPost = () => {
    setIsLoading(true);

    try {
      fetchTodayPostData(signedInUser.uid, setPostsData);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Oops! Something went wrong. Please refresh the Today post lists."
      );
    }
  };

  return (
    <FetchPostsContext.Provider
      value={{
        refreshPostsData,
        fetchTodayPost,
        postsData,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </FetchPostsContext.Provider>
  );
};
