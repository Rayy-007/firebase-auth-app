import { useState } from "react";
import { AuthContext } from "../../App";
import { useFirebaseFnContext } from "../../hooks/FirebaseContext";
import { Textarea, Button } from "@material-tailwind/react";

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
    <div className="w-2/3 ">
      <form className="flex flex-col gap-4" onSubmit={handleFormMessageSubmit}>
        <Textarea
          type="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          label="What are you feelling now?"
        />
        <Button type="submit" color="blue-gray">
          Send
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
