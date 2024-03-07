import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import PlaceholderProfile from "../../assets/placeholder-profile.jpg";
import Post from "../post/Post";
import { Button } from "@material-tailwind/react";
import UpProfileForm from "../updateProfile/UpProfileForm";

const Home = ({ signOutHandle }) => {
  const {
    signedInUser,
    updateUserProfile,
    addDataToFirebase,
    refreshPostsData,
  } = useContext(AuthContext);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [message, setMessage] = useState();

  // Getting Message from input fields
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  //  Sending Message To Firebase
  const handleFormMessageSubmit = (event) => {
    event.preventDefault();
    if (message) {
      addDataToFirebase(message);
    } else {
      alert("Please enter a message");
    }
    setMessage("");
  };

  return (
    <div className="container2 ">
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
      <div>
        <form onSubmit={handleFormMessageSubmit}>
          <div className="field padding-bottom--24">
            <label htmlFor="email">Message</label>
            <textarea
              type="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="What are you feelling now?"
            />
          </div>
          <button>Send</button>
        </form>
      </div>
      <button onClick={() => refreshPostsData()}>Refresh Posts</button>
      <Post />
      <img
        src="https://i.pinimg.com/originals/5b/54/39/5b543923641d0ef1df257706e19ee255.gif"
        alt="Ship is floating"
      />
      <button onClick={() => signOutHandle()}>Sign Out</button>
    </div>
  );
};

export default Home;
