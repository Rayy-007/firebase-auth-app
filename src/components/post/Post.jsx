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
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { dateFormat } from "../../firebase/displayDate";
import { useFetchData } from "../../hooks/FetchContext";
import { useFirebaseAuth } from "../../hooks/AuthContext";
import { CgMenuMotion } from "react-icons/cg";

const Post = () => {
  const { postsData, isLoading, errorMessage } = useFetchData();
  const { refreshPostsData } = useFetchData();
  const { signedInUser } = useFirebaseAuth();

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
              <div className="flex justify-between items-center">
                <Typography variant="h5" color="black">
                  {post?.message}
                </Typography>
                <Menu>
                  <MenuHandler>
                    <IconButton variant="text">
                      <CgMenuMotion />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <Typography color="black">Edit</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography color="black">Delete</Typography>
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
