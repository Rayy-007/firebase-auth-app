import { useContext } from "react";
import { AuthContext } from "../../App";
import { dateFormat } from "../../firebase/displayDate";
import { useFetchData } from "../../firebase/FetchContext";

const Post = () => {
  const { postsData, isLoading, errorMessage } = useFetchData();
  console.log("🚀 ~ Post ~ post:", postsData);
  return (
    <div>
      <h2>Post Lists</h2>
      {isLoading ? (
        <div>Loading....</div>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : postsData?.length === 0 ? (
        <p>There is no Posts yet!</p>
      ) : (
        postsData?.map((post, index) => (
          <div key={index}>
            <h2>{post?.message}</h2>
            <p>{dateFormat(post?.createdAt)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
