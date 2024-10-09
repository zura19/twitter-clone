import { useQuery } from "@tanstack/react-query";
import Post from "../features/home/Post";
import PostNav from "../features/post/PostNav";
import { getPost } from "../features/post/postApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "../features/post/Comments";
import AddCommentForm from "../features/post/AddCommentForm";

function PostPage() {
  const { id } = useParams();
  const token = useSelector((store) => store?.user?.user?.token);
  const user = useSelector((store) => store?.user?.user?.data?.user);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getPost(token, id),
    queryKey: ["onePost", id],
  });

  if (isLoading)
    return (
      <span className="loading loading-spinner loading-lg absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2"></span>
    );

  return (
    <div className="">
      <PostNav />
      <span>
        <Post post={post} premisionToDelete={user?._id === post?.user} />
      </span>
      <Comments postID={post?._id} comments={post?.comments} />
      <AddCommentForm postID={post?._id} token={token} />
    </div>
  );
}

export default PostPage;
