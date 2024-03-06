import { useContext } from "react";
import { AuthContext } from "../../App";
import { dateFormat } from "../../firebase/displayDate";

const Post = () => {
  const { postsData, isLoading } = useContext(AuthContext);
  return (
    <div>
      {!postsData ? (
        <div>Loading Posts....</div>
      ) : isLoading ? (
        <div>Loading................</div>
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
