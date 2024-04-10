import { useContext, createContext, useState, useEffect } from "react";
import { FetchOnceData, FetchRealTimeData } from "../firebase/FetchData";
import { useFirebaseAuth } from "./AuthContext";

const FetchContext = createContext();

export const useFetchData = () => useContext(FetchContext);

export const FetchDataProvider = ({ children }) => {
  const { signedInUser } = useFirebaseAuth();

  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Real time fetching data from Firebase
  useEffect(() => {
    setIsLoading(true);
    const fetchRealTimeData = async () => {
      try {
        FetchRealTimeData(signedInUser?.uid, setPostsData);
        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
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
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Opps! Something went wrong! Please refresh Post Lists!");
    }
  };

  return (
    <FetchContext.Provider
      value={{ refreshPostsData, postsData, isLoading, errorMessage }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContext;
