import { useContext, createContext, useState, useEffect } from "react";
import {
  fetchRealTimePostsData,
  fetchPostsDataOnce,
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
  const { signedInUserId } = useFirebaseAuth();

  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch real-time data from Firebase
  useEffect(() => {
    if (!signedInUserId) {
      return;
    }

    setIsLoading(true);

    const unsubscribe = fetchRealTimePostsData(signedInUserId, setPostsData);

    setIsLoading(false);
    setErrorMessage(null);

    return () => unsubscribe && unsubscribe(); // Cleanup function
  }, [signedInUserId]);

  // Manually refresh posts data
  const refreshPostsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPostsDataOnce(signedInUserId);
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

  return (
    <FetchPostsContext.Provider
      value={{ refreshPostsData, postsData, isLoading, errorMessage }}
    >
      {children}
    </FetchPostsContext.Provider>
  );
};
