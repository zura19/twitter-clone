import { useQuery } from "@tanstack/react-query";
import UserProfilePicture from "../../components/UserProfilePicture";
import { getAuhtors } from "../home/homeApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import CommentDropDown from "./CommentDropDown";
import UpdateCommentModal from "./UpdateCommentModal";
import { useRef } from "react";

function Comment({ comment, postID }) {
  const token = useSelector((store) => store?.user?.user?.token);
  const loggedUser = useSelector((store) => store?.user?.user?.data?.user);

  const { data: user, isLoading } = useQuery({
    queryFn: () => getAuhtors(token, comment?.user),
    queryKey: ["userCom", comment?.user],
  });

  const openModal = useRef(null);

  if (isLoading)
    return (
      <div className="flex gap-2 p-3">
        <div className="skeleton h-8 w-8 shrink-0 rounded-full bg-gray-900"></div>
        <div className="flex w-full flex-col gap-2">
          <div className="skeleton h-4 w-16 rounded-full bg-gray-900"></div>
          <div className="skeleton h-4 w-full rounded-full bg-gray-900"></div>
        </div>
      </div>
    );

  // console.log(comment?._id);

  return (
    <div className="grid grid-cols-[auto_auto_1fr] gap-2 p-3">
      <Link className="self-start" to={`/profile/${user?.userName}/posts`}>
        <UserProfilePicture src={user?.profileImg} />
      </Link>
      <div className="grid grid-cols-1">
        <Link to={`/profile/${user?.userName}/posts`} className="text-base">
          {user?.userName}
        </Link>
        <p className="bg break-words leading-4">{comment?.text}</p>
      </div>
      {loggedUser?._id === user?._id && (
        <CommentDropDown
          commentID={comment?._id}
          token={token}
          postID={postID}
          modelOpen={openModal}
        />
      )}
      <UpdateCommentModal
        comment={comment}
        postID={postID}
        commentID={comment?._id}
        modelOpen={openModal}
      />
    </div>
  );
}

export default Comment;
