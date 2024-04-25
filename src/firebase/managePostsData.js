import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

/**
 * Adds data to the Firebase 'posts' collection.
 * @param {string} dataMessage - The message to be added.
 * @param {string} signedInUserId - ID of the signed-in user.
 * @returns {Promise<void>}
 */
export async function addPostToFirebase(dataMessage, signedInUserId) {
  const POSTS_COLLECTION_NAME = "posts";

  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION_NAME), {
      message: dataMessage,
      userId: signedInUserId,
      createdAt: serverTimestamp(),
    });
    console.log(`Post added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Failed to add post");
  }
}
