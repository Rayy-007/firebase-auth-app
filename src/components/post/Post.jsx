import { useContext } from "react";
import { AuthContext } from "../../App";
import { dateFormat } from "../../firebase/displayDate";

const Post = () => {
  const { postsData } = useContext(AuthContext);
  return (
    <div>
      <div>{postsData?.message}</div>
      <div>{dateFormat(postsData?.createdAt)}</div>
    </div>
  );
};

export default Post;
