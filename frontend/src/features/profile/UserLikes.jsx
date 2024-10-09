import { useQuery } from "@tanstack/react-query";
import { HiOutlineLockClosed } from "react-icons/hi";
import { getUserLikedPosts } from "./getUserPosts";
import { useSelector } from "react-redux";
import Loader from "./../../components/Loader";
import Post from "../home/Post";

function UserLikes({ user, username, activeUser }) {
  const token = useSelector((store) => store?.user?.user?.token);
  const id = useSelector((store) => store?.user?.user?.data?.user?._id);

  const { data: likedPosts, isLoading } = useQuery({
    queryFn: () => getUserLikedPosts(token, id),
    queryKey: ["likedPosts"],
  });

  console.log(likedPosts);
  if (isLoading)
    return (
      <div className="absolute left-1/2 mt-12">
        <span className="loading loading-spinner loading-lg -translate-x-1/2"></span>
      </div>
    );

  if (user?.userName !== username)
    return (
      <div className="flex flex-col items-center gap-1 pt-14">
        <HiOutlineLockClosed size={40} color="rgb(29,155,240)" />
        <h3>
          Only <span className="font-bold">@{activeUser?.userName}</span> can
          see Liked Posts!
        </h3>
      </div>
    );

  return (
    <div className="">
      <ul>
        {likedPosts?.map((post) => (
          <Post post={post} likedPosts={true} />
        ))}
      </ul>
    </div>
  );
}

export default UserLikes;
