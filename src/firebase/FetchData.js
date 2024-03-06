import { db } from "./config";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postRef = collection(db, COLLECTION_NAME);

export function FetchRealTimeData(signedInUser) {
  const q = query(postRef, where("userId", "==", signedInUser));
  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export async function FetchOnceData() {
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

  try {
    const q = query(
      postRef,
      where("userId", "==", "zH6AAbMubNhyhGHCsmDQMWNyLLA3")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    throw error;
  }
}
