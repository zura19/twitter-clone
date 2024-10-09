import { HiOutlineTrash } from "react-icons/hi";
import {
  HiArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";
import UserProfilePicture from "../../components/UserProfilePicture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAuhtors, deletePost } from "./homeApi";
import DeletePostModal from "./DeletePostModal";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { calculateTimePassed } from "./time";
import PostDropDown from "./PostDropDown";
import UpdatePostModal from "./UpdatePostModal";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";

function Post({ premisionToDelete, post, activeUser, likedPosts }) {
  const token = useSelector((store) => store?.user?.user?.token);
  const loggeduser = useSelector((store) => store?.user?.user?.data?.user);

  const queryClient = useQueryClient();
  const deletePostBtn = useRef(null);
  const updatePostBtn = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isLoading: skeletonTime } = useQuery({
    queryFn: () => getAuhtors(token, post?.user),
    queryKey: ["postAuthor", post?.user],
    enabled: Boolean(post) !== false,
  });

  const { mutate: deletePostMutation, isLoading } = useMutation({
    mutationFn: () => deletePost(token, post?._id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const deleteFn = () => deletePostMutation(token, post?._id);

  const showDeletePostModal = function () {
    deletePostBtn.current.showModal();
  };
  const showUpdatePostModal = function () {
    updatePostBtn.current.showModal();
  };

  return (
    <div className="border-b border-gray-700 bg-black px-6 py-6">
      <div className="flex gap-2 align-top">
        {skeletonTime ? (
          <div className="skeleton h-9 w-9 rounded-full bg-gray-800"></div>
        ) : (
          <UserProfilePicture src={user?.profileImg} />
        )}
        <div className="w-full">
          <div className="flex gap-1">
            {skeletonTime ? (
              <>
                <div className="skeleton h-4 w-20 rounded-full bg-gray-900"></div>
                <div className="skeleton h-4 w-32 rounded-full bg-gray-900"></div>
                <div className="skeleton h-4 w-6 rounded-full bg-gray-900"></div>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${user?.userName}/posts`}
                  className="cursor-pointer text-sm font-bold capitalize"
                >
                  {user?.userName}
                </Link>
                <p className="text-sm text-gray-700">@{user?.email}</p>
                <p className="text-sm text-gray-700">
                  {calculateTimePassed(post?.createdAt)}
                </p>
              </>
            )}
            {premisionToDelete ? (
              <PostDropDown
                showUpdateModal={showUpdatePostModal}
                showDeleteModal={showDeletePostModal}
              />
            ) : (
              <div className="ml-auto p-1">
                <HiOutlineTrash fill="#000" color="#000" size={25} />
              </div>
            )}
          </div>
          {skeletonTime ? (
            <div className="skeleton mb-6 h-4 w-full rounded-full bg-gray-900"></div>
          ) : (
            <p className="mb-6">{post?.text}</p>
          )}
          {post?.image && (
            <span>
              {skeletonTime ? (
                <div className="skeleton h-[400px] w-full bg-gray-900"></div>
              ) : (
                <div className="flex h-[400px] justify-center overflow-hidden rounded-md border border-gray-700">
                  <img src={post?.image} alt="asfsa" />
                </div>
              )}
            </span>
          )}
          <div className="mt-2 flex justify-between">
            <div className="flex items-center gap-1">
              <button className="rounded-md p-1 transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <HiArrowPathRoundedSquare color="#d1d5db" size={20} />
              </button>
              <span className="text-sm text-gray-300">0</span>
            </div>
            <div
              onClick={() => navigate(`/post/${post?._id}`)}
              className="flex items-center gap-1"
            >
              <button className="rounded-md p-1 transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <HiOutlineChatBubbleOvalLeft
                  color="#d1d5db"
                  fill={
                    location.pathname === `/post/${post?._id}` ? "white" : ""
                  }
                  size={20}
                />
              </button>
              <span className="text-sm text-gray-300">
                {post?.comments?.length}
              </span>
            </div>

            <LikeBtn
              userID={loggeduser?._id}
              postID={post?._id}
              likesArr={post?.likes}
              token={token}
            />
            <BookmarkBtn
              bookmarksArr={post?.bookmarks}
              userID={loggeduser?._id}
              token={token}
              postID={post?._id}
            />
            <>
              <DeletePostModal
                isLodaing={isLoading}
                deleteFn={deleteFn}
                deleteBtn={deletePostBtn}
              />
              <UpdatePostModal
                postID={post?._id}
                postText={post?.text}
                postImage={post?.image}
                updateBtn={updatePostBtn}
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
