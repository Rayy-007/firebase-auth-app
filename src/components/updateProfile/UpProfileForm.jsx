import { useContext, useState } from "react";
import { AuthContext } from "../../App";

const UpProfileForm = ({ showUpdateForm, setShowUpdateForm }) => {
  const {
    signedInUser,
    updateUserProfile,
    addDataToFirebase,
    refreshPostsData,
  } = useContext(AuthContext);

  const [updateData, setUpdateData] = useState({
    newName: "",
    newPhoto: "",
  });

  // Getting udated data from input fields
  const handleUpdateChange = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  // updated data from form
  const handleFormUpdateSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(updateData);
    setUpdateData({
      newName: "",
      newPhoto: "",
    });
    setShowUpdateForm(false);
  };

  return (
    <div>
      {showUpdateForm && (
        <div>
          <form onSubmit={handleFormUpdateSubmit}>
            <div className="field padding-bottom--24">
              <label htmlFor="email">Your New Name</label>

              <input
                type="text"
                placeholder="Your New Name"
                value={updateData.newName}
                onChange={handleUpdateChange}
                name="newName"
              />
            </div>
            <div className="field padding-bottom--24">
              <label htmlFor="email">Your New Photo</label>
              <input
                type="text"
                placeholder="Your New Photo"
                value={updateData.newPhoto}
                onChange={handleUpdateChange}
                name="newPhoto"
              />
            </div>

            <button>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpProfileForm;
