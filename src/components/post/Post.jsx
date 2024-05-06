import {
  Button,
  ButtonGroup,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useFetchPosts } from "../../hooks/FetchPostsContext";
import PostCard from "./PostCard";

const Post = () => {
  const { refreshPostsData, postsData, isLoading, errorMessage } =
    useFetchPosts();
  console.log("🚀 ~ Post ~ postsData:", postsData);

  return (
    <section className="w-1/2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Post Lists</h2>
        <Button onClick={() => refreshPostsData()}>Refresh Posts</Button>
      </div>

      <DateFilter />

      {isLoading ? (
        <div className="flex justify-center items-center my-8">
          <Spinner color="blue-gray" className="w-16 h-16" />
        </div>
      ) : errorMessage || !postsData ? (
        <Typography className="text-center my-8" variant="paragraph">
          Opps There is an error while getting posts {errorMessage}
        </Typography>
      ) : postsData?.length === 0 ? (
        <Typography variant="paragraph" className="text-center my-8">
          There is no Posts yet!
        </Typography>
      ) : (
        postsData?.map((post, index) => <PostCard post={post} key={index} />)
      )}
    </section>
  );
};

export default Post;

const DateFilter = () => {
  const { fetchTodayPost } = useFetchPosts();
  return (
    <ButtonGroup variant="outlined" className="mt-6">
      <Button
        onClick={() => {
          fetchTodayPost();
        }}
      >
        Today
      </Button>
      <Button>This Week</Button>
      <Button>This Month</Button>
      <Button>This Year</Button>
      <Button>All Time</Button>
    </ButtonGroup>
  );
};
