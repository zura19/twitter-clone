import { useMutation, useQuery } from "@tanstack/react-query";
import FollowUnfollowBtn from "../features/profile/FollowUnfollowBtn";
import UserProfilePicture from "./UserProfilePicture";
import { getAuhtors as getFollowings } from "../features/home/homeApi";
import { useSelector } from "react-redux";
import FollowingsSkeleton from "./FollowingsSkeleton";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

/* {user?.fullName.length < 10
            ? user?.fullName
            : `${user?.fullName.split("").slice(0, 10).join("")}...`} */

function FollowingUser({ following }) {
  const token = useSelector((store) => store?.user?.user?.token);
  const fBtn = useRef(null);
  const navigate = useNavigate();

  const { data: user, isLoading: skeletonTime } = useQuery({
    queryFn: () => getFollowings(token, following),
    queryKey: ["followings", following],
  });

  if (skeletonTime) return <FollowingsSkeleton />;

  if (!skeletonTime)
    return (
      <div
        onClick={(e) => {
          if (e.target === fBtn.current) return;
          navigate(`/profile/${user?.userName}/posts`);
        }}
        className={`bas flex cursor-pointer items-center gap-4 rounded-md border border-gray-700 px-4 py-3 transition-all duration-300 hover:bg-gray-900`}
      >
        <UserProfilePicture src={user?.profileImg} followingPage={true} />
        <div>
          <p className="text-white">{user?.userName}</p>
          <p className="text-white">@{user?.email}</p>
        </div>
        <span className="ml-auto">
          <FollowUnfollowBtn
            fBtn={fBtn}
            activeUserID={user._id}
            followingBtn={true}
          />
        </span>
      </div>
    );
}

export default FollowingUser;
