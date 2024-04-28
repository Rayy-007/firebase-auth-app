import { db } from "./config";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postRef = collection(db, COLLECTION_NAME);

/**
 * Fetches real-time data from the Firebase 'posts' collection based on the signed-in user.
 * @param {string} signedInUserId - ID of the signed-in user.
 * @param {function} setPostsData - Function to set posts data.
 */

export function fetchRealTimePostsData(signedInUser, setPostsData) {
  const q = query(
    postRef,
    where("userId", "==", signedInUser),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostsData(data);
  });
}

/**
 * Fetches data once from the Firebase 'posts' collection based on the signed-in user.
 * @param {string} signedInUserId - ID of the signed-in user.
 * @returns {Promise<Array>} - A promise resolving to an array of post data.
 */

export async function fetchPostsDataOnce(signedInUserId) {
  try {
    const q = query(
      postRef,
      where("userId", "==", signedInUserId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching posts data:", error);
    throw new Error("Failed to fetch posts data");
  }
}

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

//? Just reference for Learning (This is .then apparoach )
// return new Promise((resolve, reject) => {
//   getDocs(q)
//     .then((querySnapshot) => {
//       const data = querySnapshot.docs.map((doc) => doc.data());
//       resolve(data);
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });
