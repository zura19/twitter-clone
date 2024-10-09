import { HiOutlineLink } from "react-icons/hi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { Link } from "react-router-dom";
import getMonthAndYear from "./getDate";

function UserInfo({ activeUser }) {
  return (
    <div className="mt-10 space-y-1 px-6 font-bold">
      <span className="text-lg capitalize">{activeUser?.fullName}</span>
      <p className="text-sm font-normal text-gray-500">
        @{activeUser?.userName}
      </p>
      <p className="text-xs font-normal leading-5 text-gray-300">
        {activeUser?.bio}
      </p>
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-1">
          {!activeUser?.link ? (
            <span className="text-xs font-normal">no link</span>
          ) : (
            <>
              <HiOutlineLink size={14} />
              <Link
                to={activeUser?.link}
                target="_blank"
                className="text-xs font-normal text-blue-300 hover:underline"
              >
                {`${activeUser?.link}`.split("").splice(0, 30).join("")}
                ...
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <HiOutlineCalendarDays size={14} />
          <p className="text-xs font-normal text-gray-400">
            {`Joined ${getMonthAndYear(activeUser?.createdAt)}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 pt-4">
        <div className="flex items-center gap-1">
          <p>{activeUser?.following?.length}</p>
          <p className="text-xs font-normal text-gray-400">following</p>
        </div>
        <div className="flex items-center gap-1">
          <p>{activeUser?.followers?.length}</p>
          <p className="text-xs font-normal text-gray-400">followers</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
