import { db, auth } from "./config";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postRef = collection(db, COLLECTION_NAME);

export function FetchRealTimeData(signedInUser, setPostsData) {
  console.log(signedInUser);
  const q = query(postRef, where("userId", "==", signedInUser));

  onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    setPostsData(data);
  });
}

export async function FetchOnceData(signedInUser) {
  try {
    const q = query(postRef, where("userId", "==", signedInUser));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    throw error;
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
