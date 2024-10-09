import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import UserProfilePicture from "../../components/UserProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { getAuhtors } from "../home/homeApi";
import { useSelector } from "react-redux";
import NotificationSkeleton from "./NotificationSkeleton";
import { Link } from "react-router-dom";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

function Notif({ notification }) {
  const token = useSelector((store) => store?.user?.user?.token);

  const { data: user, isLoading } = useQuery({
    queryFn: () => getAuhtors(token, notification?.from),
    queryKey: ["notificationFrom", notification?.from],
  });

  if (isLoading) return <NotificationSkeleton />;

  if (notification.type === "like")
    return (
      <li className="flex gap-1 border-b border-gray-700 p-4">
        <HiOutlineHeart
          fill="#ef4444"
          color="#ef4444"
          className="text-red-500"
          size={28}
        />
        <div className="flex flex-col gap-1">
          <UserProfilePicture src={user?.profileImg} />
          <p className="text-sm text-gray-300">
            <span className="font-bold">@{user?.userName}</span> liked your post
          </p>
        </div>
      </li>
    );

  if (notification.type === "follow")
    return (
      <li className="flex gap-1 border-b border-gray-700 p-4">
        <HiOutlineUser
          fill="rgb(29,155,240)"
          color="rgb(29,155,240)"
          size={28}
        />
        <div className="flex flex-col gap-1">
          <Link
            to={`/profile/${user?.userName}/posts`}
            className="mr-auto rounded-full"
          >
            <UserProfilePicture src={user?.profileImg} />
          </Link>
          <p className="text-sm text-gray-300">
            <Link to={`/profile/${user?.userName}/posts`} className="font-bold">
              @{user?.userName}
            </Link>
            {"  "}
            followed you
          </p>
        </div>
      </li>
    );

  if (notification.type === "comment")
    return (
      <li className="flex gap-1 border-b border-gray-700 p-4">
        <HiOutlineChatBubbleOvalLeft
          fill="#06b6d4"
          color="#06b6d4"
          className="text-cyan-500"
          size={28}
        />
        <div className="flex flex-col gap-1">
          <UserProfilePicture src={user?.profileImg} />
          <p className="text-sm text-gray-300">
            <span className="font-bold">@{user?.userName}</span> commented on
            your post
          </p>
        </div>
      </li>
    );
}

export default Notif;
