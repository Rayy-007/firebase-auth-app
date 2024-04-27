import UpProfileForm from "../updateProfile/UpProfileForm";
import PlaceholderProfile from "../../assets/placeholder-profile.jpg";
import CoverImg from "../../assets/cover-img.jpg";
import { useFirebaseAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const UserProfile = () => {
  const { signedInUser } = useFirebaseAuth();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div className="mb-6 shadow-sm rounded-xl bg-white">
      <div className="w-full h-80 rounded-xl overflow-hidden relative ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          className="w-full h-full object-cover"
          src={CoverImg}
          alt={"Nature Image"}
        />
      </div>
      <div className="flex gap-8 items-start p-6">
        <img
          src={
            signedInUser?.photoURL ? signedInUser.photoURL : PlaceholderProfile
          }
          referrerPolicy="no-referrer"
          alt="Profile Image"
          width={100}
          height={100}
          className="z-10 w-32 h-32 object-cover rounded-full -mt-24 border-white border-4"
        />

        <h1 className="text-lg font-bold">
          Hey {signedInUser?.displayName ? signedInUser.displayName : "friend"},
          how are you?
        </h1>

        {!showUpdateForm && (
          <Button
            onClick={() => setShowUpdateForm(true)}
            className="edit-btn ml-auto"
          >
            Edit Profile
          </Button>
        )}
        <UpProfileForm
          showUpdateForm={showUpdateForm}
          setShowUpdateForm={setShowUpdateForm}
        />
      </div>
    </div>
  );
};

export default UserProfile;
