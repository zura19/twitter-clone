import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

function ProfileNav({ userName, postsLength }) {
  return (
    <div className="flex h-[60px] items-center gap-8 border-b border-gray-700 px-6">
      <Link
        to={-1}
        className="rounded-full p-2 transition-all duration-300 hover:bg-gray-900"
      >
        <HiOutlineArrowLeft size={20} />
      </Link>
      <div>
        <p className="text-base font-bold">{userName}</p>
        <p className="text-xs">{postsLength} posts</p>
      </div>
    </div>
  );
}

export default ProfileNav;
