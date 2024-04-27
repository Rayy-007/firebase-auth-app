import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Adds data to the Firebase 'posts' collection.
 * @param {string} dataMessage - The message to be added.
 * @param {string} signedInUserId - ID of the signed-in user.
 * @returns {Promise<void>}
 */
const POSTS_COLLECTION_NAME = "posts";
export async function addPostToFirebase(dataMessage, signedInUserId) {
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

export async function deletePostFromFirebase(docId) {
  try {
    const deletedPost = await deleteDoc(doc(db, POSTS_COLLECTION_NAME, docId));
    console.log("Delete Successfully", deletedPost);
  } catch (error) {
    console.error("Error deleting post", error);
    throw new Error("Failed to delete the post");
  }
}
