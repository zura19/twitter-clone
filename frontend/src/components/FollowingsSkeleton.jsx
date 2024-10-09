import FollowUnfollowBtn from "../features/profile/FollowUnfollowBtn";
import UserProfilePicture from "./UserProfilePicture";

function FollowingsSkeleton() {
  return (
    <>
      <div
        className={`flex cursor-pointer items-center gap-4 rounded-md border border-gray-700 px-4 py-5 transition-all duration-300 hover:bg-gray-900`}
      >
        <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-gray-800"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-20 rounded-full bg-gray-800"></div>
          <div className="skeleton h-3 w-28 rounded-full bg-gray-800"></div>
        </div>
        <div className="skeleton ml-auto h-6 w-20 rounded-full bg-gray-800"></div>
      </div>
    </>
  );
}

export default FollowingsSkeleton;
