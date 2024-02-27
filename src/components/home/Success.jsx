import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import PlaceholderProfile from "../../assets/placeholder-profile.jpg";

const Home = ({ signOutHandle }) => {
  const { signedInUser, updateUserProfile } = useContext(AuthContext);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [updateData, setUpdateData] = useState({
    newName: "",
    newPhoto: "",
  });

  const handleUpdateChange = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const handleFormUpdateSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(updateData);
    setShowUpdateForm(false);
  };

  return (
    <div className="container">
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
      />

      <div>
        <form onSubmit={handleFormUpdateSubmit}>
          <div className="field padding-bottom--24">
            <label htmlFor="email">Your New Name</label>

            <input
              type="text"
              placeholder="Your New Name"
              onChange={handleUpdateChange}
              name="newName"
            />
          </div>
          <div className="field padding-bottom--24">
            <label htmlFor="email">Your New Photo</label>
            <input
              type="text"
              placeholder="Your New Photo"
              onChange={handleUpdateChange}
              name="newPhoto"
            />
          </div>

          <button>Update</button>
        </form>
      </div>

      <img
        src="https://i.pinimg.com/originals/5b/54/39/5b543923641d0ef1df257706e19ee255.gif"
        alt="Ship is floating"
      />

      <button onClick={() => signOutHandle()}>Sign Out</button>
    </div>
  );
};

export default Home;
