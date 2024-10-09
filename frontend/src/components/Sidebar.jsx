import { HiOutlineBell, HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import XSvg from "./X";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLogout from "../hooks/useLogout";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SidebarUser from "./SidebarUser";
import { HiOutlineBookmark } from "react-icons/hi2";

function Sidebar() {
  const { logout } = useLogout();
  const user = useSelector((store) => store?.user?.user?.data?.user || null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("User successfully logged out!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex h-dvh max-w-[250px] flex-col border-r border-gray-700 px-3 py-4">
      <XSvg
        onClick={() => {
          navigate("/");
        }}
        className={
          "w-[45px] cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-gray-900"
        }
      />
      <div className="mt-8 flex flex-col gap-1">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `group flex items-center gap-2 ${isActive ? "bg-[#fff] text-black" : "text-[#fff]"} rounded-md p-2 transition-all duration-300 hover:bg-[#fff]`
          }
        >
          <HiOutlineHome
            size={"30px"}
            className="rounded-md group-hover:text-black"
          />
          <p className="text-base font-semibold transition-all duration-300 group-hover:text-[#181818]">
            Home
          </p>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `group flex items-center gap-2 rounded-md p-2 ${isActive && "bg-white text-black"} transition-all duration-300 hover:bg-[#fff]`
          }
        >
          <HiOutlineBell
            size={"30px"}
            className="rounded-md transition-all duration-300 group-hover:text-black"
            color="white group-hover:black"
          />
          <p className="text-base font-semibold transition-all duration-300 group-hover:text-[#181818]">
            Notification
          </p>
        </NavLink>

        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `group flex items-center gap-2 rounded-md p-2 ${isActive && "bg-white text-black"} transition-all duration-300 hover:bg-[#fff]`
          }
        >
          <HiOutlineBookmark
            size={"30px"}
            className="rounded-md transition-all duration-300 group-hover:text-black"
            color="white group-hover:black"
          />
          <p className="text-base font-semibold transition-all duration-300 group-hover:text-[#181818]">
            Bookmarks
          </p>
        </NavLink>

        <NavLink
          to={
            `/profile/${user?.userName}/posts` ||
            `/profile/${user?.userName}/likes`
          }
          className={({ isActive }) =>
            `group flex items-center gap-2 rounded-md p-2 transition-all ${isActive ? "bg-[#fff] text-black" : "text-white"} duration-300 hover:bg-[#fff]`
          }
        >
          <HiOutlineUser
            className="rounded-md transition-all duration-300 group-hover:text-black"
            size={"30px"}
          />
          <p className="text-base font-semibold transition-all duration-300 group-hover:text-[#181818]">
            Profile
          </p>
        </NavLink>
      </div>
      <SidebarUser
        onClick={() => {
          navigate(`/profile/${user?.userName}/posts`);
        }}
        user={user}
        logoutMutation={logoutMutation}
      />
    </div>
  );
}

export default Sidebar;
