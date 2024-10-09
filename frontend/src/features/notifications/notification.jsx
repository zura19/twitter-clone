import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import UserProfilePicture from "../../components/UserProfilePicture";

function notification({ notification }) {
  if (notification === "like")
    return (
      <li className="flex gap-1 border-b border-gray-700 p-4">
        <HiOutlineHeart
          fill="#ef4444"
          color="#ef4444"
          className="text-red-500"
          size={28}
        />
        <div className="flex flex-col gap-1">
          <UserProfilePicture />
          <p className="text-sm text-gray-300">
            <span className="font-bold">@Username</span> liked your post
          </p>
        </div>
      </li>
    );

  if (notification === "follow")
    return (
      <li className="flex gap-1 border-b border-gray-700 p-4">
        <HiOutlineUser
          fill="rgb(29,155,240)"
          color="rgb(29,155,240)"
          size={28}
        />
        <div className="flex flex-col gap-1">
          <UserProfilePicture />
          <p className="text-sm text-gray-300">
            <span className="font-bold">@Username</span> followed you
          </p>
        </div>
      </li>
    );
}

export default notification;
