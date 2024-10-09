import { HiOutlineLogout } from "react-icons/hi";
import UserProfilePicture from "./UserProfilePicture";
import LogoutModel from "./LogoutModel";
import { useRef } from "react";

function SidebarUser({ user, logoutMutation, onClick }) {
  const model = useRef(null);
  const logOutBtn = useRef(null);
  return (
    <div
      onClick={(e) => {
        console.log(e.target, logOutBtn.current);

        if (e.target !== logOutBtn.current) onClick();
      }}
      className="mb-5 mt-auto flex cursor-pointer items-center gap-2 rounded-md border border-gray-700 px-3 py-2 transition-all duration-300 hover:bg-gray-900"
    >
      <UserProfilePicture src={user?.profileImg} alt={user?.userName} />

      <div>
        <div className="flex w-[140px] items-center justify-between">
          <p className="text-sm">
            {user?.userName?.length < 10
              ? user?.userName
              : `${user?.userName?.split("")?.splice(0, 10)?.join("")}...`}
          </p>
          <button ref={logOutBtn} onClick={() => model.current.showModal()}>
            <HiOutlineLogout
              className="ml-auto transition-all duration-300 hover:text-red-500"
              size={20}
            />
          </button>
        </div>
        <p className="text-xs">
          {user?.email?.length < 10
            ? user?.email
            : `${user?.email?.split("")?.splice(0, 10)?.join("")}...`}
        </p>
      </div>
      <LogoutModel model={model} logoutMutation={logoutMutation} />
    </div>
  );
}

export default SidebarUser;
