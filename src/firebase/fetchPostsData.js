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

function fetchPostsFunction(query, setPostsData) {
  onSnapshot(query, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostsData(data);
  });
}

export function fetchRealTimePostsData(signedInUserId, setPostsData) {
  const q = query(
    postRef,
    where("userId", "==", signedInUserId),
    orderBy("createdAt", "desc")
  );
  fetchPostsFunction(q, setPostsData);
}

export async function fetchPostsDataOnce(signedInUserId) {
  const q = query(
    postRef,
    where("userId", "==", signedInUserId),
    orderBy("createdAt", "desc")
  );
  try {
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

export function fetchTodayPostData(signedInUserId, setPostsData) {
  try {
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date();
    endDay.setHours(23, 59, 59, 999);
    const q = query(
      postRef,
      where("userId", "==", signedInUserId),
      where("createdAt", ">=", startDay),
      where("createdAt", "<=", endDay),
      orderBy("createdAt", "desc")
    );

    fetchPostsFunction(q, setPostsData);
  } catch (error) {
    console.error("Error fetching today posts data:", error);
  }
}

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
