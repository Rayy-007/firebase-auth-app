import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { dateFormat } from "../../firebase/displayDate";
import { CgMenuMotion } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useFirebaseAuth } from "../../hooks/AuthContext";
import { useFetchPosts } from "../../hooks/FetchPostsContext";
import { useManagePosts } from "../../hooks/ManagePostsContext";
import { useState } from "react";

const Post = () => {
  const { refreshPostsData, postsData, isLoading, errorMessage } =
    useFetchPosts();
  const { signedInUser } = useFirebaseAuth();
  const { deletePost, updatePost } = useManagePosts();

  const [editingPostId, setEditingPostId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setNewMessage(post.message);
  };

  const handleUpdateMessage = () => {
    updatePost(editingPostId, newMessage);
    setEditingPostId(null);
    setNewMessage("");
  };

  const handleCancelMessage = () => {
    setEditingPostId(null);
    setNewMessage("");
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }
  return (
    <section className="w-1/2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Post Lists</h2>
        <Button onClick={() => refreshPostsData()}>Refresh Posts</Button>
      </div>

      {postsData?.length === 0 ? (
        <p>There is no Posts yet!</p>
      ) : (
        postsData?.map((post, index) => (
          <Card key={index} className="my-9">
            <CardBody>
              <div className="flex justify-between items-start">
                {editingPostId === post.id ? (
                  <div className="flex flex-col w-4/5 gap-4">
                    <Textarea
                      value={newMessage}
                      variant="standard"
                      className="focus:border-none focus:outline-none border-none "
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="rounded-full bg-blue-800"
                        onClick={handleUpdateMessage}
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        className="rounded-full hover:bg-blue-gray-900 hover:text-white"
                        onClick={handleCancelMessage}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Typography variant="h5" color="black">
                    {post?.message}
                  </Typography>
                )}
                <Menu className="flex gap-2">
                  <MenuHandler>
                    <IconButton variant="text">
                      <CgMenuMotion />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleEditClick(post)}
                      className="flex items-center gap-2"
                    >
                      <BiEdit />
                      <Typography variant="small" color="black">
                        Edit
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => deletePost(post.id)}
                      className="flex items-center gap-2"
                    >
                      <MdDelete className="fill-red-500" />
                      <Typography variant="small" color="black">
                        Delete
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <Tooltip content={signedInUser.displayName}>
                <Avatar src={signedInUser.photoURL} />
              </Tooltip>
              <Typography color="gray" className="mt-3 font-normal text-base">
                {dateFormat(post?.createdAt)}
              </Typography>
            </CardFooter>
          </Card>
        ))
      )}
    </section>
  );
};

export default Post;
