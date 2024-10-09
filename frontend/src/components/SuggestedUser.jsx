import { set } from "mongoose";
import { useEffect, useRef, useState } from "react";
import UserProfilePicture from "./UserProfilePicture";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetProfile from "../hooks/useGetProfile";
import useFollowUnfollow from "../hooks/useFollowUnfollw";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import FollowUnfollowBtn from "../features/profile/FollowUnfollowBtn";

function SuggestedUser({ user }) {
  const navigate = useNavigate();
  const loggedUser = useSelector((store) => store?.user?.user?.data?.user);
  const { followUnfollow } = useFollowUnfollow();
  const followBtn = useRef(null);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => followUnfollow(user?._id),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries();
    },
  });

  // console.log(loggedUser);

  return (
    <div
      onClick={(e) => {
        if (e.target === followBtn.current) return;
        navigate(`/profile/${user?.userName}/posts`);
      }}
      className={`flex cursor-pointer items-center gap-1 rounded-md border border-gray-700 px-2 py-2 transition-all duration-300 hover:bg-gray-900`}
    >
      <UserProfilePicture src={user?.profileImg} />

      <div>
        <p className="text-sm">
          {user?.fullName.length < 10
            ? user?.fullName
            : `${user?.fullName.split("").slice(0, 10).join("")}...`}
        </p>
        <p className="text-sm">@{user?.userName}</p>
      </div>
      <span className="ml-auto">
        <FollowUnfollowBtn
          fBtn={followBtn}
          suggestedUsersBtn={true}
          following={loggedUser?.following}
          activeUserID={user?._id}
        />
      </span>
    </div>
  );
}

export default SuggestedUser;
