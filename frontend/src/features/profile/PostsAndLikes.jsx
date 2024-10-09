import { NavLink } from "react-router-dom";

function PostsAndLikes({ activeUser }) {
  return (
    <nav className="sticky top-0 mt-5 flex h-[60px] items-center justify-between border-b border-gray-700 bg-[rgba(0,0,0,0.5)] px-40 py-4">
      <NavLink
        to={`/profile/${activeUser?.userName}/posts`}
        className={({ isActive }) =>
          `font-bold transition-all duration-300 ${isActive ? "text-primary hover:text-gray-200" : "hover:text-primary"}`
        }
      >
        Posts
      </NavLink>

      <NavLink
        to={`/profile/${activeUser?.userName}/likes`}
        className={({ isActive }) =>
          `font-bold transition-all duration-300 ${isActive ? "text-primary hover:text-gray-200" : "hover:text-primary"}`
        }
      >
        Likes
      </NavLink>
    </nav>
  );
}

export default PostsAndLikes;
