import { useContext } from "react";
import { AuthContext } from "../../App";
import { dateFormat } from "../../firebase/displayDate";

const Post = () => {
  const { postsData } = useContext(AuthContext);
  return (
    <div>
      {!postsData ? (
        <div>Loading Posts....</div>
      ) : (
        postsData?.map((post) => (
          <div>
            <h2>{post?.message}</h2>
            <p>{dateFormat(post?.createdAt)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
