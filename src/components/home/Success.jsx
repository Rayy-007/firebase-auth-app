import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import PlaceholderProfile from "../../assets/placeholder-profile.jpg";
import Post from "../post/Post";
import { Button } from "@material-tailwind/react";
import UpProfileForm from "../updateProfile/UpProfileForm";
import { useFirebaseAuth } from "../../hooks/AuthContext";
import { useFetchData } from "../../hooks/FetchContext";
import AddPost from "../post/AddPost";

const Home = () => {
  const { signedInUser, signOutHandle } = useFirebaseAuth();

  const { refreshPostsData } = useFetchData();

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div className="container ">
      <h1>
        Hey {signedInUser?.displayName ? signedInUser.displayName : "friend"},
        how are you?
      </h1>
      <img
        src={
          signedInUser?.photoURL ? signedInUser.photoURL : PlaceholderProfile
        }
        referrerPolicy="no-referrer"
        alt="Profile Image"
        width={100}
        height={100}
        className="profile-image"
      />
      {!showUpdateForm && (
        <Button onClick={() => setShowUpdateForm(true)} className="edit-btn">
          Edit Profile
        </Button>
      )}
      <UpProfileForm
        showUpdateForm={showUpdateForm}
        setShowUpdateForm={setShowUpdateForm}
      />

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
