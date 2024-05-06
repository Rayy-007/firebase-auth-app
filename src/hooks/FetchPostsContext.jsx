import { useContext, createContext, useState, useEffect } from "react";
import {
  fetchRealTimePostsData,
  fetchPostsDataOnce,
  fetchTodayPostData,
  fetchThisWeekPostData,
  fetchThisMonthPostData,
} from "../firebase/fetchPostsData";
import { useFirebaseAuth } from "./AuthContext";

export const FetchPostsContext = createContext();

export const useFetchPosts = () => useContext(FetchPostsContext);
export const FetchPostsDataProvider = ({ children }) => {
  const { signedInUser } = useFirebaseAuth();

  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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

  // Fetch real-time data from Firebase
  useEffect(() => {
    if (!signedInUser) {
      return;
    }
    const unsubscribe = fetchAllPost();
    return () => unsubscribe && unsubscribe(); // Cleanup function
  }, [signedInUser]);

  const fetchAllPost = () => {
    setIsLoading(true);
    try {
      fetchRealTimePostsData(signedInUser.uid, setPostsData);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Oops! Something went wrong. Please refresh the post lists."
      );
    }
  };

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

  const fetchThisWeekPost = () => {
    setIsLoading(true);
    try {
      fetchThisWeekPostData(signedInUser.uid, setPostsData);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Oops! Something went wrong. Please refresh the This Week post lists."
      );
    }
  };

  const fetchThisMonthPost = () => {
    setIsLoading(true);
    try {
      fetchThisMonthPostData(signedInUser.uid, setPostsData);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Oops! Something went wrong. Please refresh the This Month post lists."
      );
    }
  };

  return (
    <FetchPostsContext.Provider
      value={{
        refreshPostsData,
        fetchTodayPost,
        fetchAllPost,
        fetchThisWeekPost,
        fetchThisMonthPost,
        postsData,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </FetchPostsContext.Provider>
  );
};
