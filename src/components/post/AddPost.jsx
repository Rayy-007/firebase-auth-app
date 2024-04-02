import { useState } from "react";
import { AuthContext } from "../../App";
import { useFirebaseFnContext } from "../../hooks/FirebaseContext";
import { Textarea } from "@material-tailwind/react";

const AddPost = () => {
  const [message, setMessage] = useState();
  const { addPostToFirebase } = useFirebaseFnContext();

  // Getting Message from input fields
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  //  Sending Message To Firebase
  const handleFormMessageSubmit = (event) => {
    event.preventDefault();
    if (message) {
      addPostToFirebase(message);
    } else {
      alert("Please enter a message");
    }
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleFormMessageSubmit}>
        <Textarea
          type="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="What are you feelling now?"
          label="What are you feelling now?"
        />
        <div className="field padding-bottom--24">
          {/* <label htmlFor="email">Message</label>
          <textarea
            type="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="What are you feelling now?"
          /> */}
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default AddPost;
