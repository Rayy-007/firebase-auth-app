import Post from "../post/Post";
import { Button } from "@material-tailwind/react";
import AddPost from "../post/AddPost";
import UserProfile from "../profile/UserProfile";
import { useFirebaseAuth } from "../../hooks/AuthContext";

const Home = () => {
  const { signOutHandle } = useFirebaseAuth();

  return (
    <section className="pt-6">
      <UserProfile />

      <div className="py-9 flex gap-9 justify-between">
        <div className="w-1/2 flex flex-col gap-9">
          <AddPost />
        </div>
        <Post />
      </div>
      <Button onClick={() => signOutHandle()}>Sign Out</Button>
    </section>
  );
};

export default Home;
