import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export async function AddDataToFirebase(dataMessage, signedInUser) {
  const COLLECTION_NAME = "posts";

  // Add data to Firebase
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      message: dataMessage,
      userId: signedInUser.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
