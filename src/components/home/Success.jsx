import Post from "../post/Post";
import { Button } from "@material-tailwind/react";
import { useFetchData } from "../../hooks/FetchContext";
import AddPost from "../post/AddPost";
import UserProfile from "../profile/UserProfile";
import { useFirebaseAuth } from "../../hooks/AuthContext";

const Home = () => {
  const { signOutHandle } = useFirebaseAuth();

  const { refreshPostsData } = useFetchData();

  return (
    <div className="pt-6">
      <UserProfile />

      <AddPost />

      <Button onClick={() => refreshPostsData()}>Refresh Posts</Button>
      <Post />
      <img
        src="https://i.pinimg.com/originals/5b/54/39/5b543923641d0ef1df257706e19ee255.gif"
        alt="Ship is floating"
      />
      <Button onClick={() => signOutHandle()}>Sign Out</Button>
    </div>
  );
};

export default Home;
