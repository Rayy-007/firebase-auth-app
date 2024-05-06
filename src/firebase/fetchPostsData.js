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

export function fetchThisWeekPostData(signedInUserId, setPostsData) {
  try {
    const today = new Date();
    const currentDay = today.getDay();
    const dayOffset = currentDay === 0 ? 6 : 1 - currentDay;
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayOffset
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const q = query(
      postRef,
      where("userId", "==", signedInUserId),
      where("createdAt", ">=", startOfWeek),
      where("createdAt", "<=", endOfWeek),
      orderBy("createdAt", "desc")
    );

    fetchPostsFunction(q, setPostsData);
  } catch (error) {
    console.error("Error fetching this week posts data:", error);
  }
}

export function fetchThisMonthPostData(signedInUserId, setPostsData) {
  try {
    const startOfMonth = new Date();
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      postRef,
      where("userId", "==", signedInUserId),
      where("createdAt", ">=", startOfMonth),
      where("createdAt", "<=", endOfDay),
      orderBy("createdAt", "desc")
    );

    fetchPostsFunction(q, setPostsData);
  } catch (error) {
    console.error("Error fetching this month posts data:", error);
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
