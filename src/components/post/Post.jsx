import { useContext } from "react";
import { AuthContext } from "../../App";
import { dateFormat } from "../../firebase/displayDate";
import { useFetchData } from "../../hooks/FetchContext";

const Post = () => {
  const { postsData, isLoading, errorMessage } = useFetchData();
  console.log("🚀 ~ Post ~ post:", postsData);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <h2>Post Lists</h2>

      {postsData?.length === 0 ? (
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
